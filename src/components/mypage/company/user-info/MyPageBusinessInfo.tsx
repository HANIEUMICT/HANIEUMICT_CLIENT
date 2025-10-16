'use client'

import { CompanyType } from '@/type/company'
import CompanyName from '@/components/sign-up/field/CompanyName'
import CompanyLogoImageUpload from '@/components/sign-up/field/CompanyLogoImageUpload'
import RepresentativeNameField from '@/components/sign-up/field/RepresentativeNameField'
import RepresentativePhoneNumberField from '@/components/sign-up/field/RepresentativePhoneNumberField'
import RepresentativeEmailField from '@/components/sign-up/field/RepresentativeEmailField'
import BusinessNumber from '@/components/sign-up/field/BusinessNumber'
import BusinessTypeField from '@/components/sign-up/field/BusinessTypeField'
import BusinessItemField from '@/components/sign-up/field/BusinessItemField'
import BusinessRegistrationUpload from '@/components/sign-up/field/BusinessRegistrationUpload'
import BankbookCopyUpload from '@/components/sign-up/field/BankbookCopyUpload'
import CompanyAddressField from '@/components/sign-up/field/CompanyAddressField'
import Button1 from '@/components/common/Button1'
import { useFileUpload } from '@/hooks/useFileUpload'
import { postRegisterCompanyInfo } from '@/lib/auth'
import { useRouter } from 'next/navigation'
import { useEffect, useMemo, useRef, useState } from 'react'
import { useAuthStore } from '@/store/authStore'
import { useModalStore } from '@/store/modalStore'
import { AddressRegisterRequestType } from '@/type/common'
import SearchAddressModal from '@/components/common/SearchAddressModal'
import RegisterCompanyAddAddressInfoModal from '@/components/modal/RegisterCompanyAddAddressInfoModal'
import { patchCompanyInfo } from '@/lib/api/client/company'
import { useToast } from '@/provider/ToastProvider'

