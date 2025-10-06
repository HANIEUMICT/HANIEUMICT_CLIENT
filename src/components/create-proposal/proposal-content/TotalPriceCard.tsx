import Input from '@/components/common/Input'
import { useProposalStore } from '@/store/proposalStore'
import { useMemo, useEffect } from 'react'

export default function TotalPriceCard() {
  const setState = useProposalStore((state) => state.setState)
  const proposalData = useProposalStore((state) => state.proposalData)

  // items의 총 금액 계산
  const itemsTotalPrice = useMemo(() => {
    const items = proposalData?.items || []
    return items.reduce((sum, item) => {
      return sum + (item.itemUnitPrice || 0) * (item.itemQuantity || 0)
    }, 0)
  }, [proposalData?.items])

  // items 총액이 변경되면 2차 가격에 자동 반영
  useEffect(() => {
    if (itemsTotalPrice > 0) {
      const currentFirstPrice = proposalData?.firstPrice ?? 0
      const newTotalPrice = currentFirstPrice + itemsTotalPrice

      setState({
        proposalData: {
          ...proposalData,
          secondPrice: itemsTotalPrice,
          totalPrice: newTotalPrice,
        },
      })
    }
  }, [itemsTotalPrice])

  return (
    <div className="border-gray-20 flex h-fit w-full flex-shrink-0 flex-col gap-y-[16px] rounded-[24px] border bg-white p-[24px] whitespace-nowrap">
      <h1 className="sub1">최종금액</h1>

      <section className="gap-y-4xs flex flex-col">
        <h2 className="sub2">1차</h2>
        <Input
          onChange={(e) => {
            const newFirstPrice = e.target.value ? parseInt(e.target.value) : undefined
            const currentSecondPrice = proposalData?.secondPrice ?? 0
            const newTotalPrice = (newFirstPrice ?? 0) + currentSecondPrice

            setState({
              proposalData: {
                ...proposalData,
                firstPrice: newFirstPrice,
                totalPrice: newFirstPrice || currentSecondPrice ? newTotalPrice : undefined,
              },
            })
          }}
          inputBoxStyle={'default'}
          value={proposalData?.firstPrice ?? ''}
          placeholder={'1차 금액을 입력해주세요.'}
          type={'number'}
          rightIcon={<p className="body2 text-gray-50">원</p>}
        />
      </section>

      <section className="gap-y-4xs flex flex-col">
        <h2 className="sub2">2차 (견적 품목 합계)</h2>
        <Input
          onChange={(e) => {
            const newSecondPrice = e.target.value ? parseInt(e.target.value) : undefined
            const currentFirstPrice = proposalData?.firstPrice ?? 0
            const newTotalPrice = currentFirstPrice + (newSecondPrice ?? 0)

            setState({
              proposalData: {
                ...proposalData,
                secondPrice: newSecondPrice,
                totalPrice: currentFirstPrice || newSecondPrice ? newTotalPrice : undefined,
              },
            })
          }}
          inputBoxStyle={'default'}
          value={proposalData?.secondPrice ?? ''}
          placeholder={'2차 금액을 입력해주세요.'}
          type={'number'}
          rightIcon={<p className="body2 text-gray-50">원</p>}
        />
        <p className="caption-sm text-gray-50">견적 품목 합계: {itemsTotalPrice.toLocaleString()}원</p>
      </section>

      <div className="border-gray-20 border-b"></div>

      <div className="flex justify-between">
        <p className="sub2">최종 제안 금액</p>
        <p className="sub1 text-conic-red-30">
          {proposalData?.totalPrice ? `${proposalData.totalPrice.toLocaleString()}원` : '-'}
        </p>
      </div>
    </div>
  )
}
