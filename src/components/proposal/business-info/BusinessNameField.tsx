import Input from '@/components/common/Input'

export default function BusinessNameField() {
  return (
    <div className="gap-y-4xs flex flex-col">
      <p className="sub2">상호</p>
      <Input inputBoxStyle={'default'} value={''} placeholder={'상호명 입력해주세요.'} />
    </div>
  )
}
