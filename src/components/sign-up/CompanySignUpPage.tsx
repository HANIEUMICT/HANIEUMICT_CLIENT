import { useState } from 'react'
import { CompanySignUpPageStepType } from '@/type/auth'
import SearchCompanyInfoPage from '@/components/sign-up/company/SearchCompanyInfoPage'
import InputCompanyInfoPage from '@/components/sign-up/company/InputCompanyInfoPage'
import CompanyMemberSignUpPage from '@/components/sign-up/company/CompanyMemberSignUpPage'
import RegisterCompanyPage from '@/components/sign-up/company/RegisterCompanyPage'

export default function CompanySignUpPage() {
  const [step, setStep] = useState<CompanySignUpPageStepType>('SearchCompanyInfoPage')
  return (
    <main>
      {/* 회사를 이미 등록한 경우 */}
      {step === 'SearchCompanyInfoPage' && <SearchCompanyInfoPage setStep={setStep} />}
      {step === 'InputCompanyInfoPage' && <InputCompanyInfoPage setStep={setStep} />}
      {/* 회사를 이제 막 등록해야 하는 경우 */}
      {step === 'RegisterCompanyPage' && <RegisterCompanyPage setStep={setStep} />}
      {step === 'CompanyMemberSignUpPage' && <CompanyMemberSignUpPage setStep={setStep} />}
    </main>
  )
}
