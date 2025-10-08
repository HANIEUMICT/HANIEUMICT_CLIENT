import CompanyIntroCard from '@/components/factory/detail/company-info/CompanyIntroCard'
import Equipment from '@/components/factory/detail/company-info/EquipmentCard'
import Portfolio from '@/components/factory/detail/company-info/PortfolioCard'

export default function CompanyInfo() {
  return (
    <div className="flex flex-col gap-y-[40px]">
      <CompanyIntroCard />
      <Equipment />
      <Portfolio />
    </div>
  )
}
