import { Dispatch, SetStateAction, useState } from 'react'
import { CompanySignUpPageStepType } from '@/type/auth'
import AddressField from '@/components/sign-up/field/AddressField'
import Header from '@/components/common/Header'
import CompanyName from '@/components/sign-up/field/CompanyName'
import BusinessNumber from '@/components/sign-up/field/BusinessNumber'
import RepresentativeNameField from '@/components/sign-up/field/RepresentativeNameField'
import BusinessTypeField from '@/components/sign-up/field/BusinessTypeField'
import BusinessItemField from '@/components/sign-up/field/BusinessItemField'
import Button1 from '@/components/common/Button1'
import Modal from '@/components/common/Modal'

interface RegisterCompanyPageProps {
  setStep: Dispatch<SetStateAction<CompanySignUpPageStepType>>
}
export default function RegisterCompanyPage({ setStep }: RegisterCompanyPageProps) {
  const [isModalOpen, setIsModalOpen] = useState(true)
  return (
    <div className="flex flex-col items-center justify-center">
      {isModalOpen ? (
        <Modal>
          <Modal.Content>
            <div className="gap-y-s flex flex-col">
              <section className="flex flex-col gap-y-2">
                <h2 className="h2">
                  이 기업 정보로 <br />
                  <span className="text-conic-red-30">기업 회원(멤버) 가입</span>을 시작할까요?
                </h2>
                <p className="body1 text-gray-50">등록 전, 기업 정보가 정확한지 확인해주세요.</p>
              </section>
              <section className="gap-y-4xs bg-gray-10 p-2xs flex flex-col rounded-[12px]">
                <h3 className="h3">기업명</h3>
                <div className="gap-x-4xs button-lg flex">
                  <p className="text-gray-50">대표자명</p>
                  <p className="text-gray-30">|</p>
                  <p className="text-gray-50">000-00-00000</p>
                  <p className="text-gray-30">|</p>
                  <p className="text-gray-50">서울특별시 금천구 벚꽃로 298</p>
                </div>
              </section>
            </div>
          </Modal.Content>
          <Modal.BottomButton>
            <div className="flex gap-x-3">
              <Button1
                onClick={() => {
                  setIsModalOpen(false)
                }}
                styleSize="lg"
                styleType="outline"
                customClassName="w-full"
              >
                아니요
              </Button1>
              <Button1
                onClick={() => {
                  setIsModalOpen(false)
                  setStep('InputCompanyInfoPage')
                }}
                styleSize="lg"
                styleType="primary"
                customClassName="w-full"
              >
                가입 진행
              </Button1>
            </div>
          </Modal.BottomButton>
        </Modal>
      ) : null}
      <Header headerType={'SIGNUP'} />
      <div className="mt-[120px] flex w-[600px] flex-col items-center gap-y-[40px]">
        <h2 className="h2">기업 등록하기</h2>
        <div className="gap-y-2xs flex w-full flex-col">
          <CompanyName />
          <RepresentativeNameField />
          <BusinessNumber />
          <BusinessTypeField />
          <BusinessItemField />
          <AddressField />
        </div>
        <div className="flex w-full gap-x-3">
          <Button1
            onClick={() => {}}
            styleSize={'lg'}
            styleType={'outline'}
            styleStatus={'default'}
            customClassName={'w-full'}
          >
            이전
          </Button1>
          <Button1
            onClick={() => {
              setStep('InputRegisterCompanyInfoPage')
            }}
            styleSize={'lg'}
            styleType={'primary'}
            styleStatus={'default'}
            customClassName={'w-full'}
          >
            다음
          </Button1>
        </div>
      </div>
    </div>
  )
}
