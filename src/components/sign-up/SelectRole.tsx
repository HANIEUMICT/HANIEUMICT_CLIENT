'use client'

import Image from 'next/image'
import Button1 from '@/components/common/Button1'
import { useRouter } from 'next/navigation'
import { useAuthStore } from '@/store/authStore'

interface SelectRoleProps {}

const SelectRole = ({}: SelectRoleProps) => {
  const selectedRole = useAuthStore((state) => state.selectedUserRole)
  const setState = useAuthStore((state) => state.setState)

  const router = useRouter()

  const roleContents: { title: string; type: 'person' | 'company'; img: string }[] = [
    { title: '개인 회원', type: 'person', img: '/person-graphic.svg' },
    { title: '기업 회원', type: 'company', img: '/company-graphic.svg' },
  ]
  return (
    <main className="bg-gray-10 flex min-h-screen flex-col items-center justify-center">
      <h1 className="h2">회원가입 유형</h1>
      <div className="gap-x-s mt-[32px] flex w-[600px]">
        {roleContents.map((roleContent) => {
          return (
            <section
              key={roleContent.title}
              onClick={() => {
                setState({ selectedUserRole: selectedRole === roleContent.type ? undefined : roleContent.type })
              }}
              className="cursor-pointer"
            >
              <button
                className={`border ${selectedRole === roleContent.type ? 'active:border-conic-red-30 border-conic-red-30' : 'border-gray-20'} hover:border-conic-red-20 gap-y-2xs p-m flex flex-col rounded-[24px] bg-white`}
              >
                <div className="gap-y-4xs flex flex-col">
                  <Image src={roleContent.img} alt={roleContent.title} width={220} height={220} />
                  <p className="h3">{roleContent.title}</p>
                </div>
              </button>
            </section>
          )
        })}
      </div>
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
    </main>
  )
}
export default SelectRole
