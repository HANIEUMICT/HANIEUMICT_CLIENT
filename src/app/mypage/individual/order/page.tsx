'use client'

import Button1 from '@/components/common/Button1'
import { useRouter } from 'next/navigation'
import OrderItem from '@/components/mypage/individual/order/OrderItem'

export default function IndividualMyOrderInfoPage() {
  const router = useRouter()
  return (
    <div className="gap-y-2xs mt-[40px] flex w-[1220px] flex-col">
      <h1 className="h2">주문 정보</h1>
      <section className="p-s border-gray-20 flex justify-between rounded-[24px] border bg-white">
        <div className="flex flex-col gap-y-4">
          <h1 className="sub1">‘고강도 합금강 육각 머리 볼트(M10) 제작'의 검수 샘플 확인 상태를 변경해주세요!</h1>
          <p className="text-gray-40 body1">검수 샘플 상태를 승인으로 변경해야 견적서 제작이 가능합니다.</p>
        </div>

        <Button1
          onClick={() => {}}
          styleType={'outline'}
          styleSize={'sm'}
          styleStatus={'default'}
          customClassName={'w-[80px] rounded-full h-[36px] text-gray-40'}
        >
          변경
        </Button1>
      </section>
      <OrderItem />
      <OrderItem />
    </div>
  )
}
