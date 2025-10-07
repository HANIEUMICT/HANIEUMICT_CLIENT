import { useEffect, useState } from 'react'
import { getCompany } from '@/lib/company'
import { getUserData } from '@/utils/common'
import { CompanyType } from '@/type/company'

export default function FinalBusinessInfoPreview() {
  const [companyData, setCompanyData] = useState<CompanyType>()

  useEffect(() => {
    getCompany(getUserData()?.companyId).then((result) => {
      if (result.result === 'SUCCESS') {
        setCompanyData(result.data)
      }
    })
  }, [])

  return (
    <div className="border-gray-20 flex flex-col gap-y-4 rounded-[24px] border bg-white p-6">
      <h1 className="sub1">사업자 정보</h1>
      <section className="flex flex-col gap-y-4">
        <div className="flex gap-x-4">
          <div className="flex w-[500px] flex-col gap-y-3">
            <p className="sub2">사업자 번호</p>
            <p className="body1 text-gray-40">{companyData?.registrationNumber}</p>
          </div>
          <div className="flex w-[500px] flex-col gap-y-3">
            <p className="sub2">대표자</p>
            <p className="body1 text-gray-40">{companyData?.owner}</p>
          </div>
        </div>
        <div className="flex gap-x-4">
          <div className="flex w-[500px] flex-col gap-y-3">
            <p className="sub2">상호</p>
            <p className="body1 text-gray-40">{companyData?.name}</p>
          </div>
          <div className="flex w-[500px] flex-col gap-y-3">
            <p className="sub2">소재지</p>
            <p className="body1 text-gray-40">
              {companyData?.address.road} {companyData?.address.detail}
            </p>
          </div>
        </div>
        <div className="flex gap-x-4">
          <div className="flex w-[500px] flex-col gap-y-3">
            <p className="sub2">업태</p>
            <p className="body1 text-gray-40">{companyData?.businessType}</p>
          </div>
          <div className="flex w-[500px] flex-col gap-y-3">
            <p className="sub2">종목</p>
            <p className="body1 text-gray-40">{companyData?.industry}</p>
          </div>
        </div>
      </section>
    </div>
  )
}
