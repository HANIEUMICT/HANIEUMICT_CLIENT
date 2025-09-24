import Image from 'next/image'
import { FavoriteIcon } from '@/assets/svgComponents'

interface FactoryCardProps {
  imageUrl: string
  name: string
  category: string
  time: string
  deal: string
  people: string
  responseTime: string
  likeCount: number
}

export default function FactoryCard({
  imageUrl,
  name,
  category,
  time,
  deal,
  people,
  responseTime,
  likeCount,
}: FactoryCardProps) {
  return (
    <div className="border-gray-20 h-[318px] w-[290px] rounded-[16px] border">
      <section className="relative h-[120px] w-[290px] rounded-[16px]">
        <Image src={imageUrl} alt="사진" fill className="rounded-t-[16px] object-cover"></Image>
        {/* 아이콘, 좋아요 갯수 */}
        <div className="gap-5xs absolute top-[10px] right-[15px] flex">
          <FavoriteIcon width={16} height={14}></FavoriteIcon>
          <p className="button-sm text-white">{likeCount}</p>
        </div>
      </section>

      <div className="gap-y-4xs p-2xs flex h-[198px] w-[290px] flex-col rounded-b-[16px] bg-white">
        {/* 카테고리 */}
        <div className="border-gray-20 button-sm flex h-[24px] w-fit items-center rounded-full border px-[8px] text-gray-50">
          {category}
        </div>
        {/* 기업명 */}
        <div className="h3">{name}</div>
        {/* 상세정보 */}
        <div className="flex flex-col gap-y-[4px]">
          <div className="flex items-center justify-between">
            <p className="body2 text-gray-40">제작 평균 소요시간</p>
            <p className="button-sm text-gray-50">{time}</p>
          </div>
          <div className="flex items-center justify-between">
            <p className="body2 text-gray-40">거래 건수</p>
            <p className="button-sm text-gray-50">{deal}</p>
          </div>
          <div className="flex items-center justify-between">
            <p className="body2 text-gray-40">재거래 고객</p>
            <p className="button-sm text-gray-50">{people}</p>
          </div>
          <div className="flex items-center justify-between">
            <p className="body2 text-gray-40">평균 응답 시간</p>
            <p className="button-sm text-gray-50">{responseTime}</p>
          </div>
        </div>
      </div>
    </div>
  )
}
