import Button1 from '@/components/common/Button1'

export default function FinalBasicInfo() {
  return (
    <section className="border-gray-20 flex flex-col gap-y-[16px] rounded-[24px] border bg-white p-6">
      <h1 className="sub1">기본 정보</h1>
      <section className="flex flex-col gap-y-[16px]">
        <div className="flex flex-col gap-y-[12px]">
          <p className="sub2">프로젝트명</p>
          <p className="body1 text-gray-40">프로젝트명</p>
        </div>
        <div className="flex">
          <div className="flex w-[577px] flex-col gap-y-[12px]">
            <p className="sub2">제조 분류 선택</p>
            <p className="body1 text-gray-40">프로젝트명</p>
          </div>
          <div className="flex w-[577px] flex-col gap-y-[12px]">
            <p className="sub2">제조 분류 - 세부 항목 선택</p>
            <p className="body1 text-gray-40">프로젝트명</p>
          </div>
        </div>
        <div className="flex w-[577px] flex-col gap-y-[12px]">
          <p className="sub2">제조 사항 상세 입력</p>
          <p className="body1 text-gray-40">프로젝트명</p>
        </div>

        <div className="flex">
          <div className="flex w-[577px] flex-col gap-y-[12px]">
            <p className="sub2">제품 용도 선택</p>
            <p className="body1 text-gray-40">프로젝트명</p>
          </div>
          <div className="flex w-[577px] flex-col gap-y-[12px]">
            <p className="sub2">상세 제품 용도 입력</p>
            <p className="body1 text-gray-40">프로젝트명</p>
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
