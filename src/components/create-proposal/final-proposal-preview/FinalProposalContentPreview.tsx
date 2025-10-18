import Button1 from '@/components/common/Button1'
import { useProposalStore } from '@/store/proposalStore'

type StepType = '1' | '2' | '3' | '4' | '5'

interface FinalProposalContentPreviewProps {
  handleStepClick: (step: StepType) => void
}

export default function FinalProposalContentPreview({ handleStepClick }: FinalProposalContentPreviewProps) {
  const proposalData = useProposalStore((state) => state.proposalData)

  return (
    <div className="border-gray-20 flex flex-col gap-y-4 rounded-[24px] border bg-white p-6">
      <h1 className="sub1">견적 내용</h1>
      <section className="flex flex-col gap-y-4">
        {proposalData?.items?.map((item, index) => {
          return (
            <section key={item.itemName} className="bg-gray-10 flex flex-col gap-y-4 rounded-[20px] p-5">
              <p className="sub2 text-conic-orange-30">품목{index + 1}</p>
              <div className="flex gap-x-4">
                <div className="flex w-[314px] flex-col gap-y-3">
                  <p className="sub2">품명</p>
                  <p className="text-gray-40 body1">{item.itemName}</p>
                </div>
                <div className="flex w-[314px] flex-col gap-y-3">
                  <p className="sub2">규격</p>
                  <p className="text-gray-40 body1">{item.itemSize}</p>
                </div>
                <div className="flex w-[314px] flex-col gap-y-3">
                  <p className="sub2">단가</p>
                  <p className="text-gray-40 body1">{item.itemUnitPrice}</p>
                </div>
              </div>

              <div className="flex gap-x-4">
                <div className="flex w-[314px] flex-col gap-y-3">
                  <p className="sub2">수량</p>
                  <p className="text-gray-40 body1">{item.itemQuantity}</p>
                </div>
                <div className="flex w-[314px] flex-col gap-y-3">
                  <p className="sub2">가격</p>
                  <p className="text-gray-40 body1">{item.itemUnitPrice}</p>
                </div>
                <div className="flex w-[314px] flex-col gap-y-3">
                  <p className="sub2">비고</p>
                  <p className="text-gray-40 body1">{item.itemNote}</p>
                </div>
              </div>
            </section>
          )
        })}

        <div className="flex flex-col gap-y-3">
          <p className="sub2">1차 금액</p>
          <p className="body1 text-gray-40">{proposalData?.firstPrice?.toLocaleString()}원</p>
        </div>
        <div className="flex flex-col gap-y-3">
          <p className="sub2">2차 금액</p>
          <p className="body1 text-gray-40">{proposalData?.secondPrice?.toLocaleString()}원</p>
        </div>
        <div className="flex justify-between">
          <p className="sub2">최종 제안 금액</p>
          <p className="sub1 text-conic-red-30">{proposalData?.totalPrice?.toLocaleString()}원</p>
        </div>
      </section>
      <div className="flex w-full justify-end">
        <Button1
          onClick={() => {
            handleStepClick('2')
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
