import { I18nParams } from '@/lib/i18n.types'
import { useTranslationServer } from '@/lib/i18n'
import { Suspense } from 'react'
import SearchCompanyInfoClientPage from '@/components/sign-up/company/SearchCompanyInfoClientPage'

type SearchParams = Promise<{ [key: string]: string | string[] | undefined }>

interface SignUpCompanyPageProps {
  params: Promise<I18nParams>
  searchParams: SearchParams
}

export const dynamic = 'force-dynamic'

export default async function SignUpCompanyInfoPage({ params, searchParams }: SignUpCompanyPageProps) {
  const { lang } = await params
  const { t } = await useTranslationServer(lang, 'common')
  const resolvedSearchParams = await searchParams

  return (
    <main>
      <Suspense fallback={<div>로딩 중...</div>}>
        <SearchCompanyInfoClientPage lang={lang} searchParams={resolvedSearchParams} />
      </Suspense>
    </main>
  )
}
