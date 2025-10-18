import Input from '@/components/common/Input'

interface BusinessAddressFieldProps {
  address:
    | { postal: string; street: string; detail: string; addressName: string; recipient: string; phoneNumber: string }
    | undefined
}

export default function BusinessAddressField({ address }: BusinessAddressFieldProps) {
  return (
    <div className="gap-y-4xs flex flex-col">
      <p className="sub2">소재지</p>
      <Input
        inputBoxStyle={'disabled'}
        value={`${address?.street} ${address?.detail} `}
        placeholder={'소재지를 입력해주세요.'}
      />
    </div>
  )
}
