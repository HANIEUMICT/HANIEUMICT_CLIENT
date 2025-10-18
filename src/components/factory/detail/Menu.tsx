'use client'

import { useModalStore } from '@/store/modalStore'
import Button1 from '@/components/common/Button1'
import { usePathname, useRouter } from 'next/navigation'

type MenuType = 'info' | 'review'

export default function Menu({ menuType }: { menuType: MenuType }) {
  const router = useRouter()
  const pathname = usePathname()

  const handleMenuClick = (menu: MenuType) => {
    // URL 업데이트 → 서버 컴포넌트 재렌더링
    router.push(`${pathname}?menu=${encodeURIComponent(menu)}`)
  }

  const menuList: { kor: string; eng: MenuType }[] = [
    { kor: '공장 정보', eng: 'info' },
    { kor: '리뷰', eng: 'review' },
  ]

  const setModalState = useModalStore((state) => state.setState)
  return (
    <div className="flex w-full items-center justify-between">
      <div className="gap-x-3xs flex">
        {menuList.map((menu) => {
          return (
            <button
              key={menu.eng}
              onClick={() => handleMenuClick(menu.eng)}
              className={`${menuType === menu.eng ? 'border-conic-red-30 text-conic-red-30 border-b-[2px]' : 'text-gray-30'} gap-x-4xs h3 px-3xs flex w-[97px] items-center justify-center py-1`}
            >
              {menu.kor}
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
