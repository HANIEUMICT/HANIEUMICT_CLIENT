import Input from '@/components/common/Input'

export default function BusinessItemField() {
  return (
    <div className="gap-y-4xs flex flex-col">
      <p className="sub2">종목</p>
      <Input inputBoxStyle={'default'} value={''} placeholder={'종목을 입력해주세요.'} />
    </div>
  )
}
