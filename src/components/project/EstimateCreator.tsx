import { Dispatch, SetStateAction } from 'react'
import Button1 from '@/components/common/Button1'
import FinalBasicInfo from '@/components/project/estimate-creator/FinalBasicInfo'
import FinalRequestCondition from '@/components/project/estimate-creator/FinalRequestCondition'
import FinalShippingAndExtraInfo from '@/components/project/estimate-creator/FinalShippingAndExtraInfo'

interface EstimateCreatorProps {
  setCurrentStep: Dispatch<SetStateAction<number>>
}
export default function EstimateCreator({ setCurrentStep }: EstimateCreatorProps) {
  return (
    <div>
      <div className="flex flex-col gap-y-[16px]">
        <FinalBasicInfo />
        <FinalRequestCondition />
        <FinalShippingAndExtraInfo />
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
            onClick={() => {}}
            customClassName={'h-[52px] w-[260px]'}
            styleStatus={'disabled'}
            styleSize={'lg'}
            styleType={'outline'}
          >
            임시저장
          </Button1>
          <Button1
            onClick={() => {}}
            customClassName={'h-[52px] w-[260px]'}
            styleStatus={'disabled'}
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
