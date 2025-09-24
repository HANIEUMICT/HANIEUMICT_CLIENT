import Input from '@/components/common/Input'

export default function ProductNameField() {
  return (
    <div className="gap-y-4xs flex flex-col">
      <p className="sub2">품명</p>
      <Input inputBoxStyle={'default'} value={''} placeholder={'품명을 입력해주세요.'} />
    </div>
  )
}
