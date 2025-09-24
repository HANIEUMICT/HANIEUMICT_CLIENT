import Input from '@/components/common/Input'

export default function BusinessTypeField() {
  return (
    <div className="gap-y-4xs flex flex-col">
      <p className="sub2">업태</p>
      <Input inputBoxStyle={'default'} value={''} placeholder={'업태명을 입력해주세요.'} />
    </div>
  )
}
