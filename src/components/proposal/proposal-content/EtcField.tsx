import Input from '@/components/common/Input'

export default function EtcField() {
  return (
    <div className="gap-y-4xs flex flex-col">
      <p className="sub2">비고</p>
      <Input inputBoxStyle={'default'} value={''} placeholder={'비고 사항을 입력해주세요.'} />
    </div>
  )
}
