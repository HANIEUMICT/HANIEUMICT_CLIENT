import Button1 from '@/components/common/Button1'

export default function FinalProposalContentPreview() {
  return (
    <div className="border-gray-20 flex flex-col gap-y-4 rounded-[24px] border bg-white p-6">
      <h1 className="sub1">견적 내용</h1>
      <section className="flex flex-col gap-y-4">
        <section className="bg-gray-10 flex flex-col gap-y-4 rounded-[20px] p-5">
          <p className="sub2 text-conic-orange-30">품목1</p>
          <div className="flex gap-x-4">
            <div className="flex w-[314px] flex-col gap-y-3">
              <p className="sub2">품명</p>
              <p className="text-gray-40 body1">품명</p>
            </div>
            <div className="flex w-[314px] flex-col gap-y-3">
              <p className="sub2">규격</p>
              <p className="text-gray-40 body1">규격</p>
            </div>
            <div className="flex w-[314px] flex-col gap-y-3">
              <p className="sub2">단가</p>
              <p className="text-gray-40 body1">단가</p>
            </div>
          </div>

          <div className="flex gap-x-4">
            <div className="flex w-[314px] flex-col gap-y-3">
              <p className="sub2">수량</p>
              <p className="text-gray-40 body1">품명</p>
            </div>
            <div className="flex w-[314px] flex-col gap-y-3">
              <p className="sub2">가격</p>
              <p className="text-gray-40 body1">규격</p>
            </div>
            <div className="flex w-[314px] flex-col gap-y-3">
              <p className="sub2">비고</p>
              <p className="text-gray-40 body1">단가</p>
            </div>
          </div>
        </section>
        <section className="bg-gray-10 flex flex-col gap-y-4 rounded-[20px] p-5">
          <p className="sub2 text-conic-orange-30">품목2</p>
          <div className="flex gap-x-4">
            <div className="flex w-[314px] flex-col gap-y-3">
              <p className="sub2">품명</p>
              <p className="text-gray-40 body1">품명</p>
            </div>
            <div className="flex w-[314px] flex-col gap-y-3">
              <p className="sub2">규격</p>
              <p className="text-gray-40 body1">규격</p>
            </div>
            <div className="flex w-[314px] flex-col gap-y-3">
              <p className="sub2">단가</p>
              <p className="text-gray-40 body1">단가</p>
            </div>
          </div>

          <div className="flex gap-x-4">
            <div className="flex w-[314px] flex-col gap-y-3">
              <p className="sub2">수량</p>
              <p className="text-gray-40 body1">품명</p>
            </div>
            <div className="flex w-[314px] flex-col gap-y-3">
              <p className="sub2">가격</p>
              <p className="text-gray-40 body1">규격</p>
            </div>
            <div className="flex w-[314px] flex-col gap-y-3">
              <p className="sub2">비고</p>
              <p className="text-gray-40 body1">단가</p>
            </div>
          </div>
        </section>
        <div className="flex flex-col gap-y-3">
          <p className="sub2">1차 금액</p>
          <p className="body1 text-gray-40">100원</p>
        </div>
        <div className="flex flex-col gap-y-3">
          <p className="sub2">2차 금액</p>
          <p className="body1 text-gray-40">1000원</p>
        </div>
        <div className="flex justify-between">
          <p className="sub2">최종 제안 금액</p>
          <p className="sub1 text-conic-red-30">10000000원</p>
        </div>
      </section>
      <div className="flex w-full justify-end">
        <Button1 styleSize={'md'} styleStatus={'disabled'} styleType={'outline'} customClassName={'h-[48px] w-[160px]'}>
          수정
        </Button1>
      </div>
    </div>
  )
}
