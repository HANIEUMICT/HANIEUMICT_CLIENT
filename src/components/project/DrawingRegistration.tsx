import { Dispatch, SetStateAction, useEffect } from 'react'
import ProjectNameField from '@/components/project/drawing-registration/ProjectNameField'
import ManufacturingCategorySelect from '@/components/project/drawing-registration/ManufacturingCategorySelect'
import ProductPurposeSelect from '@/components/project/drawing-registration/ProductPurposeSelect'
import ProductUsageDetailField from '@/components/project/drawing-registration/ProductUsageDetailField'
import Button1 from '@/components/common/Button1'
import { useProjectStore } from '@/store/projectStore'
import ManufacturingCategoryDetailSelect from '@/components/project/drawing-registration/ManufacturingCategoryDetailSelect'
import ManufacturingCategoryDetailEtcField from '@/components/project/drawing-registration/ManufacturingCategoryDetailEtcField'

interface DrawingRegistrationProps {
  setCurrentStep: Dispatch<SetStateAction<number>>
}
export default function DrawingRegistration({ setCurrentStep }: DrawingRegistrationProps) {
  const projectData = useProjectStore((state) => state.projectData)
  const setState = useProjectStore((state) => state.setState)

  useEffect(() => {
    console.log('projectData', projectData)
  }, [projectData])

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
            onClick={() => {}}
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
