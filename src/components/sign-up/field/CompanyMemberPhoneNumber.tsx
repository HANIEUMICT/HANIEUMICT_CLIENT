import { useAuthStore } from '@/store/authStore'
import Input from '@/components/common/Input'
import { ChangeEvent } from 'react'

export default function CompanyMemberPhoneNumber() {
  const companySignUpData = useAuthStore((state) => state.companySignUpData)
  const setState = useAuthStore((state) => state.setState)
  return (
    <div className="gap-y-4xs flex flex-col">
      <section className="gap-x-5xs sub2 flex">
        전화번호 <span className="text-conic-red-30">*</span>
      </section>
      <section className="gap-x-4xs flex">
        <Input
          value={companySignUpData?.phoneNumber ?? ''}
          onChange={(e: ChangeEvent<HTMLInputElement>) => {
            setState({
              ...companySignUpData,
              companySignUpData: { ...companySignUpData, phoneNumber: e.target.value },
            })
          }}
          inputBoxStyle={'default'}
          placeholder={`'-' 제외 입력 `}
          customClassName={'w-full'}
        />
      </section>
    </div>
  )
}
