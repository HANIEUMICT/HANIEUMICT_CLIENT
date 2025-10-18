import { I18nParams } from '@/lib/i18n.types'
import { useTranslationServer } from '@/lib/i18n'
import LoginClientPage from '@/components/login/LoginClientPage'

interface LoginPageProps {
  params: Promise<I18nParams>
}

export const dynamic = 'force-dynamic'

export default async function LoginPage({ params }: LoginPageProps) {
  const { lang } = await params
  const { t } = await useTranslationServer(lang, 'common')

  return <LoginClientPage />
}
