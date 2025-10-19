import { I18nParams } from '@/lib/i18n.types'
import { useTranslationServer } from '@/lib/i18n'
import { getCookieUserData } from '@/utils/server/common'
import RecommendedTag from '@/components/company/RecommendedTag'
import { getCompanyProfileRecommend } from '@/lib/api/server/company'
import FactoryCard from '@/components/company/FactoryCard'
export const dynamic = 'force-dynamic'

interface HomePageProps {
  params: Promise<I18nParams>
}

export default async function Home({ params }: HomePageProps) {
  const { lang } = await params
  const { t } = await useTranslationServer(lang, ['common'])
  const recommendCompanyList = await getCompanyProfileRecommend()

  const userData = await getCookieUserData()

  if (!recommendCompanyList.data) {
    return t('error.company.upload')
  }

  return (
    <main className="flex flex-col items-center justify-center">
      <div className="flex w-[1218px] flex-col items-center gap-[40px]">
        <section className="flex flex-col gap-[16px]">
          <div className="flex items-end justify-between">
            <div className="h2 flex w-full flex-col gap-[8px]">
              <h2>
                ‘{userData?.memberName}’{t('company.h1')}
              </h2>
              <RecommendedTag />
            </div>
          </div>
          <section className="gap-xs grid grid-cols-4">
            {recommendCompanyList.data.map((recommendCompany) => {
              return (
                <FactoryCard
                  key={recommendCompany.companyId}
                  companyId={recommendCompany.companyId}
                  name={recommendCompany.name}
                  imageUrl={recommendCompany.logoUrl}
                  totalOrderCount={recommendCompany.totalOrderCount}
                  repeatOrderCount={recommendCompany.repeatOrderCount}
                  avgProductionLeadHours={recommendCompany.avgProductionLeadHours}
                  avgResponseMinutes={recommendCompany.avgResponseMinutes}
                  likeCount={3}
                />
              )
            })}
          </section>
        </section>
      </div>
    </main>
  )
}
