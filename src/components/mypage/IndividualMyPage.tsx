import MyBasicInfoPage from '@/components/mypage/individual/MyBasicInfoPage'
import MyDeliveryInfoPage from '@/components/mypage/individual/MyDeliveryInfoPage'
import MyProjectPage from '@/components/mypage/individual/MyProjectPage'
import MyOrderInfoPage from '@/components/mypage/individual/MyOrderInfoPage'
import { IndividualSideBarType } from '@/type/mypage'
import CopyrightAgreementModal from '@/components/modal/CopyrightAgreementModal'
import { useState } from 'react'

interface IndividualMyPageProps {
  sideBarType: IndividualSideBarType
}

export default function IndividualMyPage({ sideBarType }: IndividualMyPageProps) {
  return (
    <div className="flex items-center justify-center pl-[340px]">
      {sideBarType === '내 정보' ? <MyBasicInfoPage /> : null}
      {sideBarType === '배송 정보' ? <MyDeliveryInfoPage /> : null}
      {sideBarType === '견적서' ? <MyProjectPage /> : null}
      {sideBarType === '주문 정보' ? <MyOrderInfoPage /> : null}
      {sideBarType === '관심 공급업체' ? <MyOrderInfoPage /> : null}
    </div>
  )
}
