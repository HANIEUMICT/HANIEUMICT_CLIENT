import { Dispatch, RefObject, SetStateAction, useEffect, useState } from 'react'
import { useProjectStore } from '@/store/projectStore'
import Button1 from '@/components/common/Button1'
import HasDrawingSelector from '@/components/project/project-info/HasDrawingSelector'
import DueDatePicker from '@/components/project/project-info/DueDatePicker'
import ProductionQuantityField from '@/components/project/project-info/ProductionQuantityField'
import RequestDetailField from '@/components/project/project-info/RequestDetailField'
import BiddingDueDateSelect from '@/components/project/project-info/BiddingDueDateSelect'
import EstimatedBudgetField from '@/components/project/project-info/EstimatedBudgetField'
import DrawingUploadField from '@/components/project/project-info/DrawingUploadField'
import { postProjectDraft } from '@/lib/project'
import { UserDataType } from '@/type/common'
import { useFileUpload } from '@/hooks/useFileUpload'

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
  const projectId = useProjectStore((state) => state.projectId)

  const [userData, setUserData] = useState<UserDataType | null>(null)
  const { uploadFiles } = useFileUpload()

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
                console.log('임시저장 성공', response)

                // 3. 파일 업로드 실행
                const uploadSuccess = await uploadFiles(projectId)
                console.log(uploadSuccess)
              }
            }}
            customClassName={'h-[52px] w-[260px]'}
            styleStatus={'disabled'}
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
            styleStatus={'disabled'}
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
