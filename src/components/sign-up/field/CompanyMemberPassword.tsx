import Input from '@/components/common/Input'
import { useAuthStore } from '@/store/authStore'
import { ChangeEvent, useEffect, useState } from 'react'
import NonEyeIcon from '@/assets/svgComponents/NonEyeIcon'
import EyeIcon from '@/assets/svgComponents/EyeIcon'

export default function CompanyMemberPassword() {
  const companySignUpData = useAuthStore((state) => state.companySignUpData)
  const setState = useAuthStore((state) => state.setState)
  const isCompanyPasswordMatch = useAuthStore((state) => state.isCompanyPasswordMatch)
  const isCompanyPasswordValid = useAuthStore((state) => state.isCompanyPasswordValid)
  const checkCompanyPassWord = useAuthStore((state) => state.checkCompanyPassWord)

  const [showPassword, setShowPassword] = useState(false)
  const [showCheckPassword, setShowCheckPassword] = useState(false)

  //비밀번호 문구
  useEffect(() => {
    if (companySignUpData) {
      if (companySignUpData.password === undefined) {
        setState({ isCompanyPasswordValid: undefined })
        return
      }
      // 정규식을 사용하여 대소문자, 숫자, 기호, 길이 검증
      const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,15}$/

      if (!passwordRegex.test(companySignUpData.password)) {
        setState({ isCompanyPasswordValid: false })
      } else {
        setState({ isCompanyPasswordValid: true })
      }
    }
  }, [companySignUpData?.password])

  //비밀번호 확인 문구
  useEffect(() => {
    if (companySignUpData === undefined) {
      setState({ isCompanyPasswordMatch: undefined })
      return
    }
    if (checkCompanyPassWord === companySignUpData?.password) {
      setState({ isCompanyPasswordMatch: true })
    } else {
      setState({ isCompanyPasswordMatch: false })
    }
  }, [checkCompanyPassWord])

  return (
    <div className="gap-y-4xs flex flex-col">
      <section className="gap-x-5xs sub2 flex">
        비밀번호 <span className="text-conic-red-30">*</span>
      </section>
      <section className="gap-y-4xs flex flex-col">
        <Input
          value={companySignUpData?.password ?? ''}
          onChange={(e: ChangeEvent<HTMLInputElement>) => {
            setState({
              ...companySignUpData,
              companySignUpData: { ...companySignUpData, password: e.target.value },
            })
          }}
          inputBoxStyle={
            isCompanyPasswordValid !== undefined ? (isCompanyPasswordValid ? 'default' : 'error') : 'default'
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
        {isCompanyPasswordValid !== undefined ? (
          <div className="badge-md">
            {isCompanyPasswordValid ? null : (
              <p className="text-conic-red-40">비밀번호는 대소문자, 숫자, 기호 포함 8~15자를 만족해야 합니다.</p>
            )}
          </div>
        ) : null}
        {isCompanyPasswordValid ? (
          <div>
            <Input
              value={checkCompanyPassWord ?? ''}
              onChange={(e: ChangeEvent<HTMLInputElement>) => {
                setState({ checkCompanyPassWord: e.target.value })
              }}
              inputBoxStyle={
                isCompanyPasswordMatch !== undefined ? (isCompanyPasswordMatch ? 'default' : 'error') : 'default'
              }
              type={showCheckPassword ? 'text' : 'password'}
              placeholder={'비밀번호 확인'}
              customClassName={'w-full'}
              rightIcon={
                showCheckPassword ? (
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
            {isCompanyPasswordMatch !== undefined ? (
              <div className="badge-md">
                {isCompanyPasswordMatch ? null : <p className="text-conic-red-40">비밀번호가 일치하지 않습니다.</p>}
              </div>
            ) : null}
          </div>
        ) : null}
      </section>
    </div>
  )
}
