'use client'

import { useRef, useState, useEffect, useCallback } from 'react'
import { useRouter } from 'next/navigation'
import { CompanyType } from '@/type/company'
import { AddressRegisterRequestType } from '@/type/common'
import { useAuthStore } from '@/store/authStore'
import { useModalStore } from '@/store/modalStore'
import { useFileUpload } from '@/hooks/useFileUpload'
import { useToast } from '@/provider/ToastProvider'
import { patchCompanyInfo } from '@/lib/api/client/company'

// 필드 컴포넌트들
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

// UI 컴포넌트들
import Button1 from '@/components/common/Button1'
import SearchAddressModal from '@/components/common/SearchAddressModal'
import RegisterCompanyAddAddressInfoModal from '@/components/modal/RegisterCompanyAddAddressInfoModal'

interface MyPageBasicInfoProps {
  companyInfo: CompanyType | undefined
}

const INITIAL_ADDRESS_DATA: AddressRegisterRequestType = {
  addressName: '',
  recipient: '',
  phoneNumber: '',
  postalCode: '',
  streetAddress: '',
  detailAddress: '',
  default: false,
}

export default function MyPageBusinessInfo({ companyInfo }: MyPageBasicInfoProps) {
  const router = useRouter()
  const { showToast } = useToast()
  const { uploadFiles } = useFileUpload()

  // Refs
  const companyLogoImageRef = useRef<HTMLInputElement | null>(null)
  const businessRegistrationFileRef = useRef<HTMLInputElement | null>(null)
  const bankbookCopyFileRef = useRef<HTMLInputElement | null>(null)

  // Auth Store
  const businessRegistrationFile = useAuthStore((state) => state.businessRegistrationFile)
  const bankbookCopyFile = useAuthStore((state) => state.bankbookCopyFile)
  const companyLogoFile = useAuthStore((state) => state.companyLogoFile)
  const registerCompanyInfoData = useAuthStore((state) => state.registerCompanyInfoData)
  const setState = useAuthStore((state) => state.setState)

  // Modal Store
  const setModalState = useModalStore((state) => state.setState)
  const isSearchAddressModalOpen = useModalStore((state) => state.isSearchAddressModalOpen)
  const isAddAddressInfoModalOpen = useModalStore((state) => state.isAddAddressInfoModalOpen)

  // Local State
  const [tempAddressData, setTempAddressData] = useState<AddressRegisterRequestType>(INITIAL_ADDRESS_DATA)
  const [isSubmitting, setIsSubmitting] = useState(false)

  // Initialize company data on mount
  useEffect(() => {
    if (!companyInfo) return

    const addressData = {
      ...companyInfo.address,
      detailAddress: companyInfo.address.detail,
      streetAddress: companyInfo.address.street,
      postalCode: companyInfo.address.postal,
    }

    setState({
      registerCompanyInfoData: {
        ...companyInfo,
        addressRegisterRequest: addressData,
      },
    })
    setTempAddressData(addressData)
  }, [companyInfo, setState])

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      setState({
        registerCompanyInfoData: undefined,
      })
      setTempAddressData(INITIAL_ADDRESS_DATA)
    }
  }, [setState])

  // 파일 업로드 처리
  const uploadCompanyFiles = useCallback(async () => {
    const [logoResult, registrationResult, bankbookResult] = await Promise.all([
      companyLogoFile ? uploadFiles(companyLogoFile) : Promise.resolve({ success: true, uploadedUrls: [null] }),
      businessRegistrationFile
        ? uploadFiles(businessRegistrationFile)
        : Promise.resolve({ success: true, uploadedUrls: [null] }),
      bankbookCopyFile ? uploadFiles(bankbookCopyFile) : Promise.resolve({ success: true, uploadedUrls: [null] }),
    ])

    const uploadResults = [logoResult, registrationResult, bankbookResult]
    const failedUploads = uploadResults.filter((result) => !result.success)

    if (failedUploads.length > 0) {
      throw new Error(`${failedUploads.length}개의 파일 업로드 실패`)
    }

    return {
      profileUrl: logoResult.uploadedUrls[0],
      registrationCertificateUrl: registrationResult.uploadedUrls[0],
      bankbookCopy: bankbookResult.uploadedUrls[0],
    }
  }, [companyLogoFile, businessRegistrationFile, bankbookCopyFile, uploadFiles])

  // 기업정보 수정 제출
  const handleProjectSubmit = useCallback(async () => {
    if (isSubmitting) return
    setIsSubmitting(true)

    try {
      // 파일 업로드
      const uploadedUrls = await uploadCompanyFiles()

      // 기존 데이터에 새로운 URL 병합
      const updatedCompanyData = {
        ...registerCompanyInfoData,
        ...(uploadedUrls.profileUrl && { profileUrl: uploadedUrls.profileUrl }),
        ...(uploadedUrls.registrationCertificateUrl && {
          registrationCertificateUrl: uploadedUrls.registrationCertificateUrl,
        }),
        ...(uploadedUrls.bankbookCopy && { bankbookCopy: uploadedUrls.bankbookCopy }),
      }

      // API 요청
      const res = await patchCompanyInfo(updatedCompanyData)

      if (res.result === 'SUCCESS') {
        showToast('기업 수정이 완료되었습니다.', 'success')
      } else {
        showToast('기업 수정이 실패하였습니다.', 'error')
      }
    } catch (error) {
      console.error('Error:', error)
      showToast('파일 업로드 및 기업 수정 실패', 'error')
    } finally {
      setIsSubmitting(false)
    }
  }, [isSubmitting, uploadCompanyFiles, registerCompanyInfoData, patchCompanyInfo, showToast])

  // 주소 검색 완료 핸들러
  const handleAddressComplete = async (data: any) => {
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

  return (
    <div className="flex w-[1220px] flex-col items-center gap-y-[40px]">
      {/* 모달들 */}
      {isSearchAddressModalOpen && <SearchAddressModal handleComplete={handleAddressComplete} />}
      {isAddAddressInfoModalOpen && (
        <RegisterCompanyAddAddressInfoModal tempAddressData={tempAddressData} setTempAddressData={setTempAddressData} />
      )}

      {/* 폼 필드들 */}
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

      {/* 버튼들 */}
      <div className="flex w-full gap-x-3 pb-[40px]">
        <Button1
          onClick={() => router.back()}
          styleSize="lg"
          styleType="outline"
          styleStatus="default"
          customClassName="w-full"
        >
          이전
        </Button1>
        <Button1
          onClick={handleProjectSubmit}
          disabled={isSubmitting}
          styleSize="lg"
          styleType="primary"
          styleStatus="default"
          customClassName="w-full"
        >
          {isSubmitting ? '수정 중...' : '수정 완료'}
        </Button1>
      </div>
    </div>
  )
}
