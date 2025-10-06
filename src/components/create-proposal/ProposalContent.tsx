import Button1 from '@/components/common/Button1'
import { Dispatch, SetStateAction, useState, useMemo } from 'react'
import { Gray50ArrowDownIcon, Gray50ArrowUpIcon, WhitePlusIcon } from '@/assets/svgComponents'
import ProductNameField from '@/components/create-proposal/proposal-content/ProductNameField'
import SpecificationField from '@/components/create-proposal/proposal-content/SpecificationField'
import UnitPriceField from '@/components/create-proposal/proposal-content/UnitPriceField'
import QuantityField from '@/components/create-proposal/proposal-content/QuantityField'
import PriceField from '@/components/create-proposal/proposal-content/PriceField'
import EtcField from '@/components/create-proposal/proposal-content/EtcField'
import TotalPriceCard from '@/components/create-proposal/proposal-content/TotalPriceCard'
import { useProposalStore } from '@/store/proposalStore'
import { ItemType } from '@/type/proposal'

interface ProposalContentProps {
  setCurrentStep: Dispatch<SetStateAction<number>>
}

export default function ProposalContent({ setCurrentStep }: ProposalContentProps) {
  const setState = useProposalStore((state) => state.setState)
  const proposalData = useProposalStore((state) => state.proposalData)

  // 각 품목의 펼침/접힘 상태 관리
  const [expandedItems, setExpandedItems] = useState<boolean[]>([true])

  // 유효성 검사
  const isValid = useMemo(() => {
    const items = proposalData?.items || []
    const firstPrice = proposalData?.firstPrice
    const secondPrice = proposalData?.secondPrice

    // items가 최소 1개 이상
    const hasItems = items.length >= 1

    // firstPrice와 secondPrice가 모두 입력되었는지
    const hasPrices = firstPrice !== undefined && firstPrice > 0 && secondPrice !== undefined && secondPrice > 0

    return hasItems && hasPrices
  }, [proposalData?.items, proposalData?.firstPrice, proposalData?.secondPrice])

  // 새 품목 추가
  const addNewItem = () => {
    const newItem: ItemType = {
      itemName: '',
      itemSize: '',
      itemNote: '',
      itemUnitPrice: 0,
      itemQuantity: 0,
    }

    const currentItems = proposalData?.items || []

    setState({
      proposalData: {
        ...proposalData,
        items: [...currentItems, newItem],
      },
    })

    // 새 품목은 펼쳐진 상태로
    setExpandedItems([...expandedItems, true])
  }

  // 특정 품목 업데이트
  const updateItem = (index: number, field: keyof ItemType, value: string | number) => {
    const currentItems = proposalData?.items || []
    const updatedItems = currentItems.map((item, i) => (i === index ? { ...item, [field]: value } : item))

    setState({
      proposalData: {
        ...proposalData,
        items: updatedItems,
      },
    })
  }

  // 아코디언 토글
  const toggleItem = (index: number) => {
    setExpandedItems(expandedItems.map((expanded, i) => (i === index ? !expanded : expanded)))
  }

  const items = proposalData?.items || []

  return (
    <div className="flex flex-col gap-y-[40px]">
      <div className="flex flex-col gap-y-4">
        <section className="border-gray-20 flex flex-col gap-y-4 rounded-[24px] border bg-white p-6">
          <div className="flex items-center justify-between">
            <h1 className={'sub1'}>견적 내용 입력</h1>
            <Button1
              onClick={addNewItem}
              leftIcon={<WhitePlusIcon width={16} height={16} />}
              styleSize={'md'}
              styleStatus={'default'}
              styleType={'secondary'}
              customClassName={'h-[48px]'}
            >
              견적 품목 추가
            </Button1>
          </div>

          {/* 품목 리스트 렌더링 */}
          {items.map((item, index) => (
            <div
              key={index}
              className={`p-2xs bg-gray-10 flex flex-col rounded-[16px] ${expandedItems[index] ? 'gap-y-[16px]' : ''}`}
            >
              <div className="flex cursor-pointer items-center justify-between" onClick={() => toggleItem(index)}>
                <p className="sub2 text-conic-orange-40">견적 {index + 1}</p>
                {expandedItems[index] ? (
                  <Gray50ArrowUpIcon width={16} height={12} />
                ) : (
                  <Gray50ArrowDownIcon width={16} height={12} />
                )}
              </div>

              {/* 펼쳐진 경우에만 필드 표시 */}
              {expandedItems[index] && (
                <>
                  <ProductNameField value={item.itemName} onChange={(value) => updateItem(index, 'itemName', value)} />
                  <SpecificationField
                    value={item.itemSize}
                    onChange={(value) => updateItem(index, 'itemSize', value)}
                  />
                  <UnitPriceField
                    value={item.itemUnitPrice}
                    onChange={(value) => updateItem(index, 'itemUnitPrice', value)}
                  />
                  <QuantityField
                    value={item.itemQuantity}
                    onChange={(value) => updateItem(index, 'itemQuantity', value)}
                  />
                  <PriceField unitPrice={item.itemUnitPrice} unitQuantity={item.itemQuantity} />
                  <EtcField value={item.itemNote} onChange={(value) => updateItem(index, 'itemNote', value)} />
                </>
              )}
            </div>
          ))}
        </section>

        <TotalPriceCard />
      </div>

      <section className="flex justify-between">
        <Button1
          onClick={() => setCurrentStep(1)}
          customClassName={'h-[52px] w-[260px]'}
          styleStatus={'default'}
          styleSize={'lg'}
          styleType={'outline'}
        >
          이전
        </Button1>
        <div className="gap-x-2xs flex">
          <Button1
            onClick={() => {}}
            customClassName={'h-[52px] w-[260px]'}
            styleStatus={'default'}
            styleSize={'lg'}
            styleType={'outline'}
          >
            임시저장
          </Button1>
          <Button1
            onClick={() => setCurrentStep(3)}
            customClassName={'h-[52px] w-[260px]'}
            styleStatus={isValid ? 'default' : 'disabled'}
            styleType={'primary'}
            styleSize={'lg'}
            disabled={!isValid}
          >
            다음
          </Button1>
        </div>
      </section>
    </div>
  )
}
