import Image from 'next/image'
import { RightIcon } from '@/assets/svgComponents'
import { LeftIcon } from '@/assets/svgComponents'
import { StarIcon } from '@/assets/svgComponents'
import { ProfileIcon } from '@/assets/svgComponents'

export default function EquipmentReviewModal(){
    return(
        <div className=" flex w-[1220px] h-[760px] p-2xs bg-white rounded-[24px]">
            
            <section className="flex items-center relative h-[760px] w-[760px] rounded-l-[24px]">
                <Image src={'/test.png'} alt="사진" fill className="object-cover rounded-l-[24px]"></Image>
                {/* 슬라이드 화살표 왼쪽 오른쪽 구현 해야함 */}
                <div className='flex justify-between px-[20px]'>
                </div>
                {/* 밑에 동그라미 세개 표시*/}
                <div className='flex'>
                </div>
                
            </section>

            <section className="flex flex-col justify-between w-[460px] h-[760px] rounded-r-[24px] p-[20px]">
                <div className="flex flex-col gap-[20px] w-[420px] h-[530px]">
                    <p className="h3">수중드론</p>

                    {/* 견적서 보러가기 넣어야함!*/}


                    <div className="flex items-center justify-between">
                        <p className="text-gray-40 sub2">카테고리</p>
                        <p className="body2">-</p>
                    </div>
                    <div className="flex items-center justify-between">
                        <p className="text-gray-40 sub2">수량</p>
                        <p className="body2">2대</p>
                    </div>
                    <div className="flex flex-col items-start">
                        <p className="text-gray-40 sub2">포트폴리오 자유설명</p>
                        <p className="body2">설명 -</p>
                    </div>
                    <div className="flex flex-col items-star">
                        <p className="text-gray-40 sub2">리뷰</p>
                        <div className='flex flex-col w-[420px] h-[137px] border border-gray-20 rounded-[12px] p-[16px] gap-[8px]'>
                            <div className='flex gap-[8px]'>
                                {/* 프로필 사진 */}
                                <div className='w-[48px] h-[48px] flex items-center'>
                                    <ProfileIcon width={29} height={29}></ProfileIcon>
                                </div>
                                {/* 별점,이름 */}
                                <div className='flex flex-col gap-[4px]'>
                                    <div className='w-[332px] h-[24px] flex items-center justify-between'>
                                        <div className='flex items-center'>
                                            <StarIcon width={20} height={20}></StarIcon>
                                            <p className='button-lg'>4.5</p>
                                        </div>
                                        {/* 날짜 */}
                                        <p className='body2 text-gray-40'>25.06.12</p>
                                    </div>
                                    <p className='body2 text-gray-50'>남**</p>
                                </div>
                            </div>
                            <p className='body1'>퀄리티가 좋게 제한 마감 날짜 잘 지켜서 줬습니다. 연락도 빠르게 되고요.</p>
                        </div>
                    </div>
                </div>

                <div className="flex justify-end">
                    <div className="flex items-center justify-center w-[160px] h-[52px] rounded-[12px] p-2xs border border-gray-20">
                        <p className="button_lg text-gray-50">닫기</p>
                    </div>
                </div>
                
            </section>

        </div>
    )
}