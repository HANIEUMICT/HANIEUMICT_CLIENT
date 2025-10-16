import MyPageBasicInfo from '@/components/mypage/company/user-info/MyPageBasicInfo'
import MyPageBusinessInfo from '@/components/mypage/company/user-info/MyPageBusinessInfo'
import MyPageBusinessDetailInfo from '@/components/mypage/company/user-info/MyPageBusinessDetailInfo'
import UserInfoMenu from '@/components/mypage/company/user-info/UserInfoMenu'
import { getMemberInfo } from '@/lib/api/server/user'
import { getCompany, getCompanyDetail } from '@/lib/api/server/company'
import { getCookieUserData } from '@/utils/server/common'

type MenuType = 'basic-info' | 'company-info' | 'company-detail-info'
type SearchParams = Promise<{ [key: string]: string | string[] | undefined }>

export default async function CompanyMyPage({ searchParams }: { searchParams: SearchParams }) {
  //로그인 사용자 정보 불러오기
  const userData = await getCookieUserData()

  const params = await searchParams
  const menu = (params.menu as MenuType) || 'basic-info' // 기본값

  return (
    <div className="mx-auto mt-[40px] flex gap-x-[40px]">
      <section className="gap-y-2xs flex w-[1220px] flex-col">
        <h1 className="h2">내 정보</h1>

        <UserInfoMenu selectedMenu={menu} />
        {menu === 'basic-info' ? <BasicInfoSection /> : null}
        {menu === 'company-info' ? <CompanyInfoSection companyId={userData?.companyId} /> : null}
        {menu === 'company-detail-info' ? <CompanyDetailInfoSection companyId={userData?.companyId} /> : null}
      </section>
    </div>
  )
}

async function BasicInfoSection() {
  const userInfo = await getMemberInfo()
  return <MyPageBasicInfo userInfo={userInfo.data} />
}

async function CompanyInfoSection({ companyId }: { companyId?: number | undefined }) {
  if (!companyId) return null
  const companyInfo = await getCompany(companyId)
  return <MyPageBusinessInfo companyInfo={companyInfo.data} />
}

async function CompanyDetailInfoSection({ companyId }: { companyId?: number | undefined }) {
  if (!companyId) return null
  const companyDetailInfo = await getCompanyDetail(companyId)
  return <MyPageBusinessDetailInfo companyDetailInfo={companyDetailInfo.data} />
}
