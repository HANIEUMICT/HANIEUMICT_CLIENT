import Input from '@/components/common/Input'
import { useAuthStore } from '@/store/authStore'
import { formatPhoneNumber } from '@/utils/common'

export default function RepresentativePhoneNumberField() {
  const registerCompanyInfoData = useAuthStore((state) => state.registerCompanyInfoData)
  const setState = useAuthStore((state) => state.setState)

  const handlePhoneNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatPhoneNumber(e.target.value)
    setState({
      ...registerCompanyInfoData,
      registerCompanyInfoData: { ...registerCompanyInfoData, phoneNumber: formatted },
    })
  }

  return (
    <div className="gap-y-4xs flex flex-col">
      <section className="gap-x-5xs sub2 flex">
        대표자 전화번호 <span className="text-conic-red-30">*</span>
      </section>
      <Input
        value={registerCompanyInfoData?.phoneNumber ?? ''}
        inputBoxStyle={'default'}
        placeholder={'전화번호를 입력해주세요.'}
        customClassName={'w-full'}
        onChange={handlePhoneNumberChange}
      />
    </div>
  )
}