interface MyPageBasicInfoProps {
  companyInfo: CompanyType | undefined
}
export default function MyPageBusinessInfo({ companyInfo }: MyPageBasicInfoProps) {
  const router = useRouter()
  const [isModalOpen, setIsModalOpen] = useState(false)
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
  const isAddAddressInfoModalOpen = useModalStore((state) => state.isAddAddressInfoModalOpen)

  const { showToast } = useToast()

  const { uploadFiles } = useFileUpload()

  useEffect(() => {
    console.log('companyInfo', companyInfo)
    setState({
      registerCompanyInfoData: {
        ...companyInfo,
        addressRegisterRequest: {
          ...companyInfo?.address,
          detailAddress: companyInfo?.address.detail,
          streetAddress: companyInfo?.address.street,
          postalCode: companyInfo?.address.postal,
        },
      },
    })
    setTempAddressData({
      ...companyInfo?.address,
      detailAddress: companyInfo?.address.detail,
      streetAddress: companyInfo?.address.street,
      postalCode: companyInfo?.address.postal,
    })
  }, [])

  const handleProjectSubmitWithLoading = async () => {
    try {
      console.log('파일 업로드 시작...')

      // 모든 파일을 병렬로 업로드
      const [logoResult, registrationResult, bankbookResult] = await Promise.all([
        companyLogoFile ? uploadFiles(companyLogoFile) : Promise.resolve({ success: true, uploadedUrls: [null] }),
        businessRegistrationFile
          ? uploadFiles(businessRegistrationFile)
          : Promise.resolve({ success: true, uploadedUrls: [null] }),
        bankbookCopyFile ? uploadFiles(bankbookCopyFile) : Promise.resolve({ success: true, uploadedUrls: [null] }),
      ])

      // 업로드 실패 체크
      const uploadResults = [logoResult, registrationResult, bankbookResult]
      const failedUploads = uploadResults.filter((result) => !result.success)

      if (failedUploads.length > 0) {
        throw new Error(`${failedUploads.length}개의 파일 업로드 실패`)
      }

      const companyLogoUrl = logoResult.uploadedUrls[0]
      const businessRegistrationUrl = registrationResult.uploadedUrls[0]
      const bankbookUrl = bankbookResult.uploadedUrls[0]

      console.log('업로드된 URL:', {
        profileUrl: companyLogoUrl,
        registrationCertificateUrl: businessRegistrationUrl,
        bankbookCopy: bankbookUrl,
      })

      // 👇 기존 데이터에서 URL을 가져오고, 새로 업로드된 URL이 있으면 덮어쓰기
      const updatedCompanyData = {
        ...registerCompanyInfoData,
        ...(companyLogoUrl && { profileUrl: companyLogoUrl }),
        ...(businessRegistrationUrl && { registrationCertificateUrl: businessRegistrationUrl }),
        ...(bankbookUrl && { bankbookCopy: bankbookUrl }),
      }

      setState({
        registerCompanyInfoData: updatedCompanyData,
      })

      // 기업 등록 API 요청
      console.log('기업 등록 API 요청 중...')
      const res = await patchCompanyInfo(updatedCompanyData)
      console.log('기업 수정 완료:', res)

      // 성공 시 다음 단계로 이동
      setIsModalOpen(true)
      if (res.result === 'SUCCESS') {
        showToast('기업 수정이 완료되었습니다.', 'success')
      } else if (res.result === 'ERROR') {
        showToast('기업 수정이 실패하였습니다.', 'error')
      }
    } catch (error) {
      showToast('파일 업로드 및 기업 수정 실패', 'error')
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
    setTempAddressData({ ...tempAddressData, postalCode: zonecode, streetAddress: fullAddress })
    setModalState({ isAddAddressInfoModalOpen: true, isSearchAddressModalOpen: false })
  }

  // 임시 주소 저장 state - 모달 내에서만 사용
  const [tempAddressData, setTempAddressData] = useState<AddressRegisterRequestType>({
    addressName: '',
    recipient: '',
    phoneNumber: '',
    postalCode: '',
    streetAddress: '',
    detailAddress: '',
    default: false,
  })

  // 페이지 언마운트 시 상태 초기화
  useEffect(() => {
    return () => {
      // cleanup 함수: 컴포넌트가 언마운트될 때 실행
      setState({
        registerCompanyInfoData: undefined,
      })
      setTempAddressData({
        addressName: '',
        recipient: '',
        phoneNumber: '',
        postalCode: '',
        streetAddress: '',
        detailAddress: '',
        default: false,
      })
    }
  }, []) // 빈 의존성 배열로 마운트/언마운트 시에만 실행

  return (
    <div className="flex w-[1220px] flex-col items-center gap-y-[40px]">
      {isSearchAddressModalOpen && <SearchAddressModal handleComplete={handleComplete} />}
      {isAddAddressInfoModalOpen && (
        <RegisterCompanyAddAddressInfoModal tempAddressData={tempAddressData} setTempAddressData={setTempAddressData} />
      )}
      <div className="gap-y-2xs flex w-full flex-col">
        <CompanyName />
        <CompanyLogoImageUpload url={companyInfo?.profileUrl} companyLogoImageRef={companyLogoImageRef} />
        <RepresentativeNameField />
        <RepresentativePhoneNumberField />
        <RepresentativeEmailField />
        <BusinessNumber />
        <BusinessTypeField />
        <BusinessItemField />
        <BusinessRegistrationUpload
          url={companyInfo?.registrationCertificateUrl}
          businessRegistrationFileRef={businessRegistrationFileRef}
        />
        <BankbookCopyUpload url={companyInfo?.bankbookCopy} bankbookCopyFileRef={bankbookCopyFileRef} />
        <CompanyAddressField setTempAddressData={setTempAddressData} />
      </div>
      <div className="flex w-full gap-x-3 pb-[40px]">
        <Button1
          onClick={() => {
            router.back()
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
            handleProjectSubmitWithLoading()
            // console.log('result', result)
          }}
          // disabled={!isFormValid}
          styleSize={'lg'}
          styleType={'primary'}
          styleStatus={'default'}
          customClassName={'w-full'}
        >
          수정 완료
        </Button1>
      </div>
    </div>
  )
}
