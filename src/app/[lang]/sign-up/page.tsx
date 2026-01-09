import SelectRole from '@/components/sign-up/SelectRole'
import { I18nParams } from '@/lib/i18n.types'
import { useTranslationServer } from '@/lib/i18n'
import Label from '@/components/common/Label'
import SelectRoleBottomButtons from '@/components/sign-up/SelectRoleBottomButtons'

interface SignUpPageProps {
  params: Promise<I18nParams>
}

export const dynamic = 'force-dynamic'

const SignUpPage = async ({ params }: SignUpPageProps) => {
  const { lang } = await params
  const { t } = await useTranslationServer(lang, 'common')

  return (
    <main className="bg-gray-10 flex min-h-screen flex-col items-center justify-center">
      <Label label={'회원가입 유형'} type={'h2'} />
      <SelectRole />
      <SelectRoleBottomButtons />
    </main>
  )
}
export default SignUpPage
