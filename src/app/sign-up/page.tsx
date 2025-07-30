'use client'

import { useState } from 'react'
import SelectRole from '@/components/sign-up/SelectRole'
import PersonSignUpPage from '@/components/sign-up/PersonSignUpPage'
import CompanySignUpPage from '@/components/sign-up/CompanySignUpPage'
import { useLoadingStore } from '@/store/loadingStore'
import Spinner from '@/components/common/Spinner'
import Modal from '@/components/common/Modal'

const SignUpPage = () => {
  const [step, setStep] = useState<'SelectRole' | 'PersonSignUpPage' | 'CompanySignUpPage'>('SelectRole')
  const [selectedRole, setSelectedRole] = useState<'person' | 'company' | undefined>()
  const sendingEmailCodeLoading = useLoadingStore((state) => state.sendingEmailCodeLoading)

  return (
    <main>
      {sendingEmailCodeLoading && (
        <Modal>
          <Modal.Content>
            <div className="flex flex-col items-center justify-center gap-y-4">
              <div className="flex flex-col items-center justify-center">
                <p className="h2">이메일 전송중입니다. </p>
                <p>잠시만 기다려주세요.</p>
              </div>
              <Spinner />
            </div>
          </Modal.Content>
        </Modal>
      )}
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
