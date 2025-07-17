import { ArrowDownIcon } from '@/assets/svgComponents'

export default function FactoryCategory() {
    return(
        <div className=" flex gap-[8px]">

                <div className="flex items-center gap-5xs border h-[40px] w-fit px-2xs border-gray-20 rounded-[12px]">
                    <p className="sub2 ">카테고리</p>
                    <p className="body1 text-gray-50">전체</p>
                    <div className='flex items-center button-sm justify-center rounded-full bg-gray-30 w-[20px] h-[20px] text-white'>3</div>
                    <ArrowDownIcon width={10} height={8}></ArrowDownIcon>
                </div>

                <div className="flex items-center gap-5xs border h-[40px] w-fit px-2xs border-gray-20 rounded-[12px]">
                    <p className="sub2 ">평점</p>
                    <p className="body1 text-gray-50">전체</p>                        
                    <ArrowDownIcon width={10} height={8}></ArrowDownIcon>
                </div>

                <div className="flex items-center gap-5xs border h-[40px] w-fit px-2xs border-gray-20 rounded-[12px]">
                    <p className="sub2 ">평균 응답 시간</p>
                    <p className="body1 text-gray-50">전체</p>                        
                    <ArrowDownIcon width={10} height={8}></ArrowDownIcon>
                </div>

                <div className="flex items-center gap-5xs border h-[40px] w-fit px-2xs border-gray-20 rounded-[12px]">
                    <p className="sub2 ">거래 건수</p>
                    <p className="body1 text-gray-50">전체</p>                        
                    <ArrowDownIcon width={10} height={8}></ArrowDownIcon>
                </div>

                <div className="flex items-center gap-5xs border h-[40px] w-fit px-2xs border-gray-20 rounded-[12px]">
                    <p className="sub2 ">평균 제작 기간</p>
                    <p className="body1 text-gray-50">전체</p>                        
                    <ArrowDownIcon width={10} height={8}></ArrowDownIcon>
                </div>
        </div>
    )
}