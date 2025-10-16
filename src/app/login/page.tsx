'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import Header from '@/components/common/Header'
import Button1 from '@/components/common/Button1'
import Input from '@/components/common/Input'
import { CheckboxFillIcon, EyeIcon, NonEyeIcon, UnCheckboxIcon } from '@/assets/svgComponents'
import { useAuthStore } from '@/store/authStore'
import { postAuthLogin } from '@/lib/auth'
import Cookies from 'js-cookie'
import { useModalStore } from '@/store/modalStore'

export default function LoginPage() {
  const router = useRouter()
  const setState = useAuthStore((state) => state.setState)
  const loginData = useAuthStore((state) => state.loginData)
  const [errorMessage, setErrorMessage] = useState(false)
  // 아이디 저장 체크박스 상태
  const [rememberMe, setRememberMe] = useState(false)
  // 서비스 준비중입니다 모달창
  const setModalState = useModalStore((state) => state.setState)
  // 비밀번호 보기
  const [showPassword, setShowPassword] = useState(false)

  // 컴포넌트 마운트 시 저장된 아이디만 불러오기
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const savedUserId = localStorage.getItem('savedUserId')

      if (savedUserId) {
        setState({
          loginData: {
            ...loginData,
            email: savedUserId,
          },
        })
        setRememberMe(true)
      }
    }
  }, [setState])

  // 아이디 저장 체크박스 토글
  const handleRememberMe = () => {
    setRememberMe(!rememberMe)
  }

  // 아이디만 저장/삭제
  const saveUserId = (save: boolean) => {
    if (typeof window !== 'undefined') {
      if (save && loginData?.email) {
        localStorage.setItem('savedUserId', loginData.email)
      } else {
        localStorage.removeItem('savedUserId')
      }
    }
  }

  // 로그인 처리
  const handleLogin = async () => {
    if (!loginData) return

    try {
      const response = await postAuthLogin(loginData)
      console.log('response', response)
      if (response.result === 'SUCCESS') {
        // 아이디 저장 설정에 따라 아이디만 저장/삭제
        saveUserId(rememberMe)

        if (response.data) {
          Cookies.set('accessToken', response.data.tokenInfo.accessToken)
          Cookies.set('refreshToken', response.data.tokenInfo.accessToken)
          router.push('/')
          console.log(response)

          const userData: {
            memberId: number
            memberName: string
            memberRole: 'INDIVIDUAL' | 'OWNER'
            companyId?: number
          } = {
            memberId: response.data.memberInfo.memberId,
            memberName: response.data.memberInfo.memberName,
            memberRole: response.data.memberInfo.memberRole,
            companyId: response.data.companyId,
          }
          // localStorage 는 브라우저 환경에서만 접근 가능
          if (typeof window !== 'undefined') {
            Cookies.set('userData', JSON.stringify(userData))
            localStorage.setItem('userData', JSON.stringify(userData))
          }
        }
      } else if (response.result === 'ERROR') {
        setErrorMessage(true)
      }
    } catch (error: any) {
      // 네트워크 에러나 예외 발생 시
      setErrorMessage(true)
    }
  }

  return (
    <main className="bg-gray-10 flex min-h-screen items-center justify-center">
      <Header />
      <div className="flex flex-col items-center justify-center">
        <div className="w-[600px]">
          <section className="gap-y-2xs flex flex-col items-center justify-center">
            <h1 className="h2">로그인</h1>
          </section>

          <section className="gap-y-2xs mt-[40px] flex flex-col">
            <section className="gap-y-4xs flex flex-col">
              <h2 className="sub2">이메일</h2>
              <Input
                value={loginData?.email ?? ''}
                onChange={(e) => {
                  setState({
                    loginData: {
                      ...loginData,
                      email: e.target.value,
                    },
                  })
                  setErrorMessage(false)
                }}
                type={'email'}
                inputBoxStyle={'default'}
                placeholder={'이메일을 입력해주세요.'}
              />
            </section>
            <section className="gap-y-4xs flex flex-col">
              <h2 className="sub2">비밀번호</h2>
              <Input
                value={loginData?.password ?? ''}
                onChange={(e) => {
                  setState({
                    loginData: {
                      ...loginData,
                      password: e.target.value,
                    },
                  })
                  setErrorMessage(false)
                }}
                type={showPassword ? 'text' : 'password'}
                inputBoxStyle={'default'}
                placeholder={'비밀번호를 입력해주세요.'}
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
                      width={24}
                      height={24}
                      onClick={() => {
                        setShowPassword(true)
                      }}
                    />
                  )
                }
              />
              {errorMessage && <p className="body1 text-conic-red-40">아이디/비밀번호를 확인해주세요.</p>}
            </section>

            <section className="flex items-center justify-between">
              <div className="gap-x-4xs flex cursor-pointer items-center" onClick={handleRememberMe}>
                {rememberMe ? <CheckboxFillIcon width={24} height={24} /> : <UnCheckboxIcon width={24} height={24} />}
                <p className="button-lg text-gray-50">아이디 저장</p>
              </div>
              <div className="flex items-center justify-center">
                <Button1
                  onClick={() => {
                    setModalState({ isServicePreparingModalOpen: true })
                  }}
                  styleSize={'sm'}
                  styleStatus={'default'}
                  styleType={'ghost'}
                >
                  아이디 찾기
                </Button1>
                <div className="border-gray-30 h-[13.5px] border-r" />
                <Button1
                  onClick={() => {
                    setModalState({ isServicePreparingModalOpen: true })
                  }}
                  styleSize={'sm'}
                  styleStatus={'default'}
                  styleType={'ghost'}
                >
                  비밀번호 찾기
                </Button1>
              </div>
            </section>
          </section>

          <Button1
            styleType={'primary'}
            styleStatus={'hover'}
            styleSize={'lg'}
            onClick={handleLogin}
            customClassName={'mt-[40px] w-full'}
          >
            로그인
          </Button1>

          <section className="mt-l gap-x-3xs flex items-center justify-center">
            <p className="body-sm text-gray-50">아직 Conic의 회원이 아닌가요?</p>
            <Button1
              onClick={() => {
                router.push('/sign-up')
              }}
              styleSize={'sm'}
              styleStatus={'click'}
              styleType={'outline2'}
            >
              회원가입
            </Button1>
          </section>
        </div>
      </div>
    </main>
  )
}
