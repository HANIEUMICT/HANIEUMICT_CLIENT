import Button1 from '@/components/common/Button1'
import { ChatIcon, FavoriteIcon } from '@/assets/svgComponents'
import { useRouter } from 'next/navigation'

export default function BidderList() {
  const router = useRouter()
  return (
    <div className="border-gray-20 relative h-[763px] w-[442px] rounded-[24px] border bg-white">
      <div className="gap-y-xs p-s flex flex-col">
        <section className="flex flex-col gap-y-3">
          <p className="sub1">입찰 현황(3)</p>
          <div className="flex w-full justify-between">
            <p className="body1 text-gray-50">입찰 마감일</p>
            <p className="sub2 text-gray-50">2025. 07. 10</p>
          </div>
        </section>
        <section className="border-gray-20 p-2xs gap-y-4xs flex w-full flex-col rounded-[16px] border">
          <p className="h3">공장</p>
          <div className="flex items-center justify-between">
            <p className="body2 text-gray-40">제안 가격</p>
            <p className="button-sm text-gray-50">1,000,000,000원</p>
          </div>
          <div className="flex items-center justify-between">
            <p className="body2 text-gray-40">최대 제조 가능 날짜</p>
            <p className="button-sm text-gray-50">2025. 07. 10</p>
          </div>
        </section>
        <section className="border-gray-20 p-2xs gap-y-4xs flex w-full flex-col rounded-[16px] border">
          <p className="h3">공장</p>
          <div className="flex items-center justify-between">
            <p className="body2 text-gray-40">제안 가격</p>
            <p className="button-sm text-gray-50">1,000,000,000원</p>
          </div>
          <div className="flex items-center justify-between">
            <p className="body2 text-gray-40">최대 제조 가능 날짜</p>
            <p className="button-sm text-gray-50">2025. 07. 10</p>
          </div>
        </section>
        <section className="border-gray-20 p-2xs gap-y-4xs flex w-full flex-col rounded-[16px] border">
          <p className="h3">공장</p>
          <div className="flex items-center justify-between">
            <p className="body2 text-gray-40">제안 가격</p>
            <p className="button-sm text-gray-50">1,000,000,000원</p>
          </div>
          <div className="flex items-center justify-between">
            <p className="body2 text-gray-40">최대 제조 가능 날짜</p>
            <p className="button-sm text-gray-50">2025. 07. 10</p>
          </div>
        </section>
      </div>
      <section className="gap-x-4xs p-s absolute bottom-0 flex w-full">
        <button className="border-gray-20 flex h-[52px] w-[52px] min-w-[52px] flex-shrink-0 items-center justify-center rounded-[12px] border whitespace-nowrap">
          <FavoriteIcon width={24} height={24} />
        </button>
        <button className="border-gray-20 flex h-[52px] w-[52px] min-w-[52px] flex-shrink-0 items-center justify-center rounded-[12px] border whitespace-nowrap">
          <ChatIcon width={24} height={24} />
        </button>
        <Button1
          onClick={() => {
            router.push('/proposal')
          }}
          styleType={'primary'}
          styleStatus={'default'}
          styleSize={'lg'}
          customClassName={'w-full'}
        >
          견적서 작성 후 입찰하기
        </Button1>
      </section>
    </div>
  )
}
