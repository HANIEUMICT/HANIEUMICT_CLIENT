import { I18nParams } from '@/lib/i18n.types'
import { useTranslationServer } from '@/lib/i18n'
import CompanyMemberSignUpClientPage from '@/components/sign-up/company/CompanyMemberSignUpClientPage'

interface RegisterMemberPageProps {
  params: Promise<I18nParams>
}

export const dynamic = 'force-dynamic'

export default async function RegisterMemberPage({ params }: RegisterMemberPageProps) {
  const { lang } = await params
  const { t } = await useTranslationServer(lang, 'common')

  return <CompanyMemberSignUpClientPage />
}
