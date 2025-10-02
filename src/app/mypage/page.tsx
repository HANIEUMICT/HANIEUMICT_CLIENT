'use client'

import Header from '@/components/common/Header'
import SideBar from '@/components/mypage/SideBar'
import { useEffect, useState } from 'react'
import IndividualMyPage from '@/components/mypage/IndividualMyPage'
import { IndividualSideBarType } from '@/type/mypage'
import CompanyMyPage from '@/components/mypage/CompanyMyPage'

interface UserData {
  memberId: number
  memberName: string
  memberRole: 'INDIVIDUAL' | 'OWNER'
}

export default function MyPage() {
  const [individualSideBarType, setIndividualSideBarType] = useState<IndividualSideBarType>('내 정보')
  const [memberRole, setMemberRole] = useState<'INDIVIDUAL' | 'OWNER' | undefined>()

  const getUserData = (): UserData | null => {
    try {
      const userDataString = localStorage.getItem('userData')
      if (!userDataString) return null

      const userData: UserData = JSON.parse(userDataString)
      return userData
    } catch (error) {
      console.error('userData 가져오기 실패:', error)
      return null
    }
  }

  useEffect(() => {
    setMemberRole(getUserData()?.memberRole)
  }, [])

  return (
    <main>
      <Header headerType={'DEFAULT'} />
      <div className="h-[80px]" />
      <SideBar sideBarType={individualSideBarType} setSideBarType={setIndividualSideBarType} />
      {memberRole === 'INDIVIDUAL' ? <IndividualMyPage sideBarType={individualSideBarType} /> : <CompanyMyPage />}
    </main>
  )
}
