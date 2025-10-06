import Input from '@/components/common/Input'

interface BusinessTypeFieldProps {
  businessType: string | undefined
}

export default function BusinessTypeField({ businessType }: BusinessTypeFieldProps) {
  return (
    <div className="gap-y-4xs flex flex-col">
      <p className="sub2">업태</p>
      <Input inputBoxStyle={'disabled'} value={businessType ?? ''} placeholder={'업태명을 입력해주세요.'} />
    </div>
  )
}
