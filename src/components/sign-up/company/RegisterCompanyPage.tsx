import { Dispatch, SetStateAction, useEffect, useMemo, useRef, useState } from 'react'
import { CompanySignUpPageStepType } from '@/type/auth'
import IndividualAddressField from '@/components/sign-up/field/IndividualAddressField'
import Header from '@/components/common/Header'
import CompanyName from '@/components/sign-up/field/CompanyName'
import BusinessNumber from '@/components/sign-up/field/BusinessNumber'
import RepresentativeNameField from '@/components/sign-up/field/RepresentativeNameField'
import BusinessTypeField from '@/components/sign-up/field/BusinessTypeField'
import BusinessItemField from '@/components/sign-up/field/BusinessItemField'
import Button1 from '@/components/common/Button1'
import Modal from '@/components/common/Modal'
import BankbookCopyUpload from '@/components/sign-up/field/BankbookCopyUpload'
import BusinessRegistrationUpload from '@/components/sign-up/field/BusinessRegistrationUpload'
import RepresentativePhoneNumberField from '@/components/sign-up/field/RepresentativePhoneNumberField'
import RepresentativeEmailField from '@/components/sign-up/field/RepresentativeEmailField'
import CompanyLogoImageUpload from '@/components/sign-up/field/CompanyLogoImageUpload'
import { babel } from '@storybook/nextjs/preset'
import CompanyAddressField from '@/components/sign-up/field/CompanyAddressField'
import { UserDataType } from '@/type/common'
import { postProjectFinal } from '@/lib/project'
import { useFileUpload } from '@/hooks/useFileUpload'
import { useAuthStore } from '@/store/authStore'

interface RegisterCompanyPageProps {
  setStep: Dispatch<SetStateAction<CompanySignUpPageStepType>>
}
export default function RegisterCompanyPage({ setStep }: RegisterCompanyPageProps) {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [userData, setUserData] = useState()
  const companyLogoImageRef = useRef<HTMLInputElement | null>(null)
  const businessRegistrationFileRef = useRef<HTMLInputElement | null>(null)
  const bankbookCopyFileRef = useRef<HTMLInputElement | null>(null)

  const businessRegistrationFile = useAuthStore((state) => state.businessRegistrationFile)
  const bankbookCopyFile = useAuthStore((state) => state.bankbookCopyFile)
  const companyLogoFile = useAuthStore((state) => state.companyLogoFile)

  const registerCompanyInfoData = useAuthStore((state) => state.registerCompanyInfoData)

  // 컴포넌트 내부에서
  const isFormValid = useMemo(() => {
    if (!registerCompanyInfoData) return false

    const {
      name,
      owner,
      email,
      phoneNumber,
      businessType,
      industry,
      registrationNumber,
      registrationCertificateUrl,
      bankbookCopy,
      profileUrl,
      addressRegisterRequest,
    } = registerCompanyInfoData

    // 모든 필드가 존재하고 빈 문자열이 아닌지 확인
    return !!(
      name?.trim() &&
      owner?.trim() &&
      email?.trim() &&
      phoneNumber?.trim() &&
      businessType?.trim() &&
      industry?.trim() &&
      registrationNumber?.trim() &&
      registrationCertificateUrl?.trim() &&
      bankbookCopy?.trim() &&
      profileUrl?.trim() &&
      addressRegisterRequest
    )
  }, [registerCompanyInfoData])

  useEffect(() => {
    console.log('registerCompanyInfoData', registerCompanyInfoData)
  }, [registerCompanyInfoData])

  const { uploadFiles } = useFileUpload()

  // localStorage에서 userData 가져오기 (클라이언트 사이드에서만)

  //
  // const handleProjectSubmit = async () => {
  //   if (!userData?.memberId) {
  //     console.error('사용자 정보가 없습니다.')
  //     return
  //   }
  //   if (!projectId) {
  //     console.error('프로젝트 아이디가 없습니다.')
  //     return
  //   }
  //
  //   try {
  //     // 2. 프로젝트 최종 생성 (finalProjectData가 없을 때만 요청)
  //     if (!finalProjectData) {
  //       const res = await postProjectFinal(projectId, {
  //         ...projectData,
  //         memberId: userData.memberId,
  //         projectBidStatus: 'PRE_BID',
  //       })
  //       console.log('완성된 견적서', res)
  //       setState({ finalProjectData: res.data })
  //       console.log('프로젝트(공고) 생성 완료', res)
  //     } else {
  //       console.log('이미 최종 프로젝트 데이터가 존재합니다. 다시 생성하지 않습니다.')
  //     }
  //
  //     // 3. 파일 업로드 실행
  //     const uploadSuccess = await uploadFiles()
  //
  //     if (uploadSuccess) {
  //       console.log('모든 파일 업로드 완료!')
  //     } else {
  //       console.log('일부 파일 업로드 실패')
  //       // 파일 업로드 실패해도 다음 단계로 진행할지 결정
  //     }
  //
  //     // 4. 다음 단계로 이동
  //     setCurrentStep(6)
  //   } catch (error) {
  //     console.error('프로젝트 생성 및 파일 업로드 실패:', error)
  //   }
  // }

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
          <CompanyLogoImageUpload companyLogoImageRef={companyLogoImageRef} />
          <RepresentativeNameField />
          <RepresentativePhoneNumberField />
          <RepresentativeEmailField />
          <BusinessNumber />
          <BusinessTypeField />
          <BusinessItemField />
          <BusinessRegistrationUpload businessRegistrationFileRef={businessRegistrationFileRef} />
          <BankbookCopyUpload bankbookCopyFileRef={bankbookCopyFileRef} />
          <CompanyAddressField />
        </div>
        <div className="flex w-full gap-x-3 pb-[40px]">
          <Button1
            onClick={() => {
              setStep('SearchCompanyInfoPage')
            }}
            styleSize={'lg'}
            styleType={'outline'}
            styleStatus={'default'}
            customClassName={'w-full'}
          >
            이전
          </Button1>
          <Button1
            onClick={async () => {
              setStep('InputRegisterCompanyInfoPage')
              // const result = await uploadFiles(companyLogoFile)
              // console.log('result', result)
            }}
            // disabled={!isFormValid}
            styleSize={'lg'}
            styleType={'primary'}
            styleStatus={isFormValid ? 'default' : 'disabled'}
            customClassName={'w-full'}
          >
            다음
          </Button1>
        </div>
      </div>
    </div>
  )
}
