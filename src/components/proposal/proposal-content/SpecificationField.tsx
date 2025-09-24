import Input from '@/components/common/Input'

export default function SpecificationField() {
  return (
    <div className="gap-y-4xs flex flex-col">
      <p className="sub2">규격</p>
      <Input inputBoxStyle={'default'} value={''} placeholder={'규격을 입력해주세요.'} />
    </div>
  )
}
