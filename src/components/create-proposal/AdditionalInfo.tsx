import Button1 from '@/components/common/Button1'
import { Dispatch, SetStateAction, useMemo, useState } from 'react'
import OperateUntilField from '@/components/create-proposal/additional-info/OperateUntilField'
import AdditionalProposalInfoField from '@/components/create-proposal/additional-info/AdditionalProposalInfoField'
import { useProposalStore } from '@/store/proposalStore'
import { ProposalBidStatusType, ProposalStatusType } from '@/type/proposal'
import { getUserData } from '@/utils/common'
import { postProposalDraft } from '@/lib/proposal'

interface AdditionalInfoProps {
  setCurrentStep: Dispatch<SetStateAction<number>>
}

export default function AdditionalInfo({ setCurrentStep }: AdditionalInfoProps) {
  const setState = useProposalStore((state) => state.setState)
  const proposalData = useProposalStore((state) => state.proposalData)
  const selectedProjectId = useProposalStore((state) => state.selectedProjectId)
  const resultProposalId = useProposalStore((state) => state.resultProposalId)
  const [isUploading, setIsUploading] = useState(false)

  const isValid = useMemo(() => {
    return proposalData?.operateUntil
  }, [proposalData?.operateUntil])

  // 공통 업로드 로직
  const handleSubmit = async () => {
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

      // 3. proposalData에 상태값 추가
      const updatedProposalData = {
        ...proposalData,
        proposalBidStatus: 'BIDDING' as ProposalBidStatusType,
        submitStatus: 'TEMPORARY_SAVE' as ProposalStatusType,
        projectId: parseInt(selectedProjectId), // 이제 안전하게 사용 가능
        companyId: getUserData()?.companyId,
      }

      // store 업데이트
      setState({
        proposalData: updatedProposalData,
      })

      const draftResult = await postProposalDraft(resultProposalId, updatedProposalData)
      console.log('최종 제안서 임시 저장:', draftResult)

      if (draftResult) {
        alert('임시저장이 완료되었습니다.')
      }
    } catch (error) {
      console.error('도면 업로드 또는 제안서 제출 실패:', error)
      alert('작업에 실패했습니다. 다시 시도해주세요.')
    } finally {
      setIsUploading(false)
    }
  }

  return (
    <div className="flex flex-col gap-y-[40px]">
      <section className="border-gray-20 flex flex-col gap-y-4 rounded-[24px] border bg-white p-6">
        <h1 className="sub1">기타 내용 입력</h1>
        <OperateUntilField />
        <AdditionalProposalInfoField />
      </section>
      <section className="flex justify-between">
        <Button1
          onClick={() => {
            setCurrentStep(2)
          }}
          customClassName={'h-[52px] w-[260px]'}
          styleStatus={'default'}
          styleSize={'lg'}
          styleType={'outline'}
        >
          이전
        </Button1>
        <div className="gap-x-2xs flex">
          <Button1
            onClick={handleSubmit}
            customClassName={'h-[52px] w-[260px]'}
            styleStatus={isValid ? 'default' : 'disabled'}
            styleSize={'lg'}
            styleType={'outline'}
            disabled={!isValid || isUploading}
          >
            {isUploading ? '저장 중...' : '임시저장'}
          </Button1>
          <Button1
            onClick={() => {
              setCurrentStep(4)
            }}
            customClassName={'h-[52px] w-[260px]'}
            styleStatus={isValid ? 'default' : 'disabled'}
            styleType={'primary'}
            styleSize={'lg'}
            disabled={!isValid}
          >
            다음
          </Button1>
        </div>
      </section>
    </div>
  )
}
