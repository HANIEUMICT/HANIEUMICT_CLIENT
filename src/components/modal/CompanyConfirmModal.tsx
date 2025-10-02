import Modal from '@/components/common/Modal'
import Button1 from '@/components/common/Button1'
import { Dispatch, SetStateAction } from 'react'
import { CompanySignUpPageStepType } from '@/type/auth'
import { useAuthStore } from '@/store/authStore'

interface CompanyConfirmModalProps {
  setIsModalOpen: Dispatch<SetStateAction<boolean>>
  setStep: Dispatch<SetStateAction<CompanySignUpPageStepType>>
}

export default function CompanyConfirmModal({ setIsModalOpen, setStep }: CompanyConfirmModalProps) {
  const summaryCompanyInfoData = useAuthStore((state) => state.summaryCompanyInfoData)
  return (
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
            <h3 className="h3">{summaryCompanyInfoData?.name}</h3>
            <div className="gap-x-4xs button-lg flex">
              <p className="text-gray-50">{summaryCompanyInfoData?.owner}</p>
              <p className="text-gray-30">|</p>
              <p className="text-gray-50">{summaryCompanyInfoData?.registrationNumber}</p>
              <p className="text-gray-30">|</p>
              <p className="text-gray-50">
                {summaryCompanyInfoData?.addressRegisterRequest?.streetAddress}{' '}
                {summaryCompanyInfoData?.addressRegisterRequest?.detailAddress}
              </p>
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
              setStep('CompanyMemberSignUpPage')
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
  )
}
