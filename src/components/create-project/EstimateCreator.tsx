import { Dispatch, SetStateAction, useEffect, useState } from 'react'
import Button1 from '@/components/common/Button1'
import FinalBasicInfo from '@/components/create-project/estimate-creator/FinalBasicInfo'
import FinalRequestCondition from '@/components/create-project/estimate-creator/FinalRequestCondition'
import FinalShippingAndExtraInfo from '@/components/create-project/estimate-creator/FinalShippingAndExtraInfo'
import { useProjectStore } from '@/store/projectStore'
import { formatDate } from '@/utils/project'
import { useFileUpload } from '@/hooks/useFileUpload'
import { useProjectImageUpload } from '@/hooks/useProjectImageUpload'
import { UserDataType } from '@/type/common'
import { postProjectDraft, postProjectFinal } from '@/lib/project'
import { useRouter } from 'next/navigation'
import { useToast } from '@/provider/ToastProvider'

interface EstimateCreatorProps {
  setCurrentStep: Dispatch<SetStateAction<number>>
  setIsPriorityModalOpen: Dispatch<SetStateAction<boolean>>
}
export default function EstimateCreator({ setCurrentStep, setIsPriorityModalOpen }: EstimateCreatorProps) {
  const router = useRouter()
  const projectData = useProjectStore((state) => state.projectData)

  const fileInfoList = useProjectStore((state) => state.fileInfoList)
  const finalProjectData = useProjectStore((state) => state.finalProjectData)
  const projectId = useProjectStore((state) => state.projectId)

  const [userData, setUserData] = useState<UserDataType | null>(null)

  const setState = useProjectStore((state) => state.setState)
  const { uploadFiles } = useFileUpload()
  const { uploadCallback } = useProjectImageUpload(projectId)

  // localStorage에서 userData 가져오기 (클라이언트 사이드에서만)
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const storedUserData = localStorage.getItem('userData')
      if (storedUserData) {
        try {
          const parsedUserData: UserDataType = JSON.parse(storedUserData)
          setUserData(parsedUserData)
        } catch (error) {
          console.error('userData 파싱 실패:', error)
        }
      }
    }
  }, [])

  const handleProjectSubmit = async () => {
    if (!userData?.memberId) {
      console.error('사용자 정보가 없습니다.')
      return
    }
    if (!projectId) {
      console.error('프로젝트 아이디가 없습니다.')
      return
    }

    try {
      // 2. 프로젝트 최종 생성 (finalProjectData가 없을 때만 요청)
      const res = await postProjectFinal(projectId, {
        ...projectData,
        memberId: userData.memberId,
        projectBidStatus: 'PRE_BID',
        submitStatus: 'SUBMIT',
      })
      if (res.result === 'SUCCESS') {
        handleToastSuccess()
        console.log('완성된 견적서', res)
        setState({ finalProjectData: res.data })
      } else if (res.result === 'ERROR') {
        handleToastError()
      }
      // 3. 파일 업로드 실행
      const uploadSuccess = await uploadFiles(fileInfoList, uploadCallback)

      if (uploadSuccess) {
        showToast('모든 파일이 업로드 완료되었습니다.', 'success')
      } else {
        console.log('')
        showToast('일부 파일 업로드 실패.', 'error')
        // 파일 업로드 실패해도 다음 단계로 진행할지 결정
      }

      // 4. 다음 단계로 이동
      setIsPriorityModalOpen(true)
    } catch (error) {
      showToast('프로젝트 생성 및 파일 업로드 실패:', 'error')
    }
  }

  const { showToast } = useToast()

  const handleToastSuccess = () => {
    showToast('성공적으로 저장되었습니다!', 'success')
  }

  const handleToastError = () => {
    showToast('오류가 발생했습니다.', 'error')
  }

  return (
    <div className="gap-y-l flex flex-col">
      <div className="flex flex-col gap-y-[16px]">
        <FinalBasicInfo setCurrentStep={setCurrentStep} />
        <FinalRequestCondition setCurrentStep={setCurrentStep} />
        <FinalShippingAndExtraInfo setCurrentStep={setCurrentStep} />
      </div>

      <div className="flex w-full items-center justify-center gap-x-2">
        <p className="body1">견적서 작성 일자</p>
        <p className="sub2">{finalProjectData ? formatDate(finalProjectData?.modifiedAt) : null}</p>
      </div>

      <section className="flex justify-between">
        <Button1
          onClick={() => {
            setCurrentStep(4)
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
            onClick={async () => {
              if (projectId) {
                const response = await postProjectDraft(projectId, {
                  ...projectData,
                  submitStatus: 'TEMPORARY_SAVE',
                  memberId: userData?.memberId,
                })
                if (response.result === 'SUCCESS') {
                  handleToastSuccess()
                } else {
                  handleToastError()
                }
              }
            }}
            customClassName={'h-[52px] w-[260px]'}
            styleStatus={'default'}
            styleSize={'lg'}
            styleType={'outline'}
          >
            임시저장
          </Button1>
          <Button1
            onClick={handleProjectSubmit}
            customClassName={'h-[52px] w-[260px]'}
            styleStatus={'default'}
            styleType={'primary'}
            styleSize={'lg'}
          >
            완료하기
          </Button1>
        </div>
      </section>
    </div>
  )
}
