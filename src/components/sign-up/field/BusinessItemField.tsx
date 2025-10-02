import Input from '@/components/common/Input'
import { useAuthStore } from '@/store/authStore'

export default function BusinessItemField() {
  const registerCompanyInfoData = useAuthStore((state) => state.registerCompanyInfoData)
  const setState = useAuthStore((state) => state.setState)
  return (
    <div className="gap-y-4xs flex flex-col">
      <section className="gap-x-5xs sub2 flex">
        종목 <span className="text-conic-red-30">*</span>
      </section>
      <Input
        value={registerCompanyInfoData?.industry ?? ''}
        inputBoxStyle={'default'}
        placeholder={'종목명을 입력해주세요.'}
        customClassName={'w-full'}
        onChange={(e) => {
          setState({
            registerCompanyInfoData: {
              ...registerCompanyInfoData,
              industry: e.target.value,
            },
          })
        }}
      ></Input>
    </div>
  )
}
