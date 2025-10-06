import Input from '@/components/common/Input'

interface SpecificationFieldProps {
  value: string
  onChange: (value: any) => void
}

export default function SpecificationField({ value, onChange }: SpecificationFieldProps) {
  return (
    <div className="gap-y-4xs flex flex-col">
      <p className="sub2">규격</p>
      <Input
        onChange={(e) => onChange(e.target.value)}
        inputBoxStyle={'default'}
        value={value}
        placeholder={'규격을 입력해주세요.'}
      />
    </div>
  )
}
