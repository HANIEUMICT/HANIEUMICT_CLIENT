import Input from '@/components/common/Input'

export default function UnitPriceField() {
  return (
    <div className="gap-y-4xs flex flex-col">
      <p className="sub2">단가</p>
      <Input
        inputBoxStyle={'default'}
        value={''}
        placeholder={'단가를 입력해주세요.'}
        rightIcon={<p className="body2 text-gray-50">원</p>}
      />
    </div>
  )
}
