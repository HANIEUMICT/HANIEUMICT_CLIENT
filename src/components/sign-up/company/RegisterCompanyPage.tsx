import { Dispatch, SetStateAction, useEffect, useMemo, useRef, useState } from 'react'
import { CompanySignUpPageStepType } from '@/type/auth'
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
import CompanyAddressField from '@/components/sign-up/field/CompanyAddressField'
import { useFileUpload } from '@/hooks/useFileUpload'
import { useAuthStore } from '@/store/authStore'
import SearchAddressModal from '@/components/common/SearchAddressModal'
import { useModalStore } from '@/store/modalStore'
import { postRegisterCompanyInfo } from '@/lib/auth'

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
  const setState = useAuthStore((state) => state.setState)
  const summaryCompanyInfoData = useAuthStore((state) => state.summaryCompanyInfoData)

  const setModalState = useModalStore((state) => state.setState)
  const isSearchAddressModalOpen = useModalStore((state) => state.isSearchAddressModalOpen)

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

  const handleProjectSubmitWithLoading = async () => {
    // 로딩 상태 추가 (컴포넌트 상단에)
    // const [isUploading, setIsUploading] = useState(false)

    try {
      // setIsUploading(true)
      console.log('파일 업로드 시작...')

      // 모든 파일을 병렬로 업로드
      const [logoResult, registrationResult, bankbookResult] = await Promise.all([
        companyLogoFile ? uploadFiles(companyLogoFile) : Promise.resolve({ success: true, uploadedUrls: [''] }),
        businessRegistrationFile
          ? uploadFiles(businessRegistrationFile)
          : Promise.resolve({ success: true, uploadedUrls: [''] }),
        bankbookCopyFile ? uploadFiles(bankbookCopyFile) : Promise.resolve({ success: true, uploadedUrls: [''] }),
      ])

      // 업로드 실패 체크
      const uploadResults = [logoResult, registrationResult, bankbookResult]
      const failedUploads = uploadResults.filter((result) => !result.success)

      if (failedUploads.length > 0) {
        throw new Error(`${failedUploads.length}개의 파일 업로드 실패`)
      }

      const companyLogoUrl = logoResult.uploadedUrls[0] || ''
      const businessRegistrationUrl = registrationResult.uploadedUrls[0] || ''
      const bankbookUrl = bankbookResult.uploadedUrls[0] || ''

      console.log('업로드된 URL:', {
        profileUrl: companyLogoUrl,
        registrationCertificateUrl: businessRegistrationUrl,
        bankbookCopy: bankbookUrl,
      })

      // registerCompanyInfoData 업데이트
      const updatedCompanyData = {
        ...registerCompanyInfoData,
        profileUrl: companyLogoUrl,
        registrationCertificateUrl: businessRegistrationUrl,
        bankbookCopy: bankbookUrl,
      }

      setState({
        registerCompanyInfoData: updatedCompanyData,
      })

      // 기업 등록 API 요청
      console.log('기업 등록 API 요청 중...')
      const res = await postRegisterCompanyInfo(updatedCompanyData)
      console.log('기업 등록 완료:', res)

      // 성공 시 다음 단계로 이동
      setIsModalOpen(true) // 또는 직접 이동: setStep('CompanyMemberSignUpPage')
      setStep('CompanyMemberSignUpPage')
    } catch (error) {
      console.error('파일 업로드 및 기업 등록 실패:', error)
      alert('파일 업로드 또는 기업 등록에 실패했습니다. 다시 시도해주세요.')
    } finally {
      // setIsUploading(false)
    }
  }

  const handleComplete = async (data: any) => {
    let fullAddress = data.address
    let extraAddress = ''

    const { addressType, bname, buildingName, zonecode } = data
    console.log('data', data)

    if (addressType === 'R') {
      if (bname !== '') {
        extraAddress += bname
      }
      if (buildingName !== '') {
        extraAddress += `${extraAddress !== '' && ', '}${buildingName}`
      }
      fullAddress += `${extraAddress !== '' ? ` ${extraAddress}` : ''}`
    }
    setState({
      ...registerCompanyInfoData,
      registerCompanyInfoData: {
        ...registerCompanyInfoData,
        addressRegisterRequest: { postalCode: zonecode, streetAddress: fullAddress },
      },
    })

    setModalState({ isSearchAddressModalOpen: false })
  }

  return (
    <div className="flex flex-col items-center justify-center">
      {isSearchAddressModalOpen && <SearchAddressModal handleComplete={handleComplete} />}
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
              setState({
                summaryCompanyInfoData: {
                  ...summaryCompanyInfoData,
                  name: registerCompanyInfoData?.name,
                  businessType: registerCompanyInfoData?.businessType,
                  owner: registerCompanyInfoData?.owner,
                  registrationNumber: registerCompanyInfoData?.registrationNumber,
                  addressRegisterRequest: registerCompanyInfoData?.addressRegisterRequest,
                },
              })
              handleProjectSubmitWithLoading()
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
