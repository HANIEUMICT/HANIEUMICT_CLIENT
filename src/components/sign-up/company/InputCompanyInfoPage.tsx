import Header from '@/components/common/Header'
import EmailField from '@/components/sign-up/EmailField'
import PasswordField from '@/components/sign-up/PasswordField'
import AddressField from '@/components/sign-up/AddressField'
import TermsOfServiceField from '@/components/sign-up/TermsOfServiceField'
import Button1 from '@/components/common/Button1'
import CompanyInfoField from '@/components/sign-up/company/CompanyInfoField'
import { Dispatch, SetStateAction } from 'react'
import PhoneNumberField from '@/components/sign-up/PhoneNumberField'

interface InputCompanyInfoPageProps {
  setStep: Dispatch<SetStateAction<'SearchCompanyInfoPage' | 'InputCompanyInfoPage'>>
}

export default function InputCompanyInfoPage({ setStep }: InputCompanyInfoPageProps) {
  return (
    <div className="flex flex-col items-center justify-center">
      <Header />
      <div className="mt-[200px] flex w-[600px] flex-col items-center justify-center">
        <section className="gap-y-2xs flex flex-col items-center">
          <h2 className="h2">회원가입 유형</h2>
          <div className="flex rounded-[12px] bg-white">
            <Button1 onClick={() => {}} styleType={'ghost'} styleSize={'md'} customClassName="h-[48px] w-[120px]">
              개인회원
            </Button1>
            <Button1 onClick={() => {}} styleType={'secondary'} styleSize={'md'} customClassName="h-[48px] w-[120px]">
              기업회원
            </Button1>
          </div>
        </section>
        <section className="gap-y-2xs my-[40px] flex w-full flex-col">
          <CompanyInfoField setStep={setStep} />
          <EmailField />
          <PasswordField />
          <PhoneNumberField />
          <AddressField />
        </section>
        <TermsOfServiceField />
        <Button1 styleSize="lg" styleType="primary" customClassName="mt-3xs w-full mb-[252px]" onClick={() => {}}>
          회원가입
        </Button1>
      </div>
    </div>
  )
}
