import Button1 from '@/components/common/Button1'

export default function FinalBusinessInfoPreview() {
  return (
    <div className="border-gray-20 flex flex-col gap-y-4 rounded-[24px] border bg-white p-6">
      <h1 className="sub1">사업자 정보</h1>
      <section className="flex flex-col gap-y-4">
        <div className="flex gap-x-4">
          <div className="flex w-[500px] flex-col gap-y-3">
            <p className="sub2">사업자 번호</p>
            <p className="body1 text-gray-40">사업자번호</p>
          </div>
          <div className="flex w-[500px] flex-col gap-y-3">
            <p className="sub2">대표자</p>
            <p className="body1 text-gray-40">사업자번호</p>
          </div>
        </div>
        <div className="flex gap-x-4">
          <div className="flex w-[500px] flex-col gap-y-3">
            <p className="sub2">상호</p>
            <p className="body1 text-gray-40">사업자번호</p>
          </div>
          <div className="flex w-[500px] flex-col gap-y-3">
            <p className="sub2">소재지</p>
            <p className="body1 text-gray-40">사업자번호</p>
          </div>
        </div>
        <div className="flex gap-x-4">
          <div className="flex w-[500px] flex-col gap-y-3">
            <p className="sub2">업태</p>
            <p className="body1 text-gray-40">사업자번호</p>
          </div>
          <div className="flex w-[500px] flex-col gap-y-3">
            <p className="sub2">종목</p>
            <p className="body1 text-gray-40">사업자번호</p>
          </div>
        </div>
        <div className="flex gap-x-4">
          <div className="flex w-[500px] flex-col gap-y-3">
            <p className="sub2">담당자</p>
            <p className="body1 text-gray-40">사업자번호</p>
          </div>
          <div className="flex w-[500px] flex-col gap-y-3">
            <p className="sub2">연락처</p>
            <p className="body1 text-gray-40">사업자번호</p>
          </div>
        </div>
      </section>
      <div className="flex w-full justify-end">
        <Button1
          onClick={() => {}}
          styleSize={'md'}
          styleStatus={'disabled'}
          styleType={'outline'}
          customClassName={'h-[48px] w-[160px]'}
        >
          수정
        </Button1>
      </div>
    </div>
  )
}
