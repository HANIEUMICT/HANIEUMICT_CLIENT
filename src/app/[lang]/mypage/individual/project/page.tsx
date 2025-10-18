import { I18nParams } from '@/lib/i18n.types'
import { useTranslationServer } from '@/lib/i18n'
import { Suspense } from 'react'
import IndividualMyProjectClientPage from '@/components/mypage/individual/IndividualMyProjectClientPage'

type SearchParams = Promise<{ [key: string]: string | string[] | undefined }>

interface ProjectPageProps {
  params: Promise<I18nParams>
  searchParams: SearchParams
}

export const dynamic = 'force-dynamic'

export default async function IndividualMyProjectPage({ params, searchParams }: ProjectPageProps) {
  const { lang } = await params
  const { t } = await useTranslationServer(lang, 'common')
  const resolvedSearchParams = await searchParams

  return (
    <main>
      <Suspense fallback={<div>로딩 중...</div>}>
        <IndividualMyProjectClientPage searchParams={resolvedSearchParams} />
      </Suspense>
    </main>
  )
}
