import Header from '@/components/common/Header'
import { ReactNode } from 'react'
import { I18nParams } from '@/lib/i18n.types'

interface SignUpLayoutProps {
  children: ReactNode
  params: Promise<I18nParams>
}

export async function generateStaticParams() {
  return [{ lang: 'ko' }, { lang: 'en' }]
}

export default async function SignUpLayout({ children, params }: SignUpLayoutProps) {
  const { lang } = await params
  return (
    <>
      <Header params={params} headerType={'SIGNUP'} />
      {children}
    </>
  )
}
