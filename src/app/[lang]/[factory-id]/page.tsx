import SummaryCompanyCard from '@/components/factory/detail/SummaryCompanyCard'
import CompanyInfo from '@/components/factory/detail/CompanyInfo'
import Review from '@/components/factory/detail/Review'
import { getCompanyDetail } from '@/lib/api/server/company'
import Menu from '@/components/factory/detail/Menu'

type MenuType = 'info' | 'review'

type SearchParams = Promise<{ [key: string]: string | string[] | undefined }>
export const dynamic = 'force-dynamic'

export default async function FactoryDetailPage({ searchParams }: { searchParams: SearchParams }) {
  const params = await searchParams
  // const projectId = parseInt(params.id, 10)

  console.log('params', params)
  const companyDetailData = await getCompanyDetail(6)
  const menu = (params.menu as MenuType) || 'info' // 기본값

  return (
    <main className="flex flex-col items-center justify-center">
      <div className="flex w-[1218px] flex-col items-center justify-center gap-y-[40px]">
        <SummaryCompanyCard companyDetailData={companyDetailData.data} />
        <Menu menuType={menu} />
        {menu === 'info' ? <CompanyInfo companyDetailData={companyDetailData.data} /> : null}
        {menu === 'review' ? <Review /> : null}
      </div>
    </main>
  )
}
