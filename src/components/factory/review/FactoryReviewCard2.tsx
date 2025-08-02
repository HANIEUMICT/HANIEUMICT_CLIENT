import { StarIcon } from '@/assets/svgComponents'
import { ProfileIcon } from '@/assets/svgComponents'
import { ThumbIcon } from '@/assets/svgComponents'

export default function FactoryReviewCard2(){
    return(
        <div className="w-[1218px] h-[160px] border border-gray-20 rounded-[12px] p-xs flex items-center gap-[32px]">
            {/* 상단: 별점, 작성일 */}
            <div className="w-[762px] h-[105px] flex flex-col gap-[8px] justify-between">
                <div className="w-[762px] h-[73px]">

                    <section className='flex gap-[8px] items-center'>
                        {/* 프로필 사진 */}
                        <div className='w-[48px] h-[48px] flex items-center'>
                            <ProfileIcon width={24} height={24}></ProfileIcon>
                        </div>

                        {/* 별점,좋아요,이름 */}
                        <div className='flex flex-col gap-[4px]'>
                            <div className='w-[706px] h-[24px] flex items-center justify-between'>
                                <div className='flex items-center'>
                                <StarIcon width={20} height={20}></StarIcon>
                                <StarIcon width={20} height={20}></StarIcon>
                                <StarIcon width={20} height={20}></StarIcon>
                                <StarIcon width={20} height={20}></StarIcon>
                                <StarIcon width={20} height={20}></StarIcon>
                                <p className='button-lg'>4.5</p>
                                </div>
                                {/* 날짜 */}
                                <p className='body2 text-gray-40'>25.06.12</p>
                            </div>
                            

                            <div className='gap-4xs flex w-[154px] h-[20px]'>

                                <div className='w-[46px] h-[20px] flex items-center gap-[2px]'>
                                    <div className='flex items-center'>
                                        {/* 따봉 */}
                                        <div className='h-[14px] flex items-end'>
                                            <div className='w-[4px] h-[10px] rounded-[2px] bg-conic-blue-30'></div>
                                        </div>
                                        <ThumbIcon width={12} height={15}></ThumbIcon>
                                    </div>
                                    <p className='button-sm text-gray-50'>가격</p>
                                </div>

                                <div className='w-[46px] h-[20px] flex items-center gap-[2px]'>
                                    <div className='flex items-center'>
                                        {/* 따봉 */}
                                        <div className='h-[14px] flex items-end'>
                                            <div className='w-[4px] h-[10px] rounded-[2px] bg-conic-blue-30'></div>
                                        </div>
                                        <ThumbIcon width={12} height={15}></ThumbIcon>
                                    </div>
                                    <p className='button-sm text-gray-50'>신뢰</p>
                                </div>

                                <div className='w-[46px] h-[20px] flex items-center gap-[2px]'>
                                    <div className='flex items-center'>
                                        {/* 따봉 */}
                                        <div className='h-[14px] flex items-end'>
                                            <div className='w-[4px] h-[10px] rounded-[2px] bg-conic-blue-30'></div>
                                        </div>
                                        <ThumbIcon width={12} height={15}></ThumbIcon>
                                    </div>
                                    <p className='button-sm text-gray-50'>속도</p>
                                </div>
                                
                            </div>
                            
                            <p className='body2'>남**</p>
                        </div>
                        
                    </section>
                        
                </div>  

                {/* 리뷰 내용 */}
                <p className="body1">
                    퀄리티가 좋게 제한 마감 날짜 잘 지켜서 줬습니다. 연락도 빠르게 되고요.
                </p>
            </div>

            

            {/* 이미지 목록 */}
            <div className="flex w-[384px] h-[120px] gap-3xs ">
                <div className="w-[120px] h-[120px] rounded-[12px] bg-gray-20 flex items-center justify-center sub2 text-gray-50">사진</div>
                <div className="w-[120px] h-[120px] rounded-[12px] bg-gray-20 flex items-center justify-center sub2 text-gray-50">사진</div>
                <div className="w-[120px] h-[120px] rounded-[12px] bg-gray-20 flex items-center justify-center">
                    <div className='w-[120px] h-[120px] rounded-[12px] bg-black opacity-20'></div>
                </div>
            </div>
            
        </div>

    )
}