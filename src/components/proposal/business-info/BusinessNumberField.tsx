import Input from '@/components/common/Input'

interface BusinessNumberFieldProps {
  registrationNumber: string | undefined
}

export default function BusinessNumberField({ registrationNumber }: BusinessNumberFieldProps) {
  return (
    <div className="gap-y-4xs flex flex-col">
      <p className="sub2">사업자 번호</p>
      <Input inputBoxStyle={'disabled'} value={registrationNumber ?? ''} placeholder={'사업자 번호를 입력해주세요.'} />
    </div>
  )
}
