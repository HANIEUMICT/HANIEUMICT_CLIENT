import Input from '@/components/common/Input'

interface BusinessNameFieldProps {
  name: string | undefined
}

export default function BusinessNameField({ name }: BusinessNameFieldProps) {
  return (
    <div className="gap-y-4xs flex flex-col">
      <p className="sub2">상호</p>
      <Input inputBoxStyle={'disabled'} value={name ?? ''} placeholder={'상호명 입력해주세요.'} />
    </div>
  )
}
