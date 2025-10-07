import SummaryReview from '@/components/factory/detail/review/SummaryReview'
import ReviewFilter from '@/components/factory/detail/review/ReviewFilter'
import ReviewItem from '@/components/factory/detail/review/ReviewItem'
import { useState } from 'react'
import Pagination from '@/components/common/Pagination'

export default function Review() {
  const [filterType, setFilterType] = useState<'전체' | '평점 높은순' | '평점 낮은순' | '최신순'>('전체')
  return (
    <div className="gap-y-2xs flex w-full flex-col items-start">
      <h2 className="h2">리뷰(472)</h2>
      <SummaryReview />
      <ReviewFilter filterType={filterType} setFilterType={setFilterType} />
      <ReviewItem />
      {/*<Pagination />*/}
    </div>
  )
}
