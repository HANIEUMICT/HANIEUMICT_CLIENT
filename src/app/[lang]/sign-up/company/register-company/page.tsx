import { I18nParams } from '@/lib/i18n.types'
import { useTranslationServer } from '@/lib/i18n'
import RegisterCompanyClientPage from '@/components/sign-up/company/RegisterCompanyClientPage'

interface RegisterCompanyPageProps {
  params: Promise<I18nParams>
}

export const dynamic = 'force-dynamic'

export default async function RegisterCompanyPage({ params }: RegisterCompanyPageProps) {
  const { lang } = await params
  const { t } = await useTranslationServer(lang, 'common')

  return <RegisterCompanyClientPage />
}
