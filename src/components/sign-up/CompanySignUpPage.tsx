import { useState } from 'react'
import { CompanySignUpPageStepType } from '@/type/auth'
import SearchCompanyInfoPage from '@/components/sign-up/company/SearchCompanyInfoPage'
import CompanyMemberSignUpPage from '@/components/sign-up/company/CompanyMemberSignUpPage'
import RegisterCompanyPage from '@/components/sign-up/company/RegisterCompanyPage'

export default function CompanySignUpPage() {
  const [step, setStep] = useState<CompanySignUpPageStepType>('SearchCompanyInfoPage')
  return (
    <main>
      {step === 'SearchCompanyInfoPage' && <SearchCompanyInfoPage setStep={setStep} />}
      {step === 'RegisterCompanyPage' && <RegisterCompanyPage setStep={setStep} />}
      {/* 회원가입 */}
      {step === 'CompanyMemberSignUpPage' && <CompanyMemberSignUpPage setStep={setStep} />}
    </main>
  )
}
