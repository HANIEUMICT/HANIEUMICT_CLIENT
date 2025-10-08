import { ProfileIcon, StarIcon, ThumbIcon } from '@/assets/svgComponents'

export default function ReviewItem() {
  return (
    <div className="p-xs flex w-full items-center gap-x-[32px] rounded-[12px] bg-white">
      <section className="flex w-[80%] flex-col items-start gap-y-2">
        <div className="flex w-full items-center gap-x-2">
          <div className="bg-gray-10 relative flex h-[48px] w-[48px] items-center justify-center rounded-full">
            <ProfileIcon width={24} height={24} />
          </div>
          <div className="flex w-full flex-col gap-y-1">
            <div className="flex justify-between">
              <div className="flex items-center gap-x-1">
                <div className="flex gap-x-[2px]">
                  <StarIcon width={20} height={20} />
                  <StarIcon width={20} height={20} />
                  <StarIcon width={20} height={20} />
                  <StarIcon width={20} height={20} />
                  <StarIcon width={20} height={20} />
                </div>
                <p className="button-lg">4.5</p>
              </div>
              <p className="body2 text-gray-40">25.06.12</p>
            </div>

            <div className="gap-x-4xs flex">
              <div className="flex items-center gap-x-1">
                <ThumbIcon width={20} height={20} />
                <p className="button-sm text-gray-50">가격</p>
              </div>
              <div className="flex items-center gap-x-1">
                <ThumbIcon width={20} height={20} />
                <p className="button-sm text-gray-50">신뢰</p>
              </div>
              <div className="flex items-center gap-x-1">
                <ThumbIcon width={20} height={20} />
                <p className="button-sm text-gray-50">속도</p>
              </div>
            </div>
            <p className="body2 text-gray-50">남**</p>
          </div>
        </div>

        <p>퀄리티가 좋게 제한 마감 날짜 잘 지켜서 줬습니다. 연락도 빠르게 되고요.</p>
      </section>
      <section className="gap-x-3xs flex">
        <div className="bg-gray-20 flex h-[120px] w-[120px] items-center justify-center rounded-[12px]">사진</div>
        <div className="bg-gray-20 flex h-[120px] w-[120px] items-center justify-center rounded-[12px]">사진</div>
        <div className="bg-gray-20 flex h-[120px] w-[120px] items-center justify-center rounded-[12px]">사진</div>
      </section>
    </div>
  )
}
