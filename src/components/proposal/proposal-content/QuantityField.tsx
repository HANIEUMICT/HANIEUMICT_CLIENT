import Input from '@/components/common/Input'

export default function QuantityField() {
  return (
    <div className="gap-y-4xs flex flex-col">
      <p className="sub2">수량</p>
      <Input
        inputBoxStyle={'default'}
        value={''}
        placeholder={'수량을 입력해주세요.'}
        rightIcon={<p className="body2 text-gray-50">개</p>}
      />
    </div>
  )
}
