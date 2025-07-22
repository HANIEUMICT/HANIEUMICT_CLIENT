import { Dispatch, SetStateAction } from 'react'
import Button1 from '@/components/common/Button1'

interface ShippingInfoProps {
  setCurrentStep: Dispatch<SetStateAction<number>>
}
export default function ShippingInfo({ setCurrentStep }: ShippingInfoProps) {
  return (
    <div className="gap-y-l flex flex-col">
      <div className="flex flex-col gap-y-[16px]">
        <section className="p-s border-gray-20 flex flex-col gap-y-[12px] rounded-[24px] border bg-white">
          <h1 className="sub1">프로젝트명</h1>
          <p className="body1 text-gray-40">프로젝트명</p>
        </section>
        <section className="border-gray-20 flex flex-col gap-y-[16px] rounded-[24px] border bg-white p-6">
          <p className="sub1">배송 및 추가 정보입력</p>
          <div></div>
        </section>
      </div>

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
              setCurrentStep(6)
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
