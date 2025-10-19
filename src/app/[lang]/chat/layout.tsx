import Header from '@/components/common/Header'
import { ReactNode } from 'react'
import { I18nParams } from '@/lib/i18n.types'

interface ChatLayoutProps {
  children: ReactNode
  params: Promise<I18nParams>
}

export async function generateStaticParams() {
  return [{ lang: 'ko' }, { lang: 'en' }]
}

export default async function ChatLayout({ children, params }: ChatLayoutProps) {
  const { lang } = await params
  return (
    <>
      <Header headerType={'DEFAULT'} params={params} />
      <div className="h-[123px]"></div>
      {children}
    </>
  )
}
