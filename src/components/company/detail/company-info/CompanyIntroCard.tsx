import { CompanyDetailType, CompanyType } from '@/type/company'
import Link from 'next/link'

interface CompanyIntroCardProps {
  companyInfoData: CompanyType | undefined
  companyDetailData: CompanyDetailType | undefined
}
export default function CompanyIntroCard({ companyInfoData, companyDetailData }: CompanyIntroCardProps) {
  return (
    <div className="gap-y-2xs flex flex-col">
      <h2 className="h2">{companyInfoData?.name}</h2>
      <section className="gap-y-s border-gray-20 flex flex-col rounded-[24px] border bg-white p-6">
        <section className="flex flex-col gap-y-3">
          <p className="sub1">기업 소개글</p>
          <p className="body1">{companyDetailData?.description}</p>
        </section>
        <section className="gap-x-xs flex">
          <section className="flex flex-col gap-y-3">
            <h3 className="sub1">기업 정보</h3>
            <div className="py-4xs px-2xs border-gray-20 flex h-full w-[325px] flex-col justify-between rounded-[16px] border">
              <div className="py-4xs flex items-center justify-between">
                <p className="body1 text-gray-50">설립연도</p>
                <p className="button-lg">{companyDetailData?.establishedAt}</p>
              </div>
              <div className="border-gray-20 w-full border-b" />
              <div className="py-4xs flex items-center justify-between">
                <p className="body1 text-gray-50">규모</p>
                <p className="button-lg">{companyDetailData?.employeeCount}</p>
              </div>
              <div className="border-gray-20 w-full border-b" />
              <div className="py-4xs flex items-center justify-between">
                <p className="body1 text-gray-50">연락처</p>
                <p className="button-lg">{companyInfoData?.phoneNumber}</p>
              </div>
              <div className="border-gray-20 w-full border-b" />
              <div className="py-4xs flex items-center justify-between">
                <p className="body1 text-gray-50">연락 가능 시간</p>
                <p className="button-lg">{companyDetailData?.contactAvailableTime}</p>
              </div>
              <div className="border-gray-20 w-full border-b" />
              <div className="py-4xs flex items-center justify-between">
                <p className="body1 text-gray-50">홈페이지</p>
                {companyDetailData?.websiteUrl ? (
                  <Link href={companyDetailData?.websiteUrl} className="button-lg text-conic-blue-30">
                    {companyDetailData?.websiteUrl}
                  </Link>
                ) : (
                  <p className="button-lg text-conic-blue-30">{companyDetailData?.websiteUrl}</p>
                )}
              </div>
            </div>
          </section>
          <section className="flex w-full flex-col gap-y-3">
            <div className="flex gap-x-3">
              <h3 className="sub1 text-gray-50">공장위치</h3>
              <p className="sub2">{`${companyInfoData?.address.street} ${companyInfoData?.address.detail}`}</p>
            </div>
            <div className="bg-gray-10 flex h-[256px] w-full items-center justify-center rounded-[16px]">
              {' '}
              서비스 준비중입니다.
            </div>
          </section>
        </section>
      </section>
    </div>
  )
}
