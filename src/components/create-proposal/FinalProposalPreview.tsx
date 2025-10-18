'use client'

import { useState } from 'react'
import Button1 from '@/components/common/Button1'
import FinalBusinessInfoPreview from '@/components/create-proposal/final-proposal-preview/FinalBusinessInfoPreview'
import FinalProposalContentPreview from '@/components/create-proposal/final-proposal-preview/FinalProposalContentPreview'
import FinalDrawingPreview from '@/components/create-proposal/final-proposal-preview/FinalDrawingPreview'
import FinalETCPreview from '@/components/create-proposal/final-proposal-preview/FinalETCPreview'
import { useProposalStore } from '@/store/proposalStore'
import { useFileUpload } from '@/hooks/useFileUpload'
import { ProposalBidStatusType, ProposalStatusType } from '@/type/proposal'
import { getUserData } from '@/utils/common'
import { postProposalDraft, postProposalFinal, postProposalImageUpload } from '@/lib/proposal'
import { useModalStore } from '@/store/modalStore'
import { usePathname, useRouter } from 'next/navigation'

type StepType = '1' | '2' | '3' | '4' | '5'

export default function FinalProposalPreview() {
  const router = useRouter()
  const pathname = usePathname()

  const handleStepClick = (step: StepType) => {
    // URL 업데이트 → 서버 컴포넌트 재렌더링
    router.push(`${pathname}?step=${encodeURIComponent(step)}`)
  }
  const setModalState = useModalStore((state) => state.setState)
  const fileInfoList = useProposalStore((state) => state.fileInfoList)
  const setState = useProposalStore((state) => state.setState)
  const proposalData = useProposalStore((state) => state.proposalData)
  const selectedProjectId = useProposalStore((state) => state.selectedProjectId)
  const resultProposalId = useProposalStore((state) => state.resultProposalId)
  const [isUploading, setIsUploading] = useState(false)

  const { uploadFiles } = useFileUpload()

  // 유효성 검사: 파일이 1개 이상 있는지
  const isValid = fileInfoList && fileInfoList.length > 0
  // 공통 업로드 로직
  const handleSubmit = async (statusType: ProposalStatusType) => {
    if (!fileInfoList || fileInfoList.length === 0) {
      alert('업로드할 도면이 없습니다.')
      return
    }

    if (!resultProposalId) {
      alert('제안서 ID가 없습니다.')
      return
    }

    if (!selectedProjectId) {
      alert('프로젝트 ID가 없습니다.')
      return
    }

    try {
      setIsUploading(true)
      console.log('도면 업로드 시작...')

      // 1. 파일들을 S3에 업로드
      const result = await uploadFiles(fileInfoList)

      if (!result.success) {
        throw new Error('도면 업로드 실패')
      }

      console.log('업로드된 도면 URLs:', result.uploadedUrls)

      // 2. 각 URL에 대해 POST 요청 보내기
      const postPromises = result.uploadedUrls.map((drawingUrl) =>
        postProposalImageUpload(getUserData()?.memberId, {
          drawingUrl: drawingUrl,
          proposalId: resultProposalId,
        })
      )

      // 모든 이미지 업로드 POST 요청이 완료될 때까지 대기
      const imageUploadResults = await Promise.all(postPromises)
      console.log('모든 도면 등록 완료:', imageUploadResults)

      // uploadUrls에 저장
      if (imageUploadResults && imageUploadResults.length > 0) {
        const currentUploadUrls = fileInfoList || []
        setState({
          uploadUrls: [...currentUploadUrls, ...fileInfoList],
        })
      }

      // 3. proposalData에 상태값 추가
      if (typeof selectedProjectId === 'string') {
        const updatedProposalData = {
          ...proposalData,
          proposalBidStatus: 'BIDDING' as ProposalBidStatusType,
          submitStatus: statusType,
          projectId: parseInt(selectedProjectId), // 이제 안전하게 사용 가능
          companyId: getUserData()?.companyId,
        }
        // store 업데이트
        setState({
          proposalData: updatedProposalData,
        })

        // 4. 최종 제안서 제출
        console.log('최종 제안서 제출 시작...', statusType)
        if (statusType === 'TEMPORARY_SAVE') {
          const draftResult = await postProposalDraft(resultProposalId, updatedProposalData)
          console.log('최종 제안서 제출 완료:', draftResult)
        } else if (statusType === 'SUBMIT') {
          const finalResult = await postProposalFinal(resultProposalId, updatedProposalData)
          console.log('최종 제안서 제출 완료:', finalResult)
        }

        // 5. 성공 메시지 및 다음 단계
        if (statusType === 'TEMPORARY_SAVE') {
          alert('임시저장이 완료되었습니다.')
        } else {
          setModalState({ isProposalSentModalOpen: true })
        }
      }
    } catch (error) {
      console.error('도면 업로드 또는 제안서 제출 실패:', error)
      alert('작업에 실패했습니다. 다시 시도해주세요.')
    } finally {
      setIsUploading(false)
    }
  }

  // 임시저장 핸들러
  const handleTemporarySave = () => {
    handleSubmit('TEMPORARY_SAVE')
  }

  // 제출 핸들러
  const handleFinalSubmit = () => {
    handleSubmit('SUBMIT')
  }

  return (
    <div className="flex flex-col gap-y-[40px]">
      <section className="flex flex-col gap-y-4">
        <FinalBusinessInfoPreview />
        <FinalProposalContentPreview handleStepClick={handleStepClick} />
        <FinalETCPreview handleStepClick={handleStepClick} />
        <FinalDrawingPreview handleStepClick={handleStepClick} />
      </section>
      <section className="flex justify-between">
        <Button1
          onClick={() => {
            handleStepClick('4')
          }}
          customClassName={'h-[52px] w-[260px]'}
          styleStatus={'default'}
          styleSize={'lg'}
          styleType={'outline'}
        >
          이전
        </Button1>
        <Button1
          onClick={handleFinalSubmit}
          customClassName={'h-[52px] w-[260px]'}
          styleStatus={isValid ? 'default' : 'disabled'}
          styleType={'primary'}
          styleSize={'lg'}
          disabled={!isValid || isUploading}
        >
          {isUploading ? '업로드 중...' : '견적서 제출하기'}
        </Button1>
      </section>
    </div>
  )
}
