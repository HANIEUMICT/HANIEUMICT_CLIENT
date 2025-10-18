import Header from '@/components/common/Header'
import { ReactNode } from 'react'
import { I18nParams } from '@/lib/i18n.types'

interface ProjectLayoutProps {
  children: ReactNode
  params: Promise<I18nParams>
}

export async function generateStaticParams() {
  return [{ lang: 'ko' }, { lang: 'en' }]
}

export default async function ProjectLayout({ children, params }: ProjectLayoutProps) {
  const { lang } = await params

  return (
    <html lang={lang}>
      <body>
        <Header headerType={'DEFAULT'} params={params} />
        <div className="mt-[100px]" />
        {children}
      </body>
    </html>
  )
}
