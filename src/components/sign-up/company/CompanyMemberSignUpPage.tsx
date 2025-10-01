import { Dispatch, SetStateAction } from 'react'
import { CompanySignUpPageStepType } from '@/type/auth'
import Header from '@/components/common/Header'
import Button1 from '@/components/common/Button1'
import TermsOfServiceField from '@/components/sign-up/field/TermsOfServiceField'
import CompanyInfoField from '@/components/sign-up/company/CompanyInfoField'
import IndividualEmailField from '@/components/sign-up/field/IndividualEmailField'
import IndividualPasswordField from '@/components/sign-up/field/IndividualPasswordField'
import ProductionServiceField from '@/components/sign-up/field/ProductionServiceField'
import IndividualPhoneNumberField from '@/components/sign-up/field/IndividualPhoneNumberField'
import BusinessRegistrationUpload from '@/components/sign-up/field/BusinessRegistrationUpload'
import BankbookCopyUpload from '@/components/sign-up/field/BankbookCopyUpload'
import CompanyIntroUpload from '@/components/sign-up/field/CompanyIntroUpload'
import RepresentativeNameField from '@/components/sign-up/field/RepresentativeNameField'
import RepresentativeEmailField from '@/components/sign-up/field/RepresentativeEmailField'
import RepresentativePhoneNumberField from '@/components/sign-up/field/RepresentativePhoneNumberField'
import Modal from '@/components/common/Modal'
import { CancelIcon } from '@/assets/svgComponents'

interface CompanySignUpPageType {
  setStep: Dispatch<SetStateAction<CompanySignUpPageStepType>>
}
export default function CompanyMemberSignUpPage({ setStep }: CompanySignUpPageType) {
  return (
    <div className="flex flex-col items-center justify-center">
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
          <IndividualEmailField />
          <IndividualPasswordField />
          <IndividualPhoneNumberField />
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
