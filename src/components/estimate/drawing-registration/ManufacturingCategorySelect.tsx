import Button1 from '@/components/common/Button1'

interface ManufacturingCategorySelectProps {}

export default function ManufacturingCategorySelect({}: ManufacturingCategorySelectProps) {
  return (
    <div className="gap-y-4xs flex flex-col">
      <p className="sub2">제조 분류 선택</p>
      <section className="gap-x-3xs flex">
        <Button1
          onClick={() => {}}
          styleSize={'lg'}
          styleStatus={'default'}
          styleType={'outline'}
          customClassName={'h-[60px] w-full'}
        >
          제품 개발 / 부품제조
        </Button1>
        <Button1
          onClick={() => {}}
          styleSize={'lg'}
          styleStatus={'default'}
          styleType={'outline'}
          customClassName={'h-[60px] w-full'}
        >
          완제품 / 위탁생산
        </Button1>
      </section>
    </div>
  )
}
