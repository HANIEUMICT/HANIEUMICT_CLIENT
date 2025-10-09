import React, { ReactNode } from 'react'
import type { Metadata } from 'next'
import Header from '@/components/common/Header'

export const metadata: Metadata = {
  title: 'conic',
  description: '중국 공장과 소상공인을 연결해주는 중개 플랫폼, conic',
}

export default async function RecruitLayout({
  children,
}: Readonly<{
  children: ReactNode
}>) {
  return (
    <div className="">
      <Header headerType={'DEFAULT'} />
      <div className="h-[80px]" />
      <main className="">{children}</main>
    </div>
  )
}
