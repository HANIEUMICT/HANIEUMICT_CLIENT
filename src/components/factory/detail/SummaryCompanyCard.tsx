import Image from 'next/image'
import { CompanyDetailInfoType } from '@/type/company'
import { useState } from 'react'
import { ImgUploadIcon } from '@/assets/svgComponents'

interface SummaryCompanyCardProps {
  companyDetailData: CompanyDetailInfoType | undefined
}

export default function SummaryCompanyCard({ companyDetailData }: SummaryCompanyCardProps) {
  const companyInfo = companyDetailData?.company
  const companyDetail = companyDetailData?.detail
  const [isImgError, setIsImgError] = useState(false)

  const summaryContents = [
    { key: '연락가능 시간', value: companyDetail?.contactAvailableTime ?? '없음' },
    { key: '제작시 평균 소요 시간', value: companyDetail?.avgProductionLeadHours ?? '없음' },
    { key: '평균 응답시간', value: companyDetail?.avgResponseMinutes ?? '없음' },
    { key: '거래 건수', value: '10건' },
    { key: '재거래 건수', value: '2건' },
  ]
  return (
    <div className="p-s border-gray-20 gap-y-2xs flex w-full flex-col rounded-[24px] border bg-white">
      <section className="flex gap-x-4">
        {isImgError ? (
          <ImgUploadIcon width={214} height={214} />
        ) : companyDetail?.logoUrl ? (
          <div className="relative h-[214px] w-[214px]">
            <Image
              src={companyDetail?.logoUrl}
              alt="회사로고"
              className="rounded-[12px] object-cover"
              fill
              onError={() => setIsImgError(true)}
            />
          </div>
        ) : null}

        <div className="gap-y-4xs flex flex-col">
          <div className="gap-x-5xs button-sm pl-5xs pr-4xs bg-conic-blue-30 py-5xs flex w-fit items-center justify-center rounded-[12px] text-white">
            <div className="badge text-conic-blue-30 p-5xs bg-conic-blue-10 rounded-[8px]">AI 분석</div>
            품질이 좋은 공급업체
          </div>
          <h1 className="sub1">{companyInfo?.name}</h1>
          <p className="sub1 text-gray-50">{companyInfo?.industry}</p>
          <div className="gap-y-4xs flex flex-col">
            <div className="gap-x-5xs flex">
              <div className="body2 w-[100px] text-gray-50">사업자 등록 번호</div>
              <p className="button-lg">{companyInfo?.registrationNumber}</p>
            </div>
            <div className="gap-x-5xs flex">
              <div className="body2 w-[100px] text-gray-50">대표자명</div>
              <p className="button-lg">{companyInfo?.owner}</p>
            </div>
            <div className="gap-x-5xs flex">
              <div className="body2 w-[100px] text-gray-50">대표자 이메일</div>
              <p className="button-lg">{companyInfo?.email}</p>
            </div>
            <div className="gap-x-5xs flex">
              <div className="body2 w-[100px] text-gray-50">대표자 전화번호</div>
              <p className="button-lg">{companyInfo?.phoneNumber}</p>
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
