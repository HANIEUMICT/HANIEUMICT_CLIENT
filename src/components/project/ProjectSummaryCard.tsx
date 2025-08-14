export default function ProjectSummaryCard() {
  return (
    <div className="border-gray-20 p-s gap-y-xs flex h-fit w-[442px] flex-shrink-0 flex-col rounded-[24px] border bg-white whitespace-nowrap">
      <div className="flex flex-col gap-y-3">
        <p className="sub1">프로젝트명</p>
        <div className="bg-gray-20 h-[200px] w-full rounded-[16px]" />
      </div>
      <div className="gap-y-5xs flex flex-col">
        <div className="flex justify-between">
          <p className="body2 text-gray-40">카테고리</p>
          <p className="button-sm text-gray-50">카테고리</p>
        </div>
        <div className="flex justify-between">
          <p className="body2 text-gray-40">제조 분류</p>
          <p className="button-sm text-gray-50">제조 분류</p>
        </div>
        <div className="flex justify-between">
          <p className="body2 text-gray-40">제품 용도</p>
          <p className="button-sm text-gray-50">제품 용도</p>
        </div>
        <div className="flex justify-between">
          <p className="body2 text-gray-40">요청 제조 서비스</p>
          <p className="button-sm text-gray-50">요청 제조 서비스</p>
        </div>
        <div className="flex justify-between">
          <p className="body2 text-gray-40">상세 제품 용도 입력</p>
          <p className="button-sm text-gray-50">상세 제품 용도 입력</p>
        </div>
      </div>
      <div className="border-gray-20 h-[1px] w-full border-b" />
      <div className="gap-y-5xs flex flex-col">
        <div className="flex justify-between">
          <p className="body2 text-gray-40">수량</p>
          <p className="button-sm text-gray-50">1,000개</p>
        </div>
        <div className="flex justify-between">
          <p className="body2 text-gray-40">예상 추정액</p>
          <p className="button-sm text-gray-50">10,000,000원</p>
        </div>
        <div className="flex justify-between">
          <p className="body2 text-gray-40">납기일</p>
          <p className="button-sm text-gray-50">2025. 05. 06</p>
        </div>
        <div className="flex justify-between">
          <p className="body2 text-gray-40">세부 요청사항</p>
          <p className="button-sm text-gray-50">2025. 05. 06</p>
        </div>
      </div>
      <div className="border-gray-20 h-[1px] w-full border-b" />
      <div>
        <div className="flex justify-between">
          <p className="body2 text-gray-40">상담 유형</p>
          <p className="button-sm text-gray-50">상담 유형</p>
        </div>
        <div className="flex justify-between">
          <p className="body2 text-gray-40">전화 상담 여부</p>
          <p className="button-sm text-gray-50">전화 상담 여부</p>
        </div>
        <div className="flex justify-between">
          <p className="body2 text-gray-40">배송지</p>
          <p className="button-sm text-gray-50">배송지</p>
        </div>
      </div>
    </div>
  )
}
