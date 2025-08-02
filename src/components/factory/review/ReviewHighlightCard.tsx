export default function ReviewHighlightCard(){
    return(
        <div className="border border-gray-20 flex flex-col items-center p-[24px] gap-2xs rounded-[24px] w-[1218px] h-[342px]">
            <div className="flex items-center justify-between w-[1170px] h-[30px]">
                <p className="h3">이런 점이 좋았습니다!</p>
                <p className="body2 text-gray-50">475명 참여</p>
            </div>

            <div className="flex flex-col gap-3xs">

                <div className="flex items-center justify-between w-[1170px] h-[40px] bg-gray-20 rounded-[12px]">
                    <div className="flex items-center justify-start px-3xs bg-[#FF8345] h-full w-[90%] rounded-[12px]">
                        <p className="sub2 ">답변 속도가 빨랐어요</p>
                    </div>
                    <p className="w-[50px] h-[30px] flex items-center px-3xs button_sm text-gray-50">460</p>
                </div>

                <div className="flex items-center justify-between w-[1170px] h-[40px] bg-gray-20 rounded-[12px]">
                    <div className="flex items-center justify-start px-3xs bg-[#FF9966] h-full w-[80%] rounded-[12px]">
                        <p className="sub2 whitespace-nowrap">합리적인 가격이었어요</p>
                    </div>
                    <p className="w-[50px] h-[30px] flex items-center px-3xs button_sm text-gray-50">400</p>
                </div>

                <div className="flex items-center justify-between w-[1170px] h-[40px] bg-gray-20 rounded-[12px]">
                    <div className="flex items-center justify-start px-3xs bg-[#FFB18A] h-full w-[40%] rounded-[12px]">
                        <p className="sub2 whitespace-nowrap">결과물 퀄리티가 좋아요</p>
                    </div>
                    <p className="w-[47px] h-[30px] flex items-center px-3xs button_sm text-gray-50">120</p>
                </div>

                <div className="flex items-center justify-between w-[1170px] h-[40px] bg-gray-20 rounded-[12px]">
                    <div className="flex items-center justify-start px-3xs bg-[#FFC2A3] h-full w-[15%] rounded-[12px]">
                        <p className="sub2 whitespace-nowrap">제작 기간이 빨랐어요</p>
                    </div>
                    <p className="w-[42px] h-[30px] flex items-center px-3xs button_sm text-gray-50">60</p>
                </div>

                <div className="flex items-center justify-between w-[1170px] h-[40px] bg-gray-20 rounded-[12px]">
                    <div className="flex items-center justify-start px-3xs bg-[#FFDAC7] h-full w-[5%] rounded-[12px]">
                        <p className="sub2 whitespace-nowrap">믿을만한 거래처였어요</p>
                    </div>
                    <p className="w-[33px] h-[30px] flex items-center px-3xs button_sm text-gray-50">5</p>
                </div>

            </div>

        </div>
        


    )
}