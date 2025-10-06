import Input from '@/components/common/Input'

interface ProductNameFieldProps {
  value: string
  onChange: (value: any) => void
}

export default function ProductNameField({ value, onChange }: ProductNameFieldProps) {
  return (
    <div className="gap-y-4xs flex flex-col">
      <p className="sub2">품명</p>
      <Input
        onChange={(e) => onChange(e.target.value)}
        inputBoxStyle={'default'}
        value={value}
        placeholder={'품명을 입력해주세요.'}
      />
    </div>
  )
}
