import Input from '@/components/common/Input'
import { useAuthStore } from '@/store/authStore'

export default function CompanyName() {
  const registerCompanyInfoData = useAuthStore((state) => state.registerCompanyInfoData)
  const setState = useAuthStore((state) => state.setState)

  return (
    <div className="gap-y-4xs flex flex-col">
      <section className="gap-x-5xs sub2 flex">
        회사명 <span className="text-conic-red-30">*</span>
      </section>
      <Input
        value={registerCompanyInfoData?.name ?? ''}
        inputBoxStyle={'default'}
        placeholder={'회사명을 입력해주세요.'}
        customClassName={'w-full'}
        onChange={(e) => {
          setState({
            registerCompanyInfoData: {
              ...registerCompanyInfoData,
              name: e.target.value,
            },
          })
        }}
      />
    </div>
  )
}
