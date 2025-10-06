import Input from '@/components/common/Input'

interface RepresentativeNameFieldProps {
  owner: string | undefined
}

export default function RepresentativeNameField({ owner }: RepresentativeNameFieldProps) {
  return (
    <div className="gap-y-4xs flex flex-col">
      <p className="sub2">대표자명</p>
      <Input inputBoxStyle={'disabled'} value={owner ?? ''} placeholder={'대표자명을 입력해주세요.'} />
    </div>
  )
}
