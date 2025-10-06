import Input from '@/components/common/Input'

interface BusinessAddressFieldProps {
  address: { zipCode: string; road: string; detail: string } | undefined
}

export default function BusinessAddressField({ address }: BusinessAddressFieldProps) {
  return (
    <div className="gap-y-4xs flex flex-col">
      <p className="sub2">소재지</p>
      <Input
        inputBoxStyle={'disabled'}
        value={`${address?.road} ${address?.detail} `}
        placeholder={'소재지를 입력해주세요.'}
      />
    </div>
  )
}
