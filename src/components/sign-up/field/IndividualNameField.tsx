import Input from '@/components/common/Input'
import { useAuthStore } from '@/store/authStore'

export default function IndividualNameField() {
  const individualSignUpData = useAuthStore((state) => state.individualSignUpData)
  const setState = useAuthStore((state) => state.setState)

  return (
    <div className="gap-y-4xs flex flex-col">
      <section className="gap-x-5xs sub2 flex">
        이름 <span className="text-conic-red-30">*</span>
      </section>
      <section className="gap-x-4xs flex">
        <Input
          value={individualSignUpData?.name ?? ''}
          onChange={(e) => {
            setState({
              individualSignUpData: {
                ...individualSignUpData,
                name: e.target.value,
              },
            })
          }}
          inputBoxStyle={'default'}
          placeholder={'이름을 입력해주세요.'}
          customClassName={'w-full'}
        />
      </section>
    </div>
  )
}
