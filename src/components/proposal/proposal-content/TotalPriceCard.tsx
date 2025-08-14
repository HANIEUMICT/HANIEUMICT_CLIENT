import Input from '@/components/common/Input'

export default function TotalPriceCard() {
  return (
    <div className="border-gray-20 flex h-fit w-[442px] flex-shrink-0 flex-col gap-y-[16px] rounded-[24px] border bg-white p-[24px] whitespace-nowrap">
      <h1 className="sub1">최종금액</h1>
      <section className="gap-y-4xs flex flex-col">
        <h2 className="sub2">1차</h2>
        <Input
          inputBoxStyle={'default'}
          value={''}
          placeholder={'1차 금액을 입력해주세요.'}
          rightIcon={<p className="body2 text-gray-50">원</p>}
        />
      </section>
      <section className="gap-y-4xs flex flex-col">
        <h2 className="sub2">2차</h2>
        <Input
          inputBoxStyle={'default'}
          value={''}
          placeholder={'2차 금액을 입력해주세요.'}
          rightIcon={<p className="body2 text-gray-50">원</p>}
        />
      </section>
      <div className="border-gray-20 border-b"></div>
      <div className="flex justify-between">
        <p className="sub2">최종 제안 금액</p>
        <p className="sub1 text-conic-red-30">10000000원</p>
      </div>
    </div>
  )
}
