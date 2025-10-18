import RegisterFactoryClient from '@/components/register-factory/RegisterFactoryClient'
import { I18nParams } from '@/lib/i18n.types'
import { useTranslationServer } from '@/lib/i18n'
import { getCookieUserData } from '@/utils/server/common'

type StepType = '1' | '2' | '3'

type SearchParams = Promise<{ [key: string]: string | string[] | undefined }>

interface RegisterFactoryProps {
  params: Promise<I18nParams>
  searchParams: SearchParams
}

export const dynamic = 'force-dynamic'

export default async function RegisterFactory({ searchParams, params }: RegisterFactoryProps) {
  const { lang } = await params
  const { t } = await useTranslationServer(lang, 'common')
  // 로그인 사용자 정보 불러오기

  const userData = await getCookieUserData()
  // searchParams 처리

  const resolvedSearchParams = await searchParams
  const step = (resolvedSearchParams.step as StepType) || '1' // 기본값
  return (
    <main className="flex flex-col items-center justify-center">
      <RegisterFactoryClient step={step} />
    </main>
  )
}
