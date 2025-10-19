'use client'
import { ChatIcon, FavoriteIcon, GrayFavoriteIcon } from '@/assets/svgComponents'

export default function EstimateCard(){
    return(
        <div className="w-[390px] h-[225px] flex flex-col rounded-[24px] py-xs px-[20px] gap-4xs">
            <div className="flex gap-[8px]">
                <div className="border border-gray20 text-gray-50 px-[8px] py-5xs rounded-full button-sm">카테고리</div>
                <div className="border border-gray20 text-gray-50 px-[8px] py-5xs rounded-full button-sm">제조 분류</div>
            </div>

            <section className="flex gap-2xs">
                <div className='w-[109px] h-[109px] rounded-[16px] bg-gray-20 flex items-center justify-center'>
                    <p className='body1 text-conic-blue-30'>사진</p>
                </div>
                
                <div className="flex flex-col gap-4xs">
                    <p className="h3">프로젝트명</p>
                    <div className="w-[225px] h-[71px] flex flex-col gap-5xs">
                        <div className="flex justify-between items-center">
                            <p className="text-gray-40 body2">납기일</p>
                            <p className="text-gray-50 button-sm">2025. 08. 01(화)</p>
                        </div>
                        <div className="flex justify-between items-center">
                            <p className="text-gray-40 body2">추정액</p>
                            <p className="text-gray-50 button-sm">1,000,000,000원</p>
                        </div>
                        <div className="flex justify-between items-center">
                            <p className="text-gray-40 body2">입찰 마감일</p>
                            <p className="text-gray-50 button-sm">~ 07. 10까지</p>
                        </div>
                    </div>
                </div>

            </section>

            <section className='flex justify-between items-center'>
                <div className='flex gap-5xs items-center'>
                    <GrayFavoriteIcon width={20} height={18}></GrayFavoriteIcon>
                    <p className='button-sm text-gray-30'>123</p>
                </div>

                <div className='flex items-center w-[114px] h-[36px] rounded-full border border-gray-20 py-5xs px-2xs gap-[8px]'>
                    <div className='flex items-center w-[24px] h-[24px]'>
                        <ChatIcon width={24} height={20}></ChatIcon>
                    </div>
                    <p className='button-sm text-gray-40'>채팅하기</p>
                </div>

            </section>
        </div>
    )
}