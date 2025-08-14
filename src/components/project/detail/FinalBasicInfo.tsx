interface FinalBasicInfoProps {}
export default function FinalBasicInfo({}: FinalBasicInfoProps) {
  return (
    <section className="border-gray-20 flex w-[1063px] flex-col gap-y-[16px] rounded-[24px] border bg-white p-6">
      <h1 className="sub1">기본 정보</h1>
      <section className="flex flex-col gap-y-[16px]">
        <div className="flex flex-col gap-y-[12px]">
          <p className="sub2">프로젝트명</p>
          <p className="body1 text-gray-40">{''}</p>
        </div>
        <div className="flex">
          <div className="flex flex-col gap-y-[12px]">
            <p className="sub2">제조 분류 선택</p>
            <p className="body1 text-gray-40">{''}</p>
          </div>
          <div className="flex flex-col gap-y-[12px]">
            <p className="sub2">제조 분류 - 세부 항목 선택</p>
            <p className="body1 text-gray-40">{''}</p>
          </div>
        </div>
        <div className="flex flex-col gap-y-[12px]">
          <p className="sub2">제조 사항 상세 입력</p>
          <p className="body1 text-gray-40">{''}</p>
        </div>

        <div className="flex">
          <div className="flex flex-col gap-y-[12px]">
            <p className="sub2">제품 용도 선택</p>
            <p className="body1 text-gray-40">{''}</p>
          </div>
          <div className="flex flex-col gap-y-[12px]">
            <p className="sub2">상세 제품 용도 입력</p>
            <p className="body1 text-gray-40">{''}</p>
          </div>
        </div>
      </section>
    </section>
  )
}
