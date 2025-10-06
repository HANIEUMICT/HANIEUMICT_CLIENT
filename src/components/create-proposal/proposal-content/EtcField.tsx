import Input from '@/components/common/Input'

interface EtcFieldProps {
  value: string
  onChange: (value: any) => void
}

export default function EtcField({ value, onChange }: EtcFieldProps) {
  return (
    <div className="gap-y-4xs flex flex-col">
      <p className="sub2">비고</p>
      <Input
        inputBoxStyle={'default'}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={'비고 사항을 입력해주세요.'}
      />
    </div>
  )
}
