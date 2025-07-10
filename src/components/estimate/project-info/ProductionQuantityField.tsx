import Input from '@/components/common/Input'

interface ProductionQuantityFieldProps {}
export default function ProductionQuantityField({}: ProductionQuantityFieldProps) {
  return (
    <div className="gap-y-4xs flex flex-col">
      <p className="sub2">제조 수량</p>
      <Input placeholder={'제조 수량을 입력해주세요.'} customClassName={'h-[52px]'} inputBoxStyle={'default'}></Input>
    </div>
  )
}
