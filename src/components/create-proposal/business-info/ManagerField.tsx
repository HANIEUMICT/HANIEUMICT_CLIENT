import Input from '@/components/common/Input'

export default function ManagerField() {
  return (
    <div className="gap-y-4xs flex flex-col">
      <p className="sub2">담당자명</p>
      <Input inputBoxStyle={'default'} value={''} placeholder={'담당자명을 입력해주세요.'} />
    </div>
  )
}
