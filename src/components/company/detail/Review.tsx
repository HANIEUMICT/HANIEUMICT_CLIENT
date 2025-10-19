'use client'

import SummaryReview from '@/components/company/detail/review/SummaryReview'
import ReviewFilter from '@/components/company/detail/review/ReviewFilter'
import ReviewItem from '@/components/company/detail/review/ReviewItem'
import { useState } from 'react'
import Pagination from '@/components/common/Pagination'

export default function Review() {
  const [filterType, setFilterType] = useState<'전체' | '평점 높은순' | '평점 낮은순' | '최신순'>('전체')
  return (
    <div className="gap-y-2xs flex w-full flex-col items-start">
      <h2 className="h2">리뷰(472)</h2>
      <SummaryReview />
      <ReviewFilter filterType={filterType} setFilterType={setFilterType} />
      <section className="flex w-full flex-col gap-y-4">
        <ReviewItem />
        <ReviewItem />
        <ReviewItem />
        <ReviewItem />
      </section>

      {/*<Pagination />*/}
    </div>
  )
}
