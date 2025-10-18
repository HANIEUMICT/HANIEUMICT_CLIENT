import { I18nParams } from '@/lib/i18n.types'
import { useTranslationServer } from '@/lib/i18n'
import IndividualSignUpClientPage from '@/components/sign-up/individual/IndividualSignUpClientPage'

interface SignUpIndividualPageProps {
  params: Promise<I18nParams>
}

export const dynamic = 'force-dynamic'

export default async function SignUpIndividualPage({ params }: SignUpIndividualPageProps) {
  const { lang } = await params
  const { t } = await useTranslationServer(lang, 'common')

  return <IndividualSignUpClientPage />
}
