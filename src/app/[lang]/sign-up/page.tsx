import SelectRole from '@/components/sign-up/SelectRole'
import { I18nParams } from '@/lib/i18n.types'
import { useTranslationServer } from '@/lib/i18n'

interface SignUpPageProps {
  params: Promise<I18nParams>
}

export const dynamic = 'force-dynamic'

const SignUpPage = async ({ params }: SignUpPageProps) => {
  const { lang } = await params
  const { t } = await useTranslationServer(lang, 'common')

  return (
    <main>
      <SelectRole />
    </main>
  )
}
export default SignUpPage
