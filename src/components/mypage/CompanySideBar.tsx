'use client'
import { ReactNode } from 'react'
import {
  LogoutIcon,
  SelectedMyprofileIcon,
  SelectedOrderInformationIcon,
  SelectedProposalIcon,
  UnselectedMyprofileIcon,
  UnselectedOrderInformationIcon,
  UnselectedProposalIcon,
} from '@/assets/svgComponents'
import { IndividualSideBarType } from '@/type/mypage'
import Cookies from 'js-cookie'
import { usePathname } from 'next/navigation'
import Link from 'next/link'

export default function CompanySideBar() {
  const pathname = usePathname()
  const menuList: {
    selectedIcon: ReactNode
    unselectedIcon: ReactNode
    title: IndividualSideBarType
    router: string
  }[] = [
    {
      selectedIcon: <SelectedMyprofileIcon width={19} height={19} />,
      unselectedIcon: <UnselectedMyprofileIcon width={19} height={19} />,
      title: '내 정보',
      router: '/mypage/company',
    },
    {
      selectedIcon: <SelectedProposalIcon width={20} height={24} />,
      unselectedIcon: <UnselectedProposalIcon width={20} height={24} />,
      title: '견적서',
      router: '/mypage/company/proposal',
    },
    {
      selectedIcon: <SelectedOrderInformationIcon width={28} height={25} />,
      unselectedIcon: <UnselectedOrderInformationIcon width={28} height={25} />,
      title: '주문 정보',
      router: '/mypage/company/order',
    },
  ]
  return (
    <div className="fixed left-0 h-full w-[340px] bg-white p-8">
      <div className="relative h-full">
        <h3 className="h3">마이페이지</h3>
        <section className="mt-[20px] flex flex-col gap-y-[13px]">
          {menuList.map((menu) => {
            return (
              <Link
                key={menu.title}
                href={menu.router}
                className="gap-x-4xs px-4xs py-3xs flex cursor-pointer items-center"
              >
                <div className="flex h-[40px] w-[40px] items-center justify-center">
                  {pathname === menu.router ? menu.selectedIcon : menu.unselectedIcon}
                </div>
                <p className={`${pathname === menu.router ? '' : 'text-gray-40'} h3`}>{menu.title}</p>
              </Link>
            )
          })}
        </section>
        <Link
          href={'/login'}
          onClick={() => {
            Cookies.remove('accessToken')
            Cookies.remove('refreshToken')
            localStorage.removeItem('userData')
          }}
          className="button-lg text-gray-40 absolute bottom-20 flex w-full items-center justify-center gap-x-2"
        >
          <div className="flex h-[24px] w-[24px] items-center justify-center">
            <LogoutIcon width={18} height={19} />
          </div>
          로그아웃
        </Link>
      </div>
    </div>
  )
}
