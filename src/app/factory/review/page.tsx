'use client'
import Header from '@/components/common/Header'
import FactorySummaryCard from '@/components/factory/detail/FactorySummaryCard'
import FactoryReviewCard from '@/components/factory/review/FactoryReviewCard'
import FactoryReviewCard2 from '@/components/factory/review/FactoryReviewCard2'
import ReviewHighlightCard from '@/components/factory/review/ReviewHighlightCard'
import ReviewPagination from '@/components/factory/review/ReviewPagination'

import { FavoriteIcon } from '@/assets/svgComponents'
import { StarIcon } from '@/assets/svgComponents'

export default function FactoryReviewPage() {
  return <main>
    <Header></Header>
    <div className="h-[100px]"></div>
    <div className='flex flex-col items-center gap-[40px]'>
      {/*기업 요약 정보 */}
      <div>
        <FactorySummaryCard></FactorySummaryCard>
      </div>
      
       {/* 탭 -> 이것도 추후 추가예정!*/}
      <section>

      </section>

      {/* 리뷰*/}
      <section className='flex flex-col gap-2xs'>
        
        <div className='w-[1218px] flex justify-between items-center'>
          <p className='h2'>리뷰 (475)</p>
          <div className='flex items-center button-lg border border-gray-20 w-[190px] h-[48px] px-2xs py-3xs text-gray-50 rounded-[12px]'>
            CONIC AI 평가 상세보기
          </div>
        </div>
        
        <ReviewHighlightCard></ReviewHighlightCard>

        <section className='w-[1218px] h-[60px] flex justify-between items-center'>
          <div className='flex items-center w-[216px] h-[60px] gap-4xs'>
            <div className='w-[40px] h-[40px] flex items-center'>
              <StarIcon width={32} height={32}></StarIcon>
            </div>
            <p className='h1'>4.5</p>
            <p className='h1 text-gray-40'>/</p>
            <p className='h1 text-gray-40'>5</p>
            <div className='flex items-end w-[45px] h-[40px]'>
              <p className='sub2 text-gray-40'>(475)</p>
            </div>
          </div>
          
          <div className='w-[354px] h-[44px] rounded-full bg-gray-20 p-5xs flex'>
            <div className='w-[66px] h-[36px] px-xs flex items-center rounded-full bg-white'>
              <p className='button-sm text-gray-50'>전체</p>
            </div>

            <div className='w-[109px] h-[36px] px-xs flex items-center rounded-full'>
              <p className='button-sm text-gray-40'>평점 높은순</p>
            </div>

            <div className='w-[109px] h-[36px] px-xs flex items-center rounded-full'>
              <p className='button-sm text-gray-40'>평점 낮은순</p>
            </div>

            <div className='w-[80px] h-[36px] px-xs flex items-center rounded-full'>
              <p className='button-sm text-gray-40'>최신순</p>
            </div>
          </div>
        </section>

        <div className='flex flex-col gap-[16px]'>
          <FactoryReviewCard2></FactoryReviewCard2>
          <FactoryReviewCard2></FactoryReviewCard2>
          <FactoryReviewCard></FactoryReviewCard>
          <FactoryReviewCard></FactoryReviewCard>
          <FactoryReviewCard></FactoryReviewCard>
          <FactoryReviewCard></FactoryReviewCard>
          <FactoryReviewCard></FactoryReviewCard>

          <ReviewPagination></ReviewPagination>
        </div>
      </section>


      <section className='flex justify-end w-[1218px] gap-[12px]'>
        <div className='border border-gray-20 flex items-center gap-5xs p-xs w-[82px] h-[54px] rounded-[12px]'>
          <FavoriteIcon width={20} height={18}></FavoriteIcon>
          <p className='button_lg text-gray-50'>찜</p>
        </div>

        <div className='flex items-center justify-center border border-gray-20  p-2xs w-[160px] h-[54px] rounded-[12px]'>
          <p className='button_lg text-gray-50'>1:1 채팅</p>
        </div>

        <div className='flex items-center justify-center border border-gray-20 p-2xs w-[598px] h-[54px] rounded-[12px] bg-[#FF363C]'>
          <p className='button_lg text-white'>견적서 신청하기</p>
        </div>
      </section>


    </div>
    
  </main>
}