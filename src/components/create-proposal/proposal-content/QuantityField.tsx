import Input from '@/components/common/Input'

interface QuantityFieldProps {
  value: number
  onChange: (value: any) => void
}
export default function QuantityField({ value, onChange }: QuantityFieldProps) {
  return (
    <div className="gap-y-4xs flex flex-col">
      <p className="sub2">수량</p>
      <Input
        onChange={(e) => onChange(parseInt(e.target.value))}
        inputBoxStyle={'default'}
        value={value}
        type={'number'}
        placeholder={'수량을 입력해주세요.'}
        rightIcon={<p className="body2 text-gray-50">개</p>}
      />
    </div>
  )
}
