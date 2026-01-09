'use client'

import { useRouter } from 'next/navigation'
import Button1 from '@/components/common/Button1'
import { useAuthStore } from '@/store/authStore'

export default function SelectRoleBottomButtons() {
  const router = useRouter()
  const selectedRole = useAuthStore((state) => state.selectedUserRole)

  return (
    <section className="mt-[40px] flex w-[600px] gap-x-3">
      <Button1
        styleType={'outline'}
        styleSize={'lg'}
        styleStatus={'default'}
        customClassName={'w-full'}
        onClick={() => {
          router.push('/')
        }}
      >
        이전
      </Button1>
      <Button1
        disabled={selectedRole === undefined}
        styleType={'primary'}
        styleSize={'lg'}
        styleStatus={selectedRole === undefined ? 'disabled' : 'default'}
        customClassName={'w-full'}
        onClick={() => {
          if (selectedRole === 'person') {
            router.push('/sign-up/individual')
          } else {
            router.push('/sign-up/company')
          }
        }}
      >
        다음
      </Button1>
    </section>
  )
}
