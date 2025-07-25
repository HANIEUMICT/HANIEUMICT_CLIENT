import Input from '@/components/common/Input'

interface ProductUsageDetailFieldProps {}
export default function ProductUsageDetailField({}: ProductUsageDetailFieldProps) {
  return (
    <div className="gap-y-4xs flex flex-col">
      <p className="sub2">제품 용도 선택</p>
      <Input
        value={''}
        placeholder={'상세 제품 용도를 입력해주세요.'}
        customClassName={'h-[52px]'}
        inputBoxStyle={'default'}
      />
    </div>
  )
}
