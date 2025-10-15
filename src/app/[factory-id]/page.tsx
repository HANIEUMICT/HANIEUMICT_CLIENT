'use client'

import Header from '@/components/common/Header'
import SummaryCompanyCard from '@/components/factory/detail/SummaryCompanyCard'
import CompanyInfo from '@/components/factory/detail/CompanyInfo'
import { Dispatch, SetStateAction, useEffect, useState } from 'react'
import Button1 from '@/components/common/Button1'
import Review from '@/components/factory/detail/Review'
import CompanyDetailCardModal from '@/components/modal/CompanyDetailCardModal'
import { useModalStore } from '@/store/modalStore'
import { getCompanyDetail } from '@/lib/company'
import { CompanyDetailInfoType } from '@/type/company'
import { usePathname } from 'next/navigation'

export default function FactoryDetailPage() {
  const pathName = usePathname()
  const [menuType, setMenuType] = useState<'공장 정보' | '리뷰'>('공장 정보')
  const [isCompanyDetailCardModalOpen, setIsCompanyDetailCardModalOpen] = useState(false)
  const [companyDetailData, setCompanyDetailData] = useState<CompanyDetailInfoType | undefined>()

  useEffect(() => {
    getCompanyDetail(6).then((response) => {
      if (response.result === 'SUCCESS') {
        setCompanyDetailData(response.data)
        console.log('기업 상세 정보 조회', response.data)
      }
    })
  }, [])

  return (
    <main className="flex flex-col items-center justify-center">
      {isCompanyDetailCardModalOpen && (
        <CompanyDetailCardModal setIsCompanyDetailCardModalOpen={setIsCompanyDetailCardModalOpen} />
      )}
      <Header headerType={'DEFAULT'} />
      <div className="mt-[123px] flex w-[1218px] flex-col items-center justify-center gap-y-[40px]">
        <SummaryCompanyCard companyDetailData={companyDetailData} />
        <Menu setMenuType={setMenuType} menuType={menuType} />
        {menuType === '공장 정보' ? <CompanyInfo companyDetailData={companyDetailData} /> : null}
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
  const setModalState = useModalStore((state) => state.setState)
  return (
    <div className="flex w-full items-center justify-between">
      <div className="gap-x-3xs flex">
        {menuList.map((menu) => {
          return (
            <button
              key={menu}
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
        <Button1
          onClick={() => {
            setModalState({ isServicePreparingModalOpen: true })
          }}
          styleType={'outline'}
          styleStatus={'default'}
          styleSize={'md'}
        >
          CONIC AI 평가 상세 보기
        </Button1>
        <Button1 onClick={() => {}} styleType={'primary'} styleStatus={'default'} styleSize={'md'}>
          견적서 신청하기
        </Button1>
      </div>
    </div>
  )
}
