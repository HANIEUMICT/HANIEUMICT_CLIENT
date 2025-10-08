'use client'

import Header from '@/components/common/Header'
import SummaryCompanyCard from '@/components/factory/detail/SummaryCompanyCard'
import CompanyInfo from '@/components/factory/detail/CompanyInfo'
import { Dispatch, SetStateAction, useState } from 'react'
import Button1 from '@/components/common/Button1'
import Review from '@/components/factory/detail/Review'
import CompanyDetailCardModal from '@/components/modal/CompanyDetailCardModal'

export default function FactoryDetailPage() {
  const [menuType, setMenuType] = useState<'공장 정보' | '리뷰'>('공장 정보')
  const [isCompanyDetailCardModalOpen, setIsCompanyDetailCardModalOpen] = useState(false)

  return (
    <main className="flex flex-col items-center justify-center">
      {isCompanyDetailCardModalOpen && (
        <CompanyDetailCardModal setIsCompanyDetailCardModalOpen={setIsCompanyDetailCardModalOpen} />
      )}
      <Header headerType={'DEFAULT'} />
      <div className="mt-[123px] flex w-[1218px] flex-col items-center justify-center gap-y-[40px]">
        <SummaryCompanyCard />
        <Menu setMenuType={setMenuType} menuType={menuType} />
        {menuType === '공장 정보' ? <CompanyInfo /> : null}
        {menuType === '리뷰' ? <Review /> : null}
      </div>
    </main>
  )
}

function Menu({
  menuType,
  setMenuType,
}: {
  menuType: '공장 정보' | '리뷰'
  setMenuType: Dispatch<SetStateAction<'공장 정보' | '리뷰'>>
}) {
  const menuList: ('공장 정보' | '리뷰')[] = ['공장 정보', '리뷰']
  return (
    <div className="flex w-full items-center justify-between">
      <div className="gap-x-3xs flex">
        {menuList.map((menu) => {
          return (
            <button
              onClick={() => {
                setMenuType(menu)
              }}
              className={`${menuType === menu ? 'border-conic-red-30 text-conic-red-30 border-b-[2px]' : 'text-gray-30'} gap-x-4xs h3 px-3xs flex w-[97px] items-center justify-center py-1`}
            >
              {menu}
            </button>
          )
        })}
      </div>
      <div className="flex gap-x-3">
        <Button1 onClick={() => {}} styleType={'outline'} styleStatus={'default'} styleSize={'md'}>
          CONIC AI 평가 상세 보기
        </Button1>
        <Button1 onClick={() => {}} styleType={'primary'} styleStatus={'default'} styleSize={'md'}>
          견적서 신청하기
        </Button1>
      </div>
    </div>
  )
}
