import Button1 from '@/components/common/Button1'
import { Dispatch, SetStateAction } from 'react'
import { Gray50ArrowDownIcon, Gray50ArrowUpIcon, WhitePlusIcon } from '@/assets/svgComponents'
import ProductNameField from '@/components/proposal/proposal-content/ProductNameField'
import SpecificationField from '@/components/proposal/proposal-content/SpecificationField'
import UnitPriceField from '@/components/proposal/proposal-content/UnitPriceField'
import QuantityField from '@/components/proposal/proposal-content/QuantityField'
import PriceField from '@/components/proposal/proposal-content/PriceField'
import EtcField from '@/components/proposal/proposal-content/EtcField'

interface ProposalContentProps {
  setCurrentStep: Dispatch<SetStateAction<number>>
}

export default function ProposalContent({ setCurrentStep }: ProposalContentProps) {
  return (
    <div className="flex flex-col gap-y-[40px]">
      <section className="border-gray-20 flex flex-col gap-y-4 rounded-[24px] border bg-white p-6">
        <div className="flex items-center justify-between">
          <h1 className={'sub1'}>견적 내용 입력</h1>
          <Button1
            onClick={() => {}}
            leftIcon={<WhitePlusIcon width={16} height={16} />}
            styleSize={'md'}
            styleStatus={'default'}
            styleType={'secondary'}
            customClassName={'h-[48px]'}
          >
            견적 품목 추가
          </Button1>
        </div>
        <div className="p-2xs bg-gray-10 sub2 text-conic-orange-40 flex items-center justify-between rounded-[16px]">
          <p>견적 1</p>
          <Gray50ArrowDownIcon width={16} height={12} />
        </div>
        <div className="p-2xs bg-gray-10 flex flex-col gap-y-[16px] rounded-[16px]">
          <div className="flex items-center justify-between">
            <p className="sub2 text-conic-orange-40">견적 2</p>
            <Gray50ArrowUpIcon width={16} height={12} />
          </div>
          <ProductNameField />
          <SpecificationField />
          <UnitPriceField />
          <QuantityField />
          <PriceField />
          <EtcField />
        </div>
      </section>
      <section className="flex justify-between">
        <Button1
          onClick={() => {
            setCurrentStep(1)
          }}
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
            styleStatus={'disabled'}
            styleSize={'lg'}
            styleType={'outline'}
          >
            임시저장
          </Button1>
          <Button1
            onClick={() => {
              setCurrentStep(3)
            }}
            customClassName={'h-[52px] w-[260px]'}
            styleStatus={'disabled'}
            styleType={'primary'}
            styleSize={'lg'}
          >
            다음
          </Button1>
        </div>
      </section>
    </div>
  )
}
