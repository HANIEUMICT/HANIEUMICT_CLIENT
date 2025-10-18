import { I18nParams } from '@/lib/i18n.types'
import { useTranslationServer } from '@/lib/i18n'
import { Suspense } from 'react'
import IndividualMyDeliveryInfoClientPage from '@/components/mypage/individual/IndividualMyDeliveryInfoClientPage'

type SearchParams = Promise<{ [key: string]: string | string[] | undefined }>

interface DeliveryPageProps {
  params: Promise<I18nParams>
  searchParams: SearchParams
}

export const dynamic = 'force-dynamic'

export default async function DeliveryPage({ params, searchParams }: DeliveryPageProps) {
  const { lang } = await params
  const { t } = await useTranslationServer(lang, 'common')
  const resolvedSearchParams = await searchParams

  return (
    <main>
      <Suspense fallback={<div>로딩 중...</div>}>
        <IndividualMyDeliveryInfoClientPage lang={lang} searchParams={resolvedSearchParams} />
      </Suspense>
    </main>
  )
}
