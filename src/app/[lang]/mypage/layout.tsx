import React, { ReactNode } from 'react'
import type { Metadata } from 'next'
import Header from '@/components/common/Header'
import { I18nParams } from '@/lib/i18n.types'

export const metadata: Metadata = {
  title: 'conic',
  description: '중국 공장과 소상공인을 연결해주는 중개 플랫폼, conic',
}

interface RecruitLayoutProps {
  children: ReactNode
  params: Promise<I18nParams>
}

export async function generateStaticParams() {
  return [{ lang: 'ko' }, { lang: 'en' }]
}

export default async function RecruitLayout({ children, params }: RecruitLayoutProps) {
  const { lang } = await params

  return (
    <>
      <Header headerType={'DEFAULT'} params={params} />
      {children}
    </>
  )
}
