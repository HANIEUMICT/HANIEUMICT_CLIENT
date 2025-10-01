import { Dispatch, SetStateAction, useState } from 'react'
import { useRouter } from 'next/navigation'

import Header from '@/components/common/Header'
import IndividualEmailField from '@/components/sign-up/field/IndividualEmailField'
import IndividualPasswordField from '@/components/sign-up/field/IndividualPasswordField'
import IndividualAddressField from '@/components/sign-up/field/IndividualAddressField'
import TermsOfServiceField from '@/components/sign-up/field/TermsOfServiceField'
import Button1 from '@/components/common/Button1'
import CompanyInfoField from '@/components/sign-up/company/CompanyInfoField'
import IndividualPhoneNumberField from '@/components/sign-up/field/IndividualPhoneNumberField'
import Modal from '@/components/common/Modal'
import Image from 'next/image'
import { CompanySignUpPageStepType } from '@/type/auth'

interface InputCompanyInfoPageProps {
  setStep: Dispatch<SetStateAction<CompanySignUpPageStepType>>
}

export default function InputCompanyInfoPage({ setStep }: InputCompanyInfoPageProps) {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const router = useRouter()
  return (
    <div className="flex flex-col items-center justify-center">
      {isModalOpen ? (
        <Modal>
          <Modal.Content>
            <div className="flex flex-col">
              <div className="gap-y-4xs flex flex-col">
                <h2 className="h2">
                  환영합니다!
                  <br />
                  <span className={'text-conic-red-30'}>(주) 디디브로스의 기업 회원(멤버)</span>
                  으로
                  <br />
                  등록신청이 완료되었습니다.
                </h2>
                <p className="body1 text-gray-50">기업의 대표 회원 승인 시 멤버 회원으로 활동할 수 있게 됩니다.</p>
              </div>
              <div className="mt-[24px] flex w-full items-center justify-center">
                <Image src={'/success-graphic.svg'} width={336} height={240} alt={'회원가입 성공'} />
              </div>
            </div>
          </Modal.Content>
          <Modal.BottomButton>
            <Button1
              onClick={() => {
                setIsModalOpen(false)
                router.push('/')
              }}
              styleType={'outline'}
              styleSize={'lg'}
            >
              닫기
            </Button1>
          </Modal.BottomButton>
        </Modal>
      ) : null}
      <Header headerType={'SIGNUP'} />
      <div className="mt-[200px] flex w-[600px] flex-col items-center justify-center">
        <section className="gap-y-2xs flex flex-col items-center">
          <h2 className="h2">회원가입 유형</h2>
          <div className="flex rounded-[12px] bg-white">
            <Button1 onClick={() => {}} styleType={'ghost'} styleSize={'md'} customClassName="h-[48px] w-[120px]">
              개인회원
            </Button1>
            <Button1 onClick={() => {}} styleType={'secondary'} styleSize={'md'} customClassName="h-[48px] w-[120px]">
              기업회원
            </Button1>
          </div>
        </section>
        <section className="gap-y-2xs my-[40px] flex w-full flex-col">
          <CompanyInfoField setStep={setStep} />
          <IndividualEmailField />
          <IndividualPasswordField />
          <IndividualPhoneNumberField />
          <IndividualAddressField />
        </section>
        <TermsOfServiceField />
        <Button1
          styleSize="lg"
          styleType="primary"
          customClassName="mt-3xs w-full mb-[252px]"
          onClick={() => {
            setIsModalOpen(true)
          }}
        >
          회원가입
        </Button1>
      </div>
    </div>
  )
}
