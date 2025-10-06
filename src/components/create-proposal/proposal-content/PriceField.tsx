import Input from '@/components/common/Input'

interface PriceFieldProps {
  unitPrice: number
  unitQuantity: number
}

export default function PriceField({ unitPrice, unitQuantity }: PriceFieldProps) {
  const totalPrice = unitPrice * unitQuantity
  return (
    <div className="gap-y-4xs flex flex-col">
      <p className="sub2">가격</p>
      <Input
        readonly={true}
        inputBoxStyle={'disabled'}
        value={totalPrice}
        placeholder={'가격을 입력해주세요.'}
        rightIcon={<p className="body2 text-gray-50">원</p>}
      />
    </div>
  )
}
