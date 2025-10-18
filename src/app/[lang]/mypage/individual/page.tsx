import { I18nParams } from '@/lib/i18n.types'
import { useTranslationServer } from '@/lib/i18n'
import IndividualMyBasicInfoClientPage from '@/components/mypage/individual/IndividualMyBasicInfoClientPage'

interface BasicInfoPageProps {
  params: Promise<I18nParams>
}

export const dynamic = 'force-dynamic'

export default async function BasicInfoPage({ params }: BasicInfoPageProps) {
  const { lang } = await params
  const { t } = await useTranslationServer(lang, 'common')

  return <IndividualMyBasicInfoClientPage />
}
