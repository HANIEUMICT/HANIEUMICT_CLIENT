import { useAuthStore } from '@/store/authStore'
import Input from '@/components/common/Input'
import { formatPhoneNumber } from '@/utils/common'

export default function CompanyMemberPhoneNumber() {
  const companySignUpData = useAuthStore((state) => state.companySignUpData)
  const setState = useAuthStore((state) => state.setState)

  const handlePhoneNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatPhoneNumber(e.target.value)
    setState({
      ...companySignUpData,
      companySignUpData: { ...companySignUpData, phoneNumber: formatted },
    })
  }

  return (
    <div className="gap-y-4xs flex flex-col">
      <section className="gap-x-5xs sub2 flex">
        전화번호 <span className="text-conic-red-30">*</span>
      </section>
      <section className="gap-x-4xs flex">
        <Input
          value={companySignUpData?.phoneNumber ?? ''}
          onChange={handlePhoneNumberChange}
          inputBoxStyle={'default'}
          placeholder={`전화번호를 입력해주세요.`}
          customClassName={'w-full'}
        />
      </section>
    </div>
  )
}
