import Input from '@/components/common/Input'

interface UnitPriceFieldProps {
  value: number
  onChange: (value: any) => void
}

export default function UnitPriceField({ value, onChange }: UnitPriceFieldProps) {
  return (
    <div className="gap-y-4xs flex flex-col">
      <p className="sub2">단가</p>
      <Input
        onChange={(e) => onChange(parseInt(e.target.value))}
        inputBoxStyle={'default'}
        value={value}
        type={'number'}
        placeholder={'단가를 입력해주세요.'}
        rightIcon={<p className="body2 text-gray-50">원</p>}
      />
    </div>
  )
}
