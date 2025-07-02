'use client'

import Button1 from '@/components/common/Button1'
import Header from '@/components/common/Header'
import { useState } from 'react'
import Input from '@/components/common/Input'
import { UnCheckboxIcon } from '@/assets/svgComponents'
import { useRouter } from 'next/navigation'

export default function Home() {
  const [signupType, setSignupType] = useState<'개인회원' | '기업회원'>('개인회원')
  const router = useRouter()

  return (
    <main className="bg-gray-10 flex min-h-screen items-center justify-center">
      <Header />
      <div className="flex flex-col items-center justify-center">
        <div className="w-[600px]">
          <section className="gap-y-2xs flex flex-col items-center justify-center">
            <h1 className="h2">로그인</h1>
            <div className="rounded-[12px] bg-white">
              <Button1
                onClick={() => {
                  setSignupType('개인회원')
                }}
                styleType={signupType === '개인회원' ? 'secondary' : 'ghost'}
                styleStatus={'click'}
                styleSize={'md'}
                customClassName="h-[48px] w-[120px]"
              >
                개인회원
              </Button1>
              <Button1
                onClick={() => {
                  setSignupType('기업회원')
                }}
                styleType={signupType === '기업회원' ? 'secondary' : 'ghost'}
                styleStatus={'click'}
                styleSize={'md'}
                customClassName="h-[48px] w-[120px]"
              >
                기업회원
              </Button1>
            </div>
          </section>

          <section className="gap-y-2xs mt-[40px] flex flex-col">
            <section className="gap-y-4xs flex flex-col">
              <h2 className="sub2">이메일</h2>
              <Input type={'email'} inputBoxStyle={'focus'} placeholder={'이메일을 입력해주세요.'} />
              {/*<p className="body1 text-conic-red-40">이메일을 찾을 수 없습니다. 다시 입력해주세요.</p>*/}
            </section>
            <section className="gap-y-4xs flex flex-col">
              <h2 className="sub2">비밀번호</h2>
              <Input type={'password'} inputBoxStyle={'focus'} placeholder={'비밀번호를 입력해주세요.'} />
              {/*<p className="body1 text-conic-red-40">비밀번호가 일치하지 않습니다. 다시 입력해주세요.</p>*/}
            </section>

            <section className="flex justify-between">
              <div className="gap-x-4xs flex cursor-pointer items-center">
                <UnCheckboxIcon width={24} height={24} />
                <p className="button-lg text-gray-50">아이디 저장</p>
              </div>
              <div className="mt-m flex items-center justify-center">
                <Button1 onClick={() => {}} styleSize={'sm'} styleStatus={'default'} styleType={'ghost'}>
                  아이디 찾기
                </Button1>
                <div className="border-gray-30 h-[13.5px] border-r" />
                <Button1 onClick={() => {}} styleSize={'sm'} styleStatus={'default'} styleType={'ghost'}>
                  비밀번호 찾기
                </Button1>
              </div>
            </section>
          </section>

          <Button1
            styleType={'primary'}
            styleStatus={'hover'}
            styleSize={'lg'}
            onClick={() => {}}
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
