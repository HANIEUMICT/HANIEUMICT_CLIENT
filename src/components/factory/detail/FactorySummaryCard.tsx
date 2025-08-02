import Image from 'next/image'

export default function FactorySummaryCard(){
    return(
        <div className="flex gap-2xs p-[24px] border border-gray-20 w-[1218px] h-[153px] rounded-[24px]">
            {/* 기업 프로필 */}
            <div className='flex w-[434px] h-[98px] gap-[16px]'>
                <Image src="/toss-logo.png" alt="로고" width={98} height={98} className="border border-gray-20 rounded-[12px] object-cover"></Image>
                <div className='flex flex-col gap-4xs'>
                    <div className='flex items-center p-5xs w-[172px] h-[28px] gap-5xs bg-conic-blue-30 rounded-[12px]'>
                        <div className='flex items-center justify-center w-[43px] h-[20px] bg-conic-blue-10 text-conic-blue-30 rounded-[8px] badge'>AI분석</div>
                        <p className='flex items-center w-[113px] h-[14px] button-sm text-white'>품질이 좋은 공급업체</p>
                    </div>
                    <p className='sub1'>기업명</p>
                    <p className='sub1 tex-gray-50'>카테고리</p>
                </div>
            </div>

            {/* 요약 정보*/}
            <div className='border border-gray-20 flex gap-2xs p-2xs w-[720px] h-[105px] rounded-[16px]'>
                <div className='flex flex-col gap-5xs w-[160px] h-[73px] px-2xs py-3xs'>
                    <p className='body2 text-gray-40'>제작시 평균 소요 시간</p>
                    <p className='sub2'>약 3개월</p>
                </div>

                <div className='flex flex-col gap-5xs w-[160px] h-[73px] px-2xs py-3xs'>
                    <p className='body2 text-gray-40'>평균 응답시간</p>
                    <p className='sub2'>3시간 이내</p>
                </div>

                <div className='flex flex-col gap-5xs w-[160px] h-[73px] px-2xs py-3xs'>
                    <p className='body2 text-gray-40'>거래 건수</p>
                    <p className='sub2'>10건</p>
                </div>

                <div className='flex flex-col gap-5xs w-[160px] h-[73px] px-2xs py-3xs'>
                    <p className='body2 text-gray-40'>재거래 건수</p>
                    <p className='sub2'>2건</p>
                </div>

            </div>
        </div>
    )
}