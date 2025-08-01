import { SearchIcon } from "@/assets/svgComponents"

export default function EstimateSearch() {
  return (
    <div className='flex items-center border border-gray-20 w-[1218px] h-[52px] rounded-[16px] gap-[8px] px-[16px] py-[12px]'>
        <SearchIcon width={24} height={24}></SearchIcon>
        <p className="text-gray-40">‘공급업체' 또는 ‘카데고리' 검색어를 입력해보세요.</p>
    </div>
  )
}
