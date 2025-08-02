import Image from 'next/image'
import { FavoriteIcon } from '@/assets/svgComponents'

export default function EquipmentCard() {
  return (
  <div className="border border-gray-20 w-[290px] h-[240px] rounded-[16px] border">
    <section className="relative h-[120px] w-[290px] rounded-[16px]">
        <Image src={'/test.png'} alt="사진" fill className="object-cover rounded-t-[16px]"></Image>
        {/* 아이콘, 좋아요 갯수 */}
        <div className='flex gap-5xs absolute top-[10px] right-[15px]'>
            <FavoriteIcon width={16} height={14}></FavoriteIcon>
            <p className='button-sm text-white'>230</p>
        </div>
    </section>

    <div className="flex flex-col gap-y-4xs h-[198px] w-[290px] p-2xs bg-white rounded-b-[16px]">
        {/* 장비이름 */}
        <div className="h3">
            장비이름
        </div>
        {/* 설명 */}
        <div className='body1'>
            설명~~~~~~~
        </div>
        <div className='flex items-center justify-between'>
            <p className='body2 text-gray-40'>장비 보유수</p>
            <p className='button-sm text-gray-50'>3대</p>
        </div>
    </div>
  </div>
  )
}