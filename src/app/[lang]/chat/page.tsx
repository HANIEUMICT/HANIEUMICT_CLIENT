import { I18nParams } from '@/lib/i18n.types'
import { useTranslationServer } from '@/lib/i18n'

interface ChatPageProps {
  params: Promise<I18nParams>
}
export const dynamic = 'force-dynamic'

export default async function Chat({ params }: ChatPageProps) {
  const { lang } = await params
  const { t } = await useTranslationServer(lang, 'common')
  return <main></main>
}
