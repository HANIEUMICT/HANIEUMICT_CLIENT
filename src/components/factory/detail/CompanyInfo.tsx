import CompanyIntroCard from '@/components/factory/detail/company-info/CompanyIntroCard'
import Equipment from '@/components/factory/detail/company-info/EquipmentCard'
import Portfolio from '@/components/factory/detail/company-info/PortfolioCard'
import { CompanyDetailInfoType } from '@/type/company'

interface CompanyInfoProps {
  companyDetailData: CompanyDetailInfoType | undefined
}

export default function CompanyInfo({ companyDetailData }: CompanyInfoProps) {
  return (
    <div className="flex flex-col gap-y-[40px]">
      <CompanyIntroCard companyInfoData={companyDetailData?.company} companyDetailData={companyDetailData?.detail} />
      <Equipment />
      <Portfolio />
    </div>
  )
}
