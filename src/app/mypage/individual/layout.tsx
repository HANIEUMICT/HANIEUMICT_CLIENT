import React, { ReactNode } from 'react'
import type { Metadata } from 'next'
import IndividualSideBar from '@/components/mypage/IndividualSideBar'

export const metadata: Metadata = {
  title: 'conic',
  description: '중국 공장과 소상공인을 연결해주는 중개 플랫폼, conic',
}

export default async function IndividualLayout({
  children,
}: Readonly<{
  children: ReactNode
}>) {
  return (
    <div className="">
      <IndividualSideBar />
      <div className="flex">
        <div className="w-[425px]" />
        <main className="flex w-full items-center justify-center">{children}</main>
      </div>
    </div>
  )
}
