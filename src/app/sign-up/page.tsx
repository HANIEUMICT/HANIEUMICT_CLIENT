'use client'

import { useState } from 'react'
import SelectRole from '@/components/sign-up/SelectRole'
import PersonSignUpPage from '@/components/sign-up/PersonSignUpPage'
import CompanySignUpPage from '@/components/sign-up/CompanySignUpPage'

const SignUpPage = () => {
  const [step, setStep] = useState<'SelectRole' | 'PersonSignUpPage' | 'CompanySignUpPage'>('SelectRole')
  const [selectedRole, setSelectedRole] = useState<'person' | 'company' | undefined>()

  return (
    <main>
      {step === 'SelectRole' && (
        <SelectRole
          onClick={() => {
            if (selectedRole === 'person') {
              setStep('PersonSignUpPage')
            } else {
              setStep('CompanySignUpPage')
            }
          }}
          selectedRole={selectedRole}
          setSelectedRole={setSelectedRole}
        />
      )}
      {step === 'PersonSignUpPage' && <PersonSignUpPage />}
      {step === 'CompanySignUpPage' && <CompanySignUpPage />}
    </main>
  )
}
export default SignUpPage
