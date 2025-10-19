import Image from 'next/image'
import { StarIcon } from '@/assets/svgComponents'

export default function Card() {
  return (
    <div className="w-[290px] rounded-[16px] bg-white">
      <div className="relative h-[120px] w-[290px]">
        <Image src="company-graphic.svg" alt="카드사진" fill className="rounded-t-[16px] object-cover"></Image>
      </div>
      <div className="p-2xs gap-y-4xs flex flex-col">
        <div className="py-5xs border-gray-20 button-sm w-fit rounded-full border px-2 text-gray-50">카테고리</div>
        <p className="h3">완제품명</p>
        <p className="body1">설명~~~~~~~~~~~~~~~~~~~~~~</p>
        <div className="gap-y-5xs flex flex-col">
          <div className="flex items-center justify-between">
            <p className="body2 text-gray-40">장비 보유 수</p>
            <p className="button-sm text-gray-50">3대</p>
          </div>
          <div className="flex items-center justify-between">
            <p className="body2 text-gray-40">리뷰</p>
            <div className="flex items-center">
              <StarIcon width={16} height={16} />
              <p className="button-sm text-gray-50">4.5</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
