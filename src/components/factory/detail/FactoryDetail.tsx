'use client'
import Header from '@/components/common/Header'
import EquipmentCard from '@/components/factory/detail/EquipmentCard'
import FactorySummaryCard from '@/components/factory/detail/FactorySummaryCard'
import ProductCard from '@/components/factory/detail/ProductCard'
import FactoryIntroductionCard from '@/components/factory/detail/FactoryIntroductionCard'
import FactoryBottomBar from '@/components/factory/FactoryBottomBar'

import { FavoriteIcon } from '@/assets/svgComponents'

export default function FactoryDetailPage() {
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

      {/* 기업 소개글*/}
      <section className='flex flex-col gap-2xs'>
        <p className='h2'>기업명</p>
        <FactoryIntroductionCard></FactoryIntroductionCard>
      </section>

      {/* 보유장비 */}
      <section className='flex flex-col gap-[16px]'>
        <div className='h2'>보유장비</div>
        <div className='flex gap-[16px]'>
          <EquipmentCard></EquipmentCard>
          <EquipmentCard></EquipmentCard>
          <EquipmentCard></EquipmentCard>
          <EquipmentCard></EquipmentCard>
        </div>
        <div className='flex gap-[16px]'>
          <EquipmentCard></EquipmentCard>
          <EquipmentCard></EquipmentCard>
          <EquipmentCard></EquipmentCard>
          <EquipmentCard></EquipmentCard>
        </div>
      </section>
      {/* 완제품 */}
      <section className='flex flex-col gap-[16px]'>
        <div className='h2'>완제품</div>
        <div className='flex gap-[16px]'>
          <ProductCard></ProductCard>
          <ProductCard></ProductCard>
          <ProductCard></ProductCard>
          <ProductCard></ProductCard>
        </div>
        <div className='flex gap-[16px]'>
          <ProductCard></ProductCard>
          <ProductCard></ProductCard>
          <ProductCard></ProductCard>
          <ProductCard></ProductCard>
        </div>
      </section>

      <FactoryBottomBar></FactoryBottomBar>


    </div>
    
  </main>
}