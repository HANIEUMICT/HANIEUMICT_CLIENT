import Input from '@/components/common/Input'

export default function BusinessAddressField() {
  return (
    <div className="gap-y-4xs flex flex-col">
      <p className="sub2">소재지</p>
      <Input inputBoxStyle={'default'} value={''} placeholder={'소재지를 입력해주세요.'} />
    </div>
  )
}
