import Input from '@/components/common/Input'
import { useAuthStore } from '@/store/authStore'
import { ChangeEvent, useEffect, useState } from 'react'
import NonEyeIcon from '@/assets/svgComponents/NonEyeIcon'
import EyeIcon from '@/assets/svgComponents/EyeIcon'

export default function PasswordField() {
  const individualSignUpData = useAuthStore((state) => state.individualSignUpData)
  const setState = useAuthStore((state) => state.setState)
  const isIndividualPasswordMatch = useAuthStore((state) => state.isIndividualPasswordMatch)
  const isIndividualPasswordValid = useAuthStore((state) => state.isIndividualPasswordValid)
  const checkPassWord = useAuthStore((state) => state.checkPassWord)
  const [showPassword, setShowPassword] = useState(false)
  const [showCheckPassword, setShowCheckPassword] = useState(false)

  //비밀번호 문구
  useEffect(() => {
    if (individualSignUpData) {
      if (individualSignUpData.password === undefined) {
        setState({ isIndividualPasswordValid: undefined })
        return
      }
      // 정규식을 사용하여 대소문자, 숫자, 기호, 길이 검증
      const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,15}$/

      if (!passwordRegex.test(individualSignUpData.password)) {
        setState({ isIndividualPasswordValid: false })
      } else {
        setState({ isIndividualPasswordValid: true })
      }
    }
  }, [individualSignUpData?.password])

  //비밀번호 확인 문구
  useEffect(() => {
    if (individualSignUpData === undefined) {
      setState({ isIndividualPasswordMatch: undefined })
      return
    }
    if (checkPassWord === individualSignUpData?.password) {
      setState({ isIndividualPasswordMatch: true })
    } else {
      setState({ isIndividualPasswordMatch: false })
    }
  }, [checkPassWord])

  return (
    <div className="gap-y-4xs flex flex-col">
      <section className="gap-x-5xs sub2 flex">
        비밀번호 <span className="text-conic-red-30">*</span>
      </section>
      <section className="gap-y-4xs flex flex-col">
        <Input
          value={individualSignUpData?.password ?? ''}
          onChange={(e: ChangeEvent<HTMLInputElement>) => {
            setState({
              ...individualSignUpData,
              individualSignUpData: { ...individualSignUpData, password: e.target.value },
            })
          }}
          inputBoxStyle={
            isIndividualPasswordValid !== undefined ? (isIndividualPasswordValid ? 'default' : 'error') : 'default'
          }
          type={showPassword ? 'text' : 'password'}
          placeholder={'영문, 숫자, 특수문자 조합하여 8-20자.'}
          customClassName={'w-full'}
          rightIcon={
            showPassword ? (
              <NonEyeIcon
                onClick={() => {
                  setShowPassword(false)
                }}
                width={24}
                height={24}
              />
            ) : (
              <EyeIcon
                onClick={() => {
                  setShowPassword(true)
                }}
                width={24}
                height={24}
              />
            )
          }
        />
        {isIndividualPasswordValid !== undefined ? (
          <div className="badge-md">
            {isIndividualPasswordValid ? null : (
              <p className="text-conic-red-40">비밀번호는 대소문자, 숫자, 기호 포함 8~15자를 만족해야 합니다.</p>
            )}
          </div>
        ) : null}
        {isIndividualPasswordValid ? (
          <div>
            <Input
              value={checkPassWord ?? ''}
              onChange={(e: ChangeEvent<HTMLInputElement>) => {
                setState({ checkPassWord: e.target.value })
              }}
              inputBoxStyle={
                isIndividualPasswordMatch !== undefined ? (isIndividualPasswordMatch ? 'default' : 'error') : 'default'
              }
              type={showCheckPassword ? 'text' : 'password'}
              placeholder={'비밀번호 확인'}
              customClassName={'w-full'}
              rightIcon={
                showPassword ? (
                  <NonEyeIcon
                    onClick={() => {
                      setShowCheckPassword(false)
                    }}
                    width={24}
                    height={24}
                  />
                ) : (
                  <EyeIcon
                    onClick={() => {
                      setShowCheckPassword(true)
                    }}
                    width={24}
                    height={24}
                  />
                )
              }
            />
            {isIndividualPasswordMatch !== undefined ? (
              <div className="badge-md">
                {isIndividualPasswordMatch ? null : <p className="text-conic-red-40">비밀번호가 일치하지 않습니다.</p>}
              </div>
            ) : null}
          </div>
        ) : null}
      </section>
    </div>
  )
}
