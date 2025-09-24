import Button1 from '@/components/common/Button1'

export default function MyDeliveryInfoPage() {
  return (
    <section className="gap-y-2xs mt-[40px] flex w-[1220px] flex-col">
      <div className="flex justify-between">
        <h1 className="h2">배송 정보</h1>
        <Button1
          onClick={() => {}}
          styleStatus={'default'}
          styleSize={'sm'}
          styleType={'secondary'}
          customClassName={'w-[80px] rounded-full h-[36px]'}
        >
          추가
        </Button1>
      </div>
      <section className="p-s border-gray-20 flex justify-between gap-y-[16px] rounded-[24px] border bg-white">
        <div className="flex flex-col gap-y-[16px]">
          <div className="gap-x-4xs flex items-center">
            <h1 className="sub1">배송지명</h1>
            <div className="badge text-conic-blue-30 bg-conic-blue-10 p-5xs w-fit rounded-[4px]">기본 배송지</div>
          </div>

          <div className="flex items-center gap-x-[7px]">
            <p className="body1 text-gray-40">전화번호</p>
            <p className="button-lg">010-7557-9217</p>
          </div>
          <div className="flex items-center gap-x-[7px]">
            <p className="body1 text-gray-40">주소</p>
            <p className="button-lg">서울특별시 금천구 벚꽃로 298</p>
          </div>
        </div>
        <div className="flex h-fit gap-x-3">
          <Button1
            onClick={() => {}}
            styleType={'secondary'}
            styleSize={'sm'}
            styleStatus={'disabled'}
            customClassName={'text-gray-40 w-[80px] rounded-full h-[36px]'}
          >
            삭제
          </Button1>
          <Button1
            onClick={() => {}}
            styleType={'outline'}
            styleSize={'sm'}
            styleStatus={'default'}
            customClassName={'text-gray-40 w-[80px] rounded-full h-[36px]'}
          >
            수정
          </Button1>
        </div>
      </section>
    </section>
  )
}
