import { Dispatch, SetStateAction } from 'react'
import { StarIcon } from '@/assets/svgComponents'

interface ReviewFilterProps {
  filterType: '전체' | '평점 높은순' | '평점 낮은순' | '최신순'
  setFilterType: Dispatch<SetStateAction<'전체' | '평점 높은순' | '평점 낮은순' | '최신순'>>
}
export default function ReviewFilter({ filterType, setFilterType }: ReviewFilterProps) {
  const filterMenuList: ('전체' | '평점 높은순' | '평점 낮은순' | '최신순')[] = [
    '전체',
    '평점 높은순',
    '평점 낮은순',
    '최신순',
  ]
  return (
    <div className="flex w-full items-center justify-between">
      <div className="gap-x-4xs flex items-end">
        <div className="gap-x-4xs flex items-center">
          <StarIcon width={32} height={32} className="mb-[2px]" />
          <p className="h1">4.5</p>
          <p className="h1 text-gray-40">/</p>
          <p className="h1 text-gray-40">5</p>
        </div>
        <p className="sub1 text-gray-40 py-[10px]">(475)</p>
      </div>
      <div className="bg-gray-20 p-5xs flex h-fit rounded-full">
        {filterMenuList.map((filterMenu) => {
          return (
            <button
              onClick={() => {
                setFilterType(filterMenu)
              }}
              className={`${filterType === filterMenu ? 'bg-white text-gray-50' : 'text-gray-40'} px-xs button-sm flex h-[36px] cursor-pointer items-center justify-start rounded-full`}
            >
              {filterMenu}
            </button>
          )
        })}
      </div>
    </div>
  )
}
