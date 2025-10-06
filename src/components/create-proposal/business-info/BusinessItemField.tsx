import Input from '@/components/common/Input'
interface BusinessItemFieldProps {
  industry: string | undefined
}

export default function BusinessItemField({ industry }: BusinessItemFieldProps) {
  return (
    <div className="gap-y-4xs flex flex-col">
      <p className="sub2">종목</p>
      <Input inputBoxStyle={'disabled'} value={industry ?? ''} placeholder={'종목을 입력해주세요.'} />
    </div>
  )
}
