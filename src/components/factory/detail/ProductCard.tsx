import Image from 'next/image'
import { FavoriteIcon } from '@/assets/svgComponents'
import {StarIcon} from '@/assets/svgComponents'

export default function ProductCard() {
  return (
  <div className="border border-gray-20 w-[290px] h-[300px] rounded-[16px] border">
    <section className="relative h-[120px] w-[290px] rounded-[16px]">
        <Image src={'/test.png'} alt="사진" fill className="object-cover rounded-t-[16px]"></Image>
        {/* 아이콘, 좋아요 갯수 */}
        <div className='flex gap-5xs absolute top-[10px] right-[15px]'>
            <FavoriteIcon width={16} height={14}></FavoriteIcon>
            <p className='button-sm text-white'>230</p>
        </div>
    </section>

    <div className="flex flex-col gap-y-4xs h-[198px] w-[290px] p-2xs bg-white rounded-b-[16px]">
        {/* 카테고리 */}
        <div className="flex items-center border border-gray-20 button-sm w-fit h-[24px] px-[8px] border rounded-full text-gray-50">
            카테고리
        </div>
        {/* 완제품명 */}
        <div className="h3">
            완제품명
        </div>
        {/* 설명 */}
        <div className='body1'>
            설명~~~~~~~
        </div>
        <div className='flex items-center justify-between'>
            <p className='body2 text-gray-40'>수량</p>
            <p className='button-sm text-gray-50'>40개</p>
        </div>
        <div className='flex items-center justify-between'>
            <p className='body2 text-gray-40'>리뷰</p>
            <div className='flex items-center justify-center w-[40px] h-[20px]'>
                <div className='w-[20px] h-[20px]'>
                    <StarIcon width={16} height={16}></StarIcon>
                </div>
                <p className='button-sm text-gray-50'>4.5</p>
            </div>
        </div>
    </div>
  </div>
  )
}