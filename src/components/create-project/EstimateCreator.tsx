import { Dispatch, SetStateAction } from 'react'
import Button1 from '@/components/common/Button1'
import FinalBasicInfo from '@/components/create-project/estimate-creator/FinalBasicInfo'
import FinalRequestCondition from '@/components/create-project/estimate-creator/FinalRequestCondition'
import FinalShippingAndExtraInfo from '@/components/create-project/estimate-creator/FinalShippingAndExtraInfo'
import { useProjectStore } from '@/store/projectStore'
import { formatDate } from '@/utils/project'

interface EstimateCreatorProps {
  setCurrentStep: Dispatch<SetStateAction<number>>
}
export default function EstimateCreator({ setCurrentStep }: EstimateCreatorProps) {
  const finalProjectData = useProjectStore((state) => state.finalProjectData)

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
