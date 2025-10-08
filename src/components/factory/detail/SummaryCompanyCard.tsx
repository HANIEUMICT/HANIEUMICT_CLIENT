import Image from 'next/image'

export default function SummaryCompanyCard() {
  const summaryContents = [
    { key: '연락가능 시간', value: '09:00 - 18:00' },
    { key: '제작시 평균 소요 시간', value: '약 3개월' },
    { key: '평균 응답시간', value: '3시간 이내' },
    { key: '거래 건수', value: '10건' },
    { key: '재거래 건수', value: '2건' },
  ]
  return (
    <div className="p-s border-gray-20 gap-y-2xs flex w-full flex-col rounded-[24px] border bg-white">
      <section className="flex gap-x-4">
        <div className="relative h-[214px] w-[214px]">
          <Image src={'/company-graphic.svg'} alt="회사로고" className="rounded-[12px] object-cover" fill />
        </div>
        <div className="gap-y-4xs flex flex-col">
          <div className="gap-x-5xs button-sm pl-5xs pr-4xs bg-conic-blue-30 py-5xs flex w-fit items-center justify-center rounded-[12px] text-white">
            <div className="badge text-conic-blue-30 p-5xs bg-conic-blue-10 rounded-[8px]">AI 분석</div>
            품질이 좋은 공급업체
          </div>
          <h1 className="sub1">업태명(기업명)</h1>
          <p className="sub1 text-gray-50">종목</p>
          <div className="gap-y-4xs flex flex-col">
            <div className="gap-x-5xs flex">
              <div className="body2 w-[100px] text-gray-50">사업자 등록 번호</div>
              <p className="button-lg">10110101011</p>
            </div>
            <div className="gap-x-5xs flex">
              <div className="body2 w-[100px] text-gray-50">대표자명</div>
              <p className="button-lg">10110101011</p>
            </div>
            <div className="gap-x-5xs flex">
              <div className="body2 w-[100px] text-gray-50">대표자 이메일</div>
              <p className="button-lg">10110101011</p>
            </div>
            <div className="gap-x-5xs flex">
              <div className="body2 w-[100px] text-gray-50">대표자 전화번호</div>
              <p className="button-lg">10110101011</p>
            </div>
          </div>
        </div>
      </section>
      <section className="gap-x-2xs flex">
        {summaryContents.map((summaryContent) => {
          return (
            <div
              key={summaryContent.key}
              className="gap-y-5xs py-3xs bg-gray-10 flex w-full flex-col items-center justify-center rounded-[12px]"
            >
              <p className="body2 text-gray-40">{summaryContent.key}</p>
              <p className="sub2">{summaryContent.value}</p>
            </div>
          )
        })}
      </section>
    </div>
  )
}
