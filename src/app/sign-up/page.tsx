'use client'

import { useState } from 'react'
import SelectRole from '@/components/sign-up/SelectRole'
import { useRouter } from 'next/navigation'

const SignUpPage = () => {
  const [selectedRole, setSelectedRole] = useState<'person' | 'company' | undefined>()
  const router = useRouter()
  return (
    <main>
      <SelectRole
        onClick={() => {
          if (selectedRole === 'person') {
            router.push('/sign-up/individual')
          } else {
            router.push('/sign-up/company')
          }
        }}
        selectedRole={selectedRole}
        setSelectedRole={setSelectedRole}
      />
    </main>
  )
}
export default SignUpPage
