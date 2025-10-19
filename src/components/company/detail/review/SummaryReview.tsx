export default function SummaryReview() {
  return (
    <div className="gap-y-2xs flex w-full flex-col rounded-[24px] bg-white p-6">
      <section className="flex items-center justify-between">
        <h3 className="h3">이런 점이 좋았습니다!</h3>
        <p className="body2 text-gray-50">475명 참여</p>
      </section>
      <section className="gap-y-3xs flex flex-col">
        <div className="bg-gray-20 relative h-[40px] w-full rounded-[12px]">
          <div className="absolute top-2 flex w-full items-center justify-between px-3">
            <p className="sub2">답변 속도가 빨랐어요</p>
            <p className="button-sm text-gray-50">6</p>
          </div>
          <div className="h-[40px] w-[1100px] rounded-[12px] bg-[#FF8345]" />
        </div>
        <div className="bg-gray-20 relative h-[40px] w-full rounded-[12px]">
          <div className="absolute top-2 flex w-full items-center justify-between px-3">
            <p className="sub2">믿을만한 거래처였어요</p>
            <p className="button-sm text-gray-50">6</p>
          </div>
          <div className="h-[40px] w-[960px] rounded-[12px] bg-[#FF9966]"></div>
        </div>
        <div className="bg-gray-20 relative h-[40px] w-full rounded-[12px]">
          <div className="absolute top-2 flex w-full items-center justify-between px-3">
            <p className="sub2">믿을만한 거래처였어요</p>
            <p className="button-sm text-gray-50">6</p>
          </div>
          <div className="h-[40px] w-[450px] rounded-[12px] bg-[#FFB18A]" />
        </div>
        <div className="bg-gray-20 relative h-[40px] w-full rounded-[12px]">
          <div className="absolute top-2 flex w-full items-center justify-between px-3">
            <p className="sub2">믿을만한 거래처였어요</p>
            <p className="button-sm text-gray-50">6</p>
          </div>
          <div className="h-[40px] w-[106px] rounded-[12px] bg-[#FFC2A3]"></div>
        </div>
        <div className="bg-gray-20 relative h-[40px] w-full rounded-[12px]">
          <div className="absolute top-2 flex w-full items-center justify-between px-3">
            <p className="sub2">믿을만한 거래처였어요</p>
            <p className="button-sm text-gray-50">6</p>
          </div>
          <div className="h-[40px] w-[52px] rounded-[12px] bg-[#FFDAC7]"></div>
        </div>
      </section>
    </div>
  )
}
