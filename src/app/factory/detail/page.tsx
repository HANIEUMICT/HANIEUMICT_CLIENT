'use client'
import Header from '@/components/common/Header'
import EquipmentCard from '@/components/factory/detail/EquipmentCard'
import FactorySummaryCard from '@/components/factory/detail/FactorySummaryCard'
import ProductCard from '@/components/factory/detail/ProductCard'
import FactoryIntroductionCard from '@/components/factory/detail/FactoryIntroductionCard'
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