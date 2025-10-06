import Input from '@/components/common/Input'

export default function ContactNumberField() {
  return (
    <div className="gap-y-4xs flex flex-col">
      <p className="sub2">연락처</p>
      <Input inputBoxStyle={'default'} value={''} placeholder={'연락처를 입력해주세요.'} />
    </div>
  )
}
