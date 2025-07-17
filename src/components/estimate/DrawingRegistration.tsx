import { Dispatch, SetStateAction } from 'react'
import ProjectNameField from '@/components/estimate/drawing-registration/ProjectNameField'
import ManufacturingCategorySelect from '@/components/estimate/drawing-registration/ManufacturingCategorySelect'
import ManufacturingServiceSelect from '@/components/estimate/drawing-registration/ManufacturingServiceSelect'
import RequestedServiceSelect from '@/components/estimate/drawing-registration/RequestedServiceSelect'
import ProductPurposeSelect from '@/components/estimate/drawing-registration/ProductPurposeSelect'
import ProductUsageDetailField from '@/components/estimate/drawing-registration/ProductUsageDetailField'
import Button1 from '@/components/common/Button1'

interface DrawingRegistrationProps {
  setCurrentStep: Dispatch<SetStateAction<number>>
}
export default function DrawingRegistration({ setCurrentStep }: DrawingRegistrationProps) {
  return (
    <div className="gap-y-l flex flex-col">
      <section className="border-gray-20 flex flex-col gap-y-[16px] rounded-[24px] border bg-white p-6">
        <p className="sub1">기본정보</p>
        <ProjectNameField />
        <ManufacturingCategorySelect />
        <ManufacturingServiceSelect />
        <RequestedServiceSelect />
        <ProductPurposeSelect />
        <ProductUsageDetailField />
      </section>
      <section className="flex justify-between">
        <Button1
          onClick={() => {}}
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
