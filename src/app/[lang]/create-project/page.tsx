import { I18nParams } from '@/lib/i18n.types'
import { useTranslationServer } from '@/lib/i18n'
import CreateProjectClientPage from '@/components/create-project/CreateProjectClientPage'

interface CreateProjectPageProps {
  params: Promise<I18nParams>
}

export const dynamic = 'force-dynamic'

export default async function CreateProjectPage({ params }: CreateProjectPageProps) {
  const { lang } = await params
  const { t } = await useTranslationServer(lang, 'common')

  return <CreateProjectClientPage />
}
