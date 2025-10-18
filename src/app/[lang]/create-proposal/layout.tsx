import Header from '@/components/common/Header'
import { ReactNode } from 'react'
import { I18nParams } from '@/lib/i18n.types'

interface CreateProposalLayoutProps {
  children: ReactNode
  params: Promise<I18nParams>
}

export async function generateStaticParams() {
  return [{ lang: 'ko' }, { lang: 'en' }]
}

export default async function CreateProposalLayout({ children, params }: CreateProposalLayoutProps) {
  const { lang } = await params
  return (
    <html lang={lang}>
      <body>
        <Header headerType={'DEFAULT'} params={params} />
        {children}
      </body>
    </html>
  )
}
