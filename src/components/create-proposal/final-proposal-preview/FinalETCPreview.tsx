import Button1 from '@/components/common/Button1'
import { useProposalStore } from '@/store/proposalStore'

type StepType = '1' | '2' | '3' | '4' | '5'

interface FinalETCPreviewProps {
  handleStepClick: (step: StepType) => void
}

export default function FinalETCPreview({ handleStepClick }: FinalETCPreviewProps) {
  const proposalData = useProposalStore((state) => state.proposalData)

  return (
    <div className="border-gray-20 flex flex-col gap-y-4 rounded-[24px] border bg-white p-6">
      <h1 className="sub1">기타 내용</h1>
      <section className="flex flex-col gap-y-4">
        <div className="flex flex-col gap-y-3">
          <p className="sub2">최대 제조 가능 날짜</p>
          <p className="body1 text-gray-40">{proposalData?.operateUntil}</p>
        </div>
        <div className="flex flex-col gap-y-3">
          <p className="sub2">기타 견적 정보</p>
          <p className="body1 text-gray-40">{proposalData?.proposalNote}</p>
        </div>
      </section>
      <div className="flex w-full justify-end">
        <Button1
          onClick={() => {
            handleStepClick('3')
          }}
          styleSize={'md'}
          styleStatus={'default'}
          styleType={'outline'}
          customClassName={'h-[48px] w-[160px]'}
        >
          수정
        </Button1>
      </div>
    </div>
  )
}
