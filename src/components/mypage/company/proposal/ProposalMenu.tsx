'use client'

import { usePathname, useRouter } from 'next/navigation'

type MenuType = 'received' | 'write' | 'like'

interface ProposalMenuProps {
  selectedMenu: MenuType
}
export default function ProposalMenu({ selectedMenu }: ProposalMenuProps) {
  const router = useRouter()
  const pathname = usePathname()

  const handleMenuClick = (menu: MenuType) => {
    // URL 업데이트 → 서버 컴포넌트 재렌더링
    router.push(`${pathname}?menu=${encodeURIComponent(menu)}`)
  }

  const menuList: { kor: string; eng: MenuType }[] = [
    { kor: '받은 견적서', eng: 'received' },
    { kor: '작성한 견적서', eng: 'write' },
    { kor: '관심 견적서', eng: 'like' },
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
