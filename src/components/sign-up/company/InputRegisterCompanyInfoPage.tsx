import { Dispatch, SetStateAction } from 'react'
import { CompanySignUpPageStepType } from '@/type/sign-up'
import Header from '@/components/common/Header'
import Button1 from '@/components/common/Button1'
import TermsOfServiceField from '@/components/sign-up/field/TermsOfServiceField'
import CompanyInfoField from '@/components/sign-up/company/CompanyInfoField'
import EmailField from '@/components/sign-up/field/EmailField'
import PasswordField from '@/components/sign-up/field/PasswordField'
import ProductionServiceField from '@/components/sign-up/field/ProductionServiceField'
import PhoneNumberField from '@/components/sign-up/field/PhoneNumberField'
import BusinessRegistrationUpload from '@/components/sign-up/field/BusinessRegistrationUpload'
import BankbookCopyUpload from '@/components/sign-up/field/BankbookCopyUpload'
import CompanyIntroUpload from '@/components/sign-up/field/CompanyIntroUpload'
import RepresentativeNameField from '@/components/sign-up/field/RepresentativeNameField'

interface InputRegisterCompanyInfoPageProps {
  setStep: Dispatch<SetStateAction<CompanySignUpPageStepType>>
}
export default function InputRegisterCompanyInfoPage({ setStep }: InputRegisterCompanyInfoPageProps) {
  return (
    <div className="flex flex-col items-center justify-center">
      <Header headerType={'SIGNUP'} />
      <div className="mt-[200px] flex w-[600px] flex-col items-center gap-y-[40px]">
        <h2 className="h2">기업 회원정보 입력</h2>
        <div className="gap-y-2xs flex w-full flex-col">
          <CompanyInfoField setStep={setStep} />
          <ProductionServiceField />
          <EmailField />
          <PasswordField />
          <PhoneNumberField />
          <BusinessRegistrationUpload />
          <BankbookCopyUpload />
          <CompanyIntroUpload />
          <RepresentativeNameField />
        </div>
        <div className="gap-y-3xs flex w-full flex-col">
          <TermsOfServiceField />
          <Button1 styleSize="lg" styleType="primary" customClassName="w-full" onClick={() => {}}>
            회원가입
          </Button1>
        </div>
      </div>
    </div>
  )
}
