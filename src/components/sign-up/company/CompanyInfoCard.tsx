const CompanyInfoCard = () => {
  return (
    <div className="gap-y-2xs border-gray-20 p-s flex w-[600px] flex-col rounded-[24px] border bg-white">
      <div className="gap-y-4xs flex flex-col">
        <p className="sub1">기업명</p>
        <p className="sub1 text-gray-50">업종</p>
      </div>
      <div className="flex flex-col gap-y-2">
        <div className="gap-x-4xs flex">
          <div className="body1 text-gray-40 w-[100px]">대표자</div>
          <p className="button-lg">대표자명</p>
        </div>
        <div className="gap-x-4xs flex">
          <div className="body1 text-gray-40 w-[100px]">사업자등록번호</div>
          <p className="button-lg">000-00-00000</p>
        </div>
        <div className="gap-x-4xs flex">
          <div className="body1 text-gray-40 w-[100px]">주소</div>
          <p className="button-lg">서울특별시 금천구 벚꽃로 298</p>
        </div>
      </div>
    </div>
  )
}
export default CompanyInfoCard
