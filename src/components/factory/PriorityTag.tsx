
export default function PriorityTag() {
    return(
        <div className='flex gap-4xs items-center'>
            <div className="flex items-center gap-5xs px-3xs button-sm w-fit h-[24px] px-3xs rounded-[12px] text-white bg-conic-orange-40">
                <div>1</div>
                <div>신뢰도 있는 기업</div>
            </div>

            <div className="flex items-center gap-5xs px-3xs button-sm w-fit h-[24px] px-3xs rounded-[12px] text-white bg-conic-orange-30">
                <div>2</div>
                <div>빠른 답변 속도</div>
            </div>

            <div className="flex items-center gap-5xs px-3xs button-sm w-fit h-[24px] px-3xs rounded-[12px] text-white bg-conic-orange-20">
                <div>3</div>
                <div>합리적인 가격 거래</div>
            </div>

            <div className="button-sm text-gray-40">
                추천 우선순위 변경
            </div>
        </div>
        
    )
}

