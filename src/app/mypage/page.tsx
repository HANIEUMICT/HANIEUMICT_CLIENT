'use client'

import Header from '@/components/common/Header'
import SideBar from '@/components/mypage/SideBar'
import { useState } from 'react'
import MyBasicInfoPage from '@/components/mypage/MyBasicInfoPage'
import MyProjectPage from '@/components/mypage/MyProjectPage'
import MyOrderInfoPage from '@/components/mypage/MyOrderInfoPage'
import MyDeliveryInfoPage from '@/components/mypage/MyDeliveryInfoPage'

export default function MyPage() {
  const [sideBarType, setSideBarType] = useState<'내 정보' | '배송 정보' | '견적서' | '주문정보' | '관심 공급업체'>(
    '내 정보'
  )
  return (
    <main>
      <Header headerType={'DEFAULT'} />
      <div className="h-[80px]" />
      <SideBar sideBarType={sideBarType} setSideBarType={setSideBarType} />
      <div className="flex items-center justify-center pl-[340px]">
        {sideBarType === '내 정보' ? <MyBasicInfoPage /> : null}
        {sideBarType === '배송 정보' ? <MyDeliveryInfoPage /> : null}
        {sideBarType === '견적서' ? <MyProjectPage /> : null}
        {sideBarType === '주문정보' ? <MyOrderInfoPage /> : null}
        {sideBarType === '관심 공급업체' ? <MyOrderInfoPage /> : null}
      </div>
    </main>
  )
}
