'use client'

import BidderList from '@/components/project/BidderList'
import Header from '@/components/common/Header'

export default function ProjectDetailPage() {
  return (
    <main>
      <Header headerType={'DEFAULT'} />
      <div className="h-[80px]" />
      <section></section>
      <BidderList />
    </main>
  )
}
