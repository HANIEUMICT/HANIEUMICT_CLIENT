'use client'

import { usePathname, useRouter } from 'next/navigation'

type MenuType = 'basic-info' | 'company-info' | 'company-detail-info'

interface MenuProps {
  selectedMenu: MenuType
}

export default function UserInfoMenu({ selectedMenu }: MenuProps) {
  const router = useRouter()
  const pathname = usePathname()

  const handleMenuClick = (menu: MenuType) => {
    // URL 업데이트 → 서버 컴포넌트 재렌더링
    router.push(`${pathname}?menu=${encodeURIComponent(menu)}`)
  }

  const menuList: { kor: string; eng: MenuType }[] = [
    { kor: '기본 정보', eng: 'basic-info' },
    { kor: '기업 정보 수정', eng: 'company-info' },
    { kor: '공장 정보 수정', eng: 'company-detail-info' },
  ]

  return (
    <section className="flex gap-x-3">
      {menuList.map((menu) => {
        return (
          <button
            key={menu.eng}
            type={'button'}
            onClick={() => handleMenuClick(menu.eng)}
            className={`${menu.eng === selectedMenu ? 'text-conic-red-30 border-conic-red-30 border-b-[2px]' : 'text-gray-30'} h3 cursor-pointer px-3 py-1`}
          >
            {menu.kor}
          </button>
        )
      })}
    </section>
  )
}
