'use client'

import Header from '@/components/common/Header'
import SideBar from '@/components/mypage/SideBar'
import { useEffect, useState } from 'react'
import IndividualMyPage from '@/components/mypage/IndividualMyPage'
import { IndividualSideBarType } from '@/type/mypage'
import CompanyMyPage from '@/components/mypage/CompanyMyPage'
import { getUserData } from '@/utils/common'
import AddAddressInfoModal from '@/components/modal/AddAddressInfoModal'
import { useModalStore } from '@/store/modalStore'

export default function MyPage() {
  const [individualSideBarType, setIndividualSideBarType] = useState<IndividualSideBarType>('내 정보')
  const [memberRole, setMemberRole] = useState<'INDIVIDUAL' | 'OWNER' | undefined>()
  const isAddAddressModalOpen = useModalStore((state) => state.isAddAddressModalOpen)
  useEffect(() => {
    setMemberRole(getUserData()?.memberRole)
  }, [])

  return (
    <main>
      {isAddAddressModalOpen && <AddAddressInfoModal />}
      <Header headerType={'DEFAULT'} />
      <div className="h-[80px]" />
      <SideBar sideBarType={individualSideBarType} setSideBarType={setIndividualSideBarType} />
      {memberRole === 'INDIVIDUAL' ? <IndividualMyPage sideBarType={individualSideBarType} /> : <CompanyMyPage />}
    </main>
  )
}
