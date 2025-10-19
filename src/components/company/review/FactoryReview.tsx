'use client'
import Header from '@/components/common/Header'
import FactoryCard from '@/components/company/FactoryCard'
import PriorityTag from '@/components/company/PriorityTag'
import FactoryCategory from '@/components/company/FactoryCategory'
import FactoryArrowButton from '@/components/company/FactoryArrowButton'

export default function FactoryPage() {
  return (
    <main>
      <Header></Header>
      <div className="h-[100px]"></div>
      <div className="flex flex-col items-center gap-[40px]">
        <section className="flex flex-col gap-[16px]">
          <div className="flex items-end justify-between">
            <div className="h2 flex flex-col gap-[8px]">
              <h2>‘황유림’님의 추천 공급업체</h2>
              <PriorityTag></PriorityTag>
            </div>
            <FactoryArrowButton></FactoryArrowButton>
          </div>
          <div className="gap-x-xs flex items-center">
            <FactoryCard></FactoryCard>
            <FactoryCard></FactoryCard>
            <FactoryCard></FactoryCard>
            <FactoryCard></FactoryCard>
          </div>
        </section>

        <section className="flex flex-col gap-[16px]">
          <div className="h2 flex justify-between">
            <h2>거래가 많은 공급업체</h2>
            <FactoryArrowButton></FactoryArrowButton>
          </div>
          <div className="gap-x-xs flex items-center">
            <FactoryCard></FactoryCard>
            <FactoryCard></FactoryCard>
            <FactoryCard></FactoryCard>
            <FactoryCard></FactoryCard>
          </div>
        </section>

        <section className="flex flex-col gap-[16px]">
          <div className="h2 flex flex-col gap-[16px]">
            <h2>CONIC 공급업체</h2>
            <FactoryCategory></FactoryCategory>
          </div>
          <div className="gap-x-xs flex items-center">
            <FactoryCard></FactoryCard>
            <FactoryCard></FactoryCard>
            <FactoryCard></FactoryCard>
            <FactoryCard></FactoryCard>
          </div>
          <div className="gap-x-xs flex items-center">
            <FactoryCard></FactoryCard>
            <FactoryCard></FactoryCard>
            <FactoryCard></FactoryCard>
            <FactoryCard></FactoryCard>
          </div>
        </section>
      </div>
    </main>
  )
}
