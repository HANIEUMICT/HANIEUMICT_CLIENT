import Input from '@/components/common/Input'
import Button1 from '@/components/common/Button1'
import { useAuthStore } from '@/store/authStore'
import { postEmailValidation, postSendEmailCode } from '@/lib/common'
import { useState } from 'react'

export default function EmailField() {
  const individualSignUpData = useAuthStore((state) => state.individualSignUpData)
  const setState = useAuthStore((state) => state.setState)
  const [code, setCode] = useState<string>()

  return (
    <div className="gap-y-4xs flex flex-col">
      <section className="gap-x-5xs sub2 flex">
        이메일 <span className="text-conic-red-30">*</span>
      </section>
      <section className="gap-x-4xs flex">
        <Input
          value={individualSignUpData?.email ?? ''}
          onChange={(e) =>
            setState({
              individualSignUpData: {
                ...individualSignUpData,
                email: e.target.value,
              },
            })
          }
          inputBoxStyle={'default'}
          placeholder={'이메일을 입력해주세요.'}
          customClassName={'w-full'}
        />
        <Button1
          onClick={async () => {
            if (individualSignUpData && individualSignUpData.email) {
              const response = await postSendEmailCode(individualSignUpData.email)
              console.log('response', response)
            }
          }}
          styleSize={'lg'}
          styleStatus={individualSignUpData?.email?.length !== 0 ? 'default' : 'disabled'}
          styleType={'secondary'}
          customClassName={'whitespace-nowrap w-[120px]'}
        >
          인증번호 전송
        </Button1>
      </section>
      <section className="gap-x-4xs flex">
        <Input
          value={code ?? ''}
          onChange={(e) => {
            setCode(e.target.value)
          }}
          inputBoxStyle={'default'}
          placeholder={'인증번호 입력'}
          customClassName={'w-full'}
        />
        <Button1
          onClick={async () => {
            if (individualSignUpData && individualSignUpData.email && code) {
              const response = await postEmailValidation({
                email: individualSignUpData.email,
                authCode: code,
              })
              console.log('response2', response)
            }
          }}
          styleSize={'lg'}
          styleStatus={code?.length === 0 ? 'disabled' : 'default'}
          styleType={'secondary'}
          customClassName={'whitespace-nowrap w-[120px]'}
        >
          인증번호 확인
        </Button1>
      </section>
    </div>
  )
}
