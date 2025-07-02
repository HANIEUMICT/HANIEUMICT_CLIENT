import { useState } from 'react'
import SearchCompanyInfoPage from '@/components/sign-up/company/SearchCompanyInfoPage'
import InputCompanyInfoPage from '@/components/sign-up/company/InputCompanyInfoPage'

type StepType = 'SearchCompanyInfoPage' | 'InputCompanyInfoPage'

export default function CompanySignUpPage() {
  const [step, setStep] = useState<StepType>('InputCompanyInfoPage')
  return (
    <main>
      {step === 'SearchCompanyInfoPage' && <SearchCompanyInfoPage setStep={setStep} />}
      {step === 'InputCompanyInfoPage' && <InputCompanyInfoPage setStep={setStep} />}
    </main>
  )
}
