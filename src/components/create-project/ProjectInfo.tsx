import { Dispatch, RefObject, SetStateAction, useEffect, useMemo, useState } from 'react'
import { useProjectStore } from '@/store/projectStore'
import Button1 from '@/components/common/Button1'
import HasDrawingSelector from '@/components/create-project/project-info/HasDrawingSelector'
import DueDatePicker from '@/components/create-project/project-info/DueDatePicker'
import ProductionQuantityField from '@/components/create-project/project-info/ProductionQuantityField'
import RequestDetailField from '@/components/create-project/project-info/RequestDetailField'
import BiddingDueDateSelect from '@/components/create-project/project-info/BiddingDueDateSelect'
import EstimatedBudgetField from '@/components/create-project/project-info/EstimatedBudgetField'
import DrawingUploadField from '@/components/create-project/project-info/DrawingUploadField'
import { postProjectDraft } from '@/lib/project'
import { UserDataType } from '@/type/common'
import { useFileUpload } from '@/hooks/useFileUpload'
import { useProjectImageUpload } from '@/hooks/useProjectImageUpload'
import { useToast } from '@/provider/ToastProvider'

interface ProjectInfoProps {
  setCurrentStep: Dispatch<SetStateAction<number>>
  posterImgRef: RefObject<HTMLInputElement | null>
  hasDrawingSelected: boolean | undefined
  setHasDrawingSelected: Dispatch<SetStateAction<boolean | undefined>>
}
export default function ProjectInfo({
  setCurrentStep,
  posterImgRef,
  hasDrawingSelected,
  setHasDrawingSelected,
}: ProjectInfoProps) {
  const projectData = useProjectStore((state) => state.projectData)
  const fileInfoList = useProjectStore((state) => state.fileInfoList)
  const projectId = useProjectStore((state) => state.projectId)
  const responseDrawingUrls = useProjectStore((state) => state.responseDrawingUrls)

  const [userData, setUserData] = useState<UserDataType | null>(null)
  const { uploadFiles } = useFileUpload()
  const { uploadCallback } = useProjectImageUpload(projectId)

  const handleUpload = async () => {
    // 프로젝트 이미지 등록과 함께 업로드
    const result = await uploadFiles(fileInfoList, uploadCallback)

    if (result.success) {
      console.log('업로드된 URL들:', result.uploadedUrls)
    }
  }

  const { showToast } = useToast()

  const handleToastSuccess = () => {
    showToast('성공적으로 저장되었습니다!', 'success')
  }

  const handleToastError = () => {
    showToast('오류가 발생했습니다.', 'error')
  }

  const isFormValid = useMemo(() => {
    return !!(
      projectData.projectQuantity != 0 &&
      projectData.deadline?.trim() &&
      projectData.requestEstimate != 0 &&
      projectData.publicUntil?.trim()
    )
  }, [projectData.projectQuantity, projectData.deadline, projectData.requestEstimate, projectData.publicUntil])

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

  return (
    <div className="gap-y-l flex flex-col">
      <div className="flex flex-col gap-y-[16px]">
        <section className="p-s border-gray-20 flex flex-col gap-y-[12px] rounded-[24px] border bg-white">
          <h1 className="sub1">프로젝트명</h1>
          <p className="body1 text-gray-40">{projectData?.projectTitle}</p>
        </section>
        <section className="border-gray-20 flex flex-col gap-y-[16px] rounded-[24px] border bg-white p-6">
          <p className="sub1">요청 조건입력</p>
          <HasDrawingSelector hasDrawingSelected={hasDrawingSelected} setHasDrawingSelected={setHasDrawingSelected} />
          {hasDrawingSelected && <DrawingUploadField posterImgRef={posterImgRef} />}
          <ProductionQuantityField />
          <RequestDetailField />
          <DueDatePicker />
          <EstimatedBudgetField />
          <BiddingDueDateSelect />
        </section>
      </div>

      <section className="flex justify-between">
        <Button1
          onClick={() => {
            setCurrentStep(3)
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
                } else if (response.result === 'ERROR') {
                  handleToastError()
                }
                console.log('임시저장', response)

                // 3. 파일 업로드 실행
                const uploadSuccess = await handleUpload()
                console.log(uploadSuccess)
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
            onClick={() => {
              setCurrentStep(5)
            }}
            customClassName={'h-[52px] w-[260px]'}
            disabled={!isFormValid}
            styleStatus={isFormValid ? 'default' : 'disabled'}
            styleType={'primary'}
            styleSize={'lg'}
          >
            다음
          </Button1>
        </div>
      </section>
    </div>
  )
}
