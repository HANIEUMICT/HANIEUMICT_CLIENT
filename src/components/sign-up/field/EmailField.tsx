import { useState } from 'react'
import Input from '@/components/common/Input'
import Button1 from '@/components/common/Button1'
import { useAuthStore } from '@/store/authStore'
import { postEmailValidation, postSendEmailCode } from '@/lib/common'
import { useLoadingStore } from '@/store/loadingStore'

export default function EmailField() {
  const individualSignUpData = useAuthStore((state) => state.individualSignUpData)
  const setState = useAuthStore((state) => state.setState)
  const [hasCheckedCode, setHasCheckedCode] = useState(false) //인증번호 확인 필드 생성
  const [isCodeVerified, setIsCodeVerified] = useState<undefined | boolean>(undefined) // 인증번호 인증이 완료되었는지 확인하는 state
  const [code, setCode] = useState<string>()

  // 로딩 상태 추가
  const [isEmailVerificationLoading, setIsEmailVerificationLoading] = useState<boolean>(false)

  return (
    <div className="gap-y-4xs flex flex-col">
      <section className="gap-x-5xs sub2 flex">
        이메일 <span className="text-conic-red-30">*</span>
      </section>
      <section className="gap-x-4xs flex">
        <Input
          value={individualSignUpData?.email ?? ''}
          onChange={(e) => {
            setState({
              individualSignUpData: {
                ...individualSignUpData,
                email: e.target.value,
              },
            })
            setIsCodeVerified(undefined)
          }}
          inputBoxStyle={'default'}
          placeholder={'이메일을 입력해주세요.'}
          customClassName={'w-full'}
        />
        <Button1
          onClick={async () => {
            setIsCodeVerified(undefined)

            if (individualSignUpData && individualSignUpData.email) {
              try {
                // API 호출 전에 로딩 시작
                setIsEmailVerificationLoading(true)
                const response = await postSendEmailCode(individualSignUpData.email)
                console.log('response', response)

                if (response && response.data === '이메일 전송 성공') {
                  setHasCheckedCode(true)
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
          styleStatus={individualSignUpData?.email?.length !== 0 ? 'default' : 'disabled'}
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
              if (individualSignUpData && individualSignUpData.email && code) {
                const response = await postEmailValidation({
                  email: individualSignUpData.email,
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
