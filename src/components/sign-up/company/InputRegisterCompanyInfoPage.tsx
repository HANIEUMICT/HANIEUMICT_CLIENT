import { Dispatch, SetStateAction } from 'react'
import { CompanySignUpPageStepType } from '@/type/auth'
import Header from '@/components/common/Header'
import Button1 from '@/components/common/Button1'
import TermsOfServiceField from '@/components/sign-up/field/TermsOfServiceField'
import CompanyInfoField from '@/components/sign-up/company/CompanyInfoField'
import EmailField from '@/components/sign-up/field/EmailField'
import PasswordField from '@/components/sign-up/field/PasswordField'
import ProductionServiceField from '@/components/sign-up/field/ProductionServiceField'
import PhoneNumberField from '@/components/sign-up/field/PhoneNumberField'
import BusinessRegistrationUpload from '@/components/sign-up/field/BusinessRegistrationUpload'
import BankbookCopyUpload from '@/components/sign-up/field/BankbookCopyUpload'
import CompanyIntroUpload from '@/components/sign-up/field/CompanyIntroUpload'
import RepresentativeNameField from '@/components/sign-up/field/RepresentativeNameField'
import RepresentativeEmailField from '@/components/sign-up/field/RepresentativeEmailField'
import RepresentativePhoneNumberField from '@/components/sign-up/field/RepresentativePhoneNumberField'
import Modal from '@/components/common/Modal'
import { CancelIcon } from '@/assets/svgComponents'

interface InputRegisterCompanyInfoPageProps {
  setStep: Dispatch<SetStateAction<CompanySignUpPageStepType>>
}
export default function InputRegisterCompanyInfoPage({ setStep }: InputRegisterCompanyInfoPageProps) {
  return (
    <div className="flex flex-col items-center justify-center">
      {/* 제조 서비스 유형 선택 모달 */}
      {/*<Modal>*/}
      {/*  <Modal.Content>*/}
      {/*    <div className="gap-y-s flex flex-col">*/}
      {/*      <section className="gap-y-4xs flex flex-col">*/}
      {/*        <p className="h2">제조 서비스 유형 선택</p>*/}
      {/*        <div className="flex flex-wrap gap-2">*/}
      {/*          {[*/}
      {/*            '원스톱 제품 개발',*/}
      {/*            '기구설계',*/}
      {/*            '디자인',*/}
      {/*            '3D 프린팅',*/}
      {/*            'SW 개발 / IT 서비스',*/}
      {/*            'SW 개발 / IT 서비',*/}
      {/*          ].map((item) => {*/}
      {/*            return (*/}
      {/*              <Button1*/}
      {/*                onClick={() => {}}*/}
      {/*                key={item}*/}
      {/*                styleSize={'md'}*/}
      {/*                styleStatus={'selected'}*/}
      {/*                styleType={'outline'}*/}
      {/*                customClassName={'h-[48px]'}*/}
      {/*                rightIcon={<CancelIcon width={12} height={12} />}*/}
      {/*              >*/}
      {/*                {item}*/}
      {/*              </Button1>*/}
      {/*            )*/}
      {/*          })}*/}
      {/*        </div>*/}
      {/*      </section>*/}
      {/*      <section>*/}
      {/*        <div className="grid grid-cols-3 gap-2">*/}
      {/*          {['원스톱 제품 개발', '기구설계', '디자인', '3D 프린팅', 'SW 개발 / IT 서비스'].map((item) => {*/}
      {/*            return (*/}
      {/*              <Button1*/}
      {/*                onClick={() => {}}*/}
      {/*                key={item}*/}
      {/*                styleSize={'md'}*/}
      {/*                styleType={'outline'}*/}
      {/*                customClassName={'h-[48px] w-[168px]'}*/}
      {/*              >*/}
      {/*                {item}*/}
      {/*              </Button1>*/}
      {/*            )*/}
      {/*          })}*/}
      {/*        </div>*/}
      {/*      </section>*/}
      {/*    </div>*/}
      {/*  </Modal.Content>*/}
      {/*  <Modal.BottomButton>*/}
      {/*    <div className="flex gap-x-3">*/}
      {/*      <Button1 styleSize={'lg'} styleType={'outline'} onClick={() => {}} customClassName={'w-[160px]'}>*/}
      {/*        닫기*/}
      {/*      </Button1>*/}
      {/*      <Button1 styleSize={'lg'} styleType={'primary'} onClick={() => {}} customClassName={'w-full'}>*/}
      {/*        적용하기*/}
      {/*      </Button1>*/}
      {/*    </div>*/}
      {/*  </Modal.BottomButton>*/}
      {/*</Modal>*/}

      {/* 회원가입 완료 모달 */}
      {/*<Modal>*/}
      {/*  <Modal.Content>*/}
      {/*    <></>*/}
      {/*  </Modal.Content>*/}
      {/*  <Modal.BottomButton>*/}
      {/*    <></>*/}
      {/*  </Modal.BottomButton>*/}
      {/*</Modal>*/}

      <Header headerType={'SIGNUP'} />
      <div className="mt-[200px] flex w-[600px] flex-col items-center gap-y-[40px]">
        <h2 className="h2">기업 회원정보 입력</h2>
        <div className="gap-y-2xs flex w-full flex-col">
          <CompanyInfoField setStep={setStep} />
          <ProductionServiceField />
          <EmailField />
          <PasswordField />
          <PhoneNumberField />
          <BusinessRegistrationUpload />
          <BankbookCopyUpload />
          <CompanyIntroUpload />
          <RepresentativeNameField />
          <RepresentativeEmailField />
          <RepresentativePhoneNumberField />
        </div>
        <div className="gap-y-3xs flex w-full flex-col">
          <TermsOfServiceField />
          <Button1 styleSize="lg" styleType="primary" customClassName="w-full" onClick={() => {}}>
            회원가입
          </Button1>
        </div>
      </div>
    </div>
  )
}
