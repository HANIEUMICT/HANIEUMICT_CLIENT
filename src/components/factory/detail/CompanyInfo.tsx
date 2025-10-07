import CompanyIntroCard from '@/components/factory/detail/company-info/CompanyIntroCard'
import EquipmentCard from '@/components/factory/detail/company-info/EquipmentCard'
import PortfolioCard from '@/components/factory/detail/company-info/PortfolioCard'

export default function CompanyInfo() {
  return (
    <div className="flex flex-col gap-y-[40px]">
      <CompanyIntroCard />
      <EquipmentCard />
      <PortfolioCard />
    </div>
  )
}
