import Input from '@/components/common/Input'
import Button1 from '@/components/common/Button1'
import { useAuthStore } from '@/store/authStore'
import { ChangeEvent } from 'react'

export default function IndividualPhoneNumberField() {
  const individualSignUpData = useAuthStore((state) => state.individualSignUpData)
  const setState = useAuthStore((state) => state.setState)
  return (
    <div className="gap-y-4xs flex flex-col">
      <section className="gap-x-5xs sub2 flex">
        전화번호 <span className="text-conic-red-30">*</span>
      </section>
      <section className="gap-x-4xs flex">
        <Input
          value={individualSignUpData?.phoneNumber ?? ''}
          onChange={(e: ChangeEvent<HTMLInputElement>) => {
            setState({
              ...individualSignUpData,
              individualSignUpData: { ...individualSignUpData, phoneNumber: e.target.value },
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
