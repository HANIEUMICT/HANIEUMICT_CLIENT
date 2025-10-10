import Input from '@/components/common/Input'
import { useAuthStore } from '@/store/authStore'
import { formatPhoneNumber } from '@/utils/common'

export default function IndividualPhoneNumberField() {
  const individualSignUpData = useAuthStore((state) => state.individualSignUpData)
  const setState = useAuthStore((state) => state.setState)

  // 전화번호 - 붙여서 format
  const handlePhoneNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatPhoneNumber(e.target.value)
    setState({
      ...individualSignUpData,
      individualSignUpData: { ...individualSignUpData, phoneNumber: formatted },
    })
  }

  return (
    <div className="gap-y-4xs flex flex-col">
      <section className="gap-x-5xs sub2 flex">
        전화번호 <span className="text-conic-red-30">*</span>
      </section>
      <section className="gap-x-4xs flex">
        <Input
          value={individualSignUpData?.phoneNumber ?? ''}
          onChange={handlePhoneNumberChange}
          inputBoxStyle={'default'}
          placeholder={`전화번호를 입력해주세요.`}
          customClassName={'w-full'}
        />
      </section>
    </div>
  )
}
