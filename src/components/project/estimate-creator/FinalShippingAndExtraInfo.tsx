import Button1 from '@/components/common/Button1'

export default function FinalShippingAndExtraInfo() {
  return (
    <section className="border-gray-20 flex flex-col gap-y-[16px] rounded-[24px] border bg-white p-6">
      <h1 className="sub1">배송 및 추가 정보입력</h1>
      <section className="flex flex-col gap-y-[16px]">
        <div className="flex">
          <div className="flex w-[577px] flex-col gap-y-[12px]">
            <p className="sub2">견적서 공개 여부</p>
            <p className="body1 text-gray-40">프로젝트명</p>
          </div>
          <div className="flex w-[577px] flex-col gap-y-[12px]">
            <p className="sub2">견적서를 공개할 공장</p>
            <p className="body1 text-gray-40">프로젝트명</p>
          </div>
        </div>
        <div className="flex w-[577px] flex-col gap-y-[12px]">
          <p className="sub2">전화 상담 여부</p>
          <p className="body1 text-gray-40">프로젝트명</p>
        </div>
        <div className="flex w-[577px] w-full flex-col gap-y-[12px]">
          <p className="sub2">배송지</p>
          <div className="gap-y-2xs p-s border-gray-20 flex w-full flex-col rounded-[24px] border">
            <p className="sub1">기업명</p>
            <div className="gap-x-4xs flex">
              <p className="text-gray-40 body1">주소</p>
              <p className="sub2 text-gray-50">서울특별시 금천구 벚꽃로 298</p>
            </div>
          </div>
        </div>
      </section>
      <div className="flex w-full justify-end">
        <Button1
          onClick={() => {}}
          styleType={'outline'}
          styleStatus={'default'}
          styleSize={'md'}
          customClassName={'w-[128px] h-[48px]'}
        >
          수정
        </Button1>
      </div>
    </section>
  )
}
