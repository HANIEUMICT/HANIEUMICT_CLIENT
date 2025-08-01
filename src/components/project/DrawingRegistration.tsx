import { Dispatch, SetStateAction, useEffect, useState } from 'react'
import ProjectNameField from '@/components/project/drawing-registration/ProjectNameField'
import ManufacturingCategorySelect from '@/components/project/drawing-registration/ManufacturingCategorySelect'
import ProductPurposeSelect from '@/components/project/drawing-registration/ProductPurposeSelect'
import ProductUsageDetailField from '@/components/project/drawing-registration/ProductUsageDetailField'
import Button1 from '@/components/common/Button1'
import { useProjectStore } from '@/store/projectStore'
import ManufacturingCategoryDetailSelect from '@/components/project/drawing-registration/ManufacturingCategoryDetailSelect'
import ManufacturingCategoryDetailEtcField from '@/components/project/drawing-registration/ManufacturingCategoryDetailEtcField'
import { postProjectDraft } from '@/lib/project'
import { UserDataType } from '@/type/common'

interface DrawingRegistrationProps {
  setCurrentStep: Dispatch<SetStateAction<number>>
}
export default function DrawingRegistration({ setCurrentStep }: DrawingRegistrationProps) {
  const projectData = useProjectStore((state) => state.projectData)
  const projectId = useProjectStore((state) => state.projectId)
  const [userData, setUserData] = useState<UserDataType | null>(null)

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
      <section className="border-gray-20 flex flex-col gap-y-[16px] rounded-[24px] border bg-white p-6">
        <p className="sub1">기본정보</p>
        <ProjectNameField />
        <ManufacturingCategorySelect />
        <ManufacturingCategoryDetailSelect />
        <ManufacturingCategoryDetailEtcField />
        <ProductPurposeSelect />
        <ProductUsageDetailField />
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
            onClick={async () => {
              if (projectId) {
                const response = await postProjectDraft(projectId, {
                  ...projectData,
                  submitStatus: 'TEMPORARY_SAVE',
                  memberId: userData?.memberId,
                })
                console.log('임시저장 성공', response)
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
              setCurrentStep(4)
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
