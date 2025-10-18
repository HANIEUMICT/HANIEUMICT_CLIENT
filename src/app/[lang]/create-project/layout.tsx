import Header from '@/components/common/Header'
import { ReactNode } from 'react'
import { I18nParams } from '@/lib/i18n.types'

interface CreateProjectLayoutProps {
  children: ReactNode
  params: Promise<I18nParams>
}

export async function generateStaticParams() {
  return [{ lang: 'ko' }, { lang: 'en' }]
}

export default async function CreateProjectLayout({ children, params }: CreateProjectLayoutProps) {
  const { lang } = await params
  return (
    <html lang={lang}>
      <body>
        <Header headerType={'DEFAULT'} params={params} />
        <div className="h-[180px]" />
        {children}
      </body>
    </html>
  )
}
