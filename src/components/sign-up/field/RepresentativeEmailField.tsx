import { useState } from 'react'
import Input from '@/components/common/Input'
import Button1 from '@/components/common/Button1'
import { useAuthStore } from '@/store/authStore'
import { postEmailValidation, postSendEmailCode } from '@/lib/common'

export default function RepresentativeEmailField() {
  const registerCompanyInfoData = useAuthStore((state) => state.registerCompanyInfoData)
  const setState = useAuthStore((state) => state.setState)
  const [hasCheckedCode, setHasCheckedCode] = useState(false) //인증번호 확인 필드 생성
  const [isCodeVerified, setIsCodeVerified] = useState<undefined | boolean>(undefined) // 인증번호 인증이 완료되었는지 확인하는 state
  const [code, setCode] = useState<string>()

  // 이메일을 이미 사용중이라면 error
  const [emailDuplicateError, setEmailDuplicateError] = useState<boolean | undefined>(undefined)

  // 로딩 상태 추가
  const [isEmailVerificationLoading, setIsEmailVerificationLoading] = useState<boolean>(false)

  // 이메일 형식 검증 함수
  const validateEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return emailRegex.test(email)
  }

  // 이메일이 유효한지 확인
  const isEmailValid = registerCompanyInfoData?.email && validateEmail(registerCompanyInfoData.email)

  return (
    <div className="gap-y-4xs flex flex-col">
      <section className="gap-x-5xs sub2 flex">
        대표자 이메일 <span className="text-conic-red-30">*</span>
      </section>
      <section className="gap-x-4xs flex">
        <Input
          value={registerCompanyInfoData?.email ?? ''}
          onChange={(e) => {
            setState({
              registerCompanyInfoData: {
                ...registerCompanyInfoData,
                email: e.target.value,
              },
            })
            setIsCodeVerified(undefined)
            setHasCheckedCode(false) // 입력이 변경되면 인증코드 입력창 초기화
            setEmailDuplicateError(undefined) // 입력이 변경되면 이메일 중복 에러 메시지 초기화
          }}
          inputBoxStyle={'default'}
          placeholder={'이메일을 입력해주세요.'}
          customClassName={'w-full'}
        />

        <Button1
          onClick={async () => {
            setIsCodeVerified(undefined)
            setEmailDuplicateError(undefined)
            setCode(undefined)
            if (registerCompanyInfoData && registerCompanyInfoData.email) {
              try {
                // API 호출 전에 로딩 시작
                setIsEmailVerificationLoading(true)
                const response = await postSendEmailCode(registerCompanyInfoData.email)
                console.log('response', response)

                if (response.result === 'SUCCESS') {
                  setHasCheckedCode(true)
                } else if (response.result === 'ERROR') {
                  setEmailDuplicateError(true)
                }
              } catch (error) {
                console.error('이메일 전송 실패:', error)
                // 에러 처리 (토스트 메시지 등)
              } finally {
                // 성공/실패 관계없이 로딩 종료
                setIsEmailVerificationLoading(false)
              }
            }
          }}
          styleSize={'lg'}
          disabled={!isEmailValid}
          styleStatus={isEmailValid ? 'default' : 'disabled'}
          styleType={'secondary'}
          customClassName={'whitespace-nowrap w-[120px]'}
        >
          {isEmailVerificationLoading ? (
            <div className="flex items-center gap-x-2">
              <div className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent"></div>
              <span>전송 중...</span>
            </div>
          ) : (
            '인증번호 전송'
          )}
        </Button1>
      </section>
      {emailDuplicateError ? <p className="body1 text-conic-red-40">이미 사용중인 이메일입니다.</p> : null}
      {hasCheckedCode && !isCodeVerified ? (
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
              if (registerCompanyInfoData && registerCompanyInfoData.email && code) {
                const response = await postEmailValidation({
                  email: registerCompanyInfoData.email,
                  authCode: code,
                })
                console.log('response2', response)
                if (response && response.data) {
                  setIsCodeVerified(true)
                }
              }
            }}
            styleSize={'lg'}
            styleStatus={code?.length !== 6 ? 'disabled' : 'default'}
            styleType={'secondary'}
            customClassName={'whitespace-nowrap w-[120px]'}
          >
            인증번호 확인
          </Button1>
        </section>
      ) : null}
      {isCodeVerified === undefined ? null : isCodeVerified ? (
        <p className="text-conic-blue-30 body1">인증되었습니다.</p>
      ) : (
        <p className="text-conic-red-40 body1">인증코드를 다시 확인해주세요.</p>
      )}
    </div>
  )
}
