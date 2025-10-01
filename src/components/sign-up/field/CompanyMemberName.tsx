import Input from '@/components/common/Input'
import { useAuthStore } from '@/store/authStore'

export default function CompanyMemberName() {
  const companySignUpData = useAuthStore((state) => state.companySignUpData)
  const setState = useAuthStore((state) => state.setState)

  return (
    <div className="gap-y-4xs flex flex-col">
      <section className="gap-x-5xs sub2 flex">
        이름 <span className="text-conic-red-30">*</span>
      </section>
      <Input
        value={companySignUpData?.name ?? ''}
        inputBoxStyle={'default'}
        placeholder={'이름을 입력해주세요.'}
        customClassName={'w-full'}
        onChange={(e) => {
          setState({
            companySignUpData: {
              ...companySignUpData,
              name: e.target.value,
            },
          })
        }}
      />
    </div>
  )
}
