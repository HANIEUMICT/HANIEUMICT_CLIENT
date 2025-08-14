import Input from '@/components/common/Input'

export default function RepresentativeNameField() {
  return (
    <div className="gap-y-4xs flex flex-col">
      <p className="sub2">대표자명</p>
      <Input inputBoxStyle={'default'} value={''} placeholder={'대표자명을 입력해주세요.'} />
    </div>
  )
}
