import type { Metadata } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import '../globals.css'
import GlobalModals from '@/components/common/GlobalModals'
import { ToastProvider } from '@/provider/ToastProvider'
import Header from '@/components/common/Header'
import { I18nParams } from '@/lib/i18n.types'
import { ReactNode } from 'react'

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
})

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
})

export const metadata: Metadata = {
  title: 'conic',
  description: '중국 공장과 소상공인을 연결해주는 중개 플랫폼, conic',
}

interface RootLayoutProps {
  children: ReactNode
  params: Promise<I18nParams>
}

export async function generateStaticParams() {
  return [{ lang: 'ko' }, { lang: 'en' }]
}

export default async function RootLayout({ children, params }: RootLayoutProps) {
  const { lang } = await params

  return (
    <html lang={lang}>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <Header headerType="DEFAULT" params={params} />
        <div className="h-[100px]"></div>
        <ToastProvider>{children}</ToastProvider>
        <GlobalModals />
      </body>
    </html>
  )
}
