import { FavoriteIcon } from '@/assets/svgComponents'

export default function FactoryBottomBar(){
    return(

        <section className='flex justify-end w-[1218px] gap-[12px]'>
        <div className='border border-gray-20 flex items-center gap-5xs p-xs w-[82px] h-[54px] rounded-[12px]'>
          <FavoriteIcon width={20} height={18}></FavoriteIcon>
          <p className='button_lg text-gray-50'>찜</p>
        </div>

        <div className='flex items-center justify-center border border-gray-20  p-2xs w-[160px] h-[54px] rounded-[12px]'>
          <p className='button_lg text-gray-50'>1:1 채팅</p>
        </div>

        <div className='flex items-center justify-center border border-gray-20 p-2xs w-[598px] h-[54px] rounded-[12px] bg-[#FF363C]'>
          <p className='button_lg text-white'>견적서 신청하기</p>
        </div>
      </section>

    )
}