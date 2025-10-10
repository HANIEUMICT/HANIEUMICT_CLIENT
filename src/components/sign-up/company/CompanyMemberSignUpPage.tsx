import { Dispatch, SetStateAction, useEffect, useMemo, useState } from 'react'
import { CompanySignUpPageStepType } from '@/type/auth'
import Header from '@/components/common/Header'
import Button1 from '@/components/common/Button1'
import CompanyInfoField from '@/components/sign-up/company/CompanyInfoField'
import CompanyMemberName from '@/components/sign-up/field/CompanyMemberName'
import CompanyMemberPassword from '@/components/sign-up/field/CompanyMemberPassword'
import CompanyMemberPhoneNumber from '@/components/sign-up/field/CompanyMemberPhoneNumber'
import CompanyMemberAddress from '@/components/sign-up/field/CompanyMemberAddress'
import CompanyMemberTermsOfServiceField from '@/components/sign-up/field/CompanyMemberTermsOfServiceField'
import { useAuthStore } from '@/store/authStore'
import { useModalStore } from '@/store/modalStore'
import SearchAddressModal from '@/components/common/SearchAddressModal'
import SignUpSuccessModal from '@/components/modal/SignUpSuccessModal'
import { postCompanySignUp } from '@/lib/auth'
import CompanyMemberEmail from '@/components/sign-up/field/CompanyMemberEmail'

interface CompanySignUpPageType {
  setStep: Dispatch<SetStateAction<CompanySignUpPageStepType>>
}
export default function CompanyMemberSignUpPage({ setStep }: CompanySignUpPageType) {
  const setState = useAuthStore((state) => state.setState)
  const companySignUpData = useAuthStore((state) => state.companySignUpData)
  const summaryCompanyInfoData = useAuthStore((state) => state.summaryCompanyInfoData)

  const setModalState = useModalStore((state) => state.setState)
  const isSearchAddressModalOpen = useModalStore((state) => state.isSearchAddressModalOpen)
  const [isSignUpSuccessModalOpen, setIsSignUpSuccessModalOpen] = useState(false)

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
      ...companySignUpData,
      companySignUpData: {
        ...companySignUpData,
        addressRegisterRequest: { postalCode: zonecode, streetAddress: fullAddress },
      },
    })

    setModalState({ isSearchAddressModalOpen: false })
  }

  // 컴포넌트 내부에서
  const isFormValid = useMemo(() => {
    // companySignUpData 검증
    if (!companySignUpData) return false

    const { name, email, password, phoneNumber, termsOfServiceAgreed, addressRegisterRequest } = companySignUpData

    // 문자열 필드가 모두 존재하고 빈 문자열이 아닌지 확인
    const signUpDataValid = !!(
      name?.trim() &&
      email?.trim() &&
      password?.trim() &&
      phoneNumber?.trim() &&
      termsOfServiceAgreed === true &&
      addressRegisterRequest
    )

    // summaryCompanyInfoData의 companyId 검증
    const companyIdValid = !!summaryCompanyInfoData?.companyId

    return signUpDataValid && companyIdValid
  }, [companySignUpData, summaryCompanyInfoData])

  useEffect(() => {
    console.log('isSearchAddressModalOpen', isSearchAddressModalOpen)
  }, [isSearchAddressModalOpen])

  return (
    <div className="flex flex-col items-center justify-center">
      {/* 회원가입 완료 모달 */}
      {isSignUpSuccessModalOpen && <SignUpSuccessModal setIsModalOpen={setIsSignUpSuccessModalOpen} role={'COMPANY'} />}

      {isSearchAddressModalOpen && <SearchAddressModal handleComplete={handleComplete} />}
      <Header headerType={'SIGNUP'} />
      <div className="mt-[200px] flex w-[600px] flex-col items-center gap-y-[40px]">
        <section className="gap-y-2xs flex flex-col items-center">
          <h2 className="h2">회원가입 유형</h2>
          <div className="flex rounded-[12px] bg-white">
            <div className="button-lg flex h-[48px] w-[120px] items-center justify-center rounded-[12px] bg-white text-gray-50">
              개인회원
            </div>
            <div className="bg-conic-orange-30 button-lg flex h-[48px] w-[120px] items-center justify-center rounded-[12px] text-white">
              기업회원
            </div>
          </div>
        </section>
        <div className="gap-y-2xs flex w-full flex-col">
          <CompanyInfoField setStep={setStep} />
          <CompanyMemberName />
          <CompanyMemberEmail />
          <CompanyMemberPassword />
          <CompanyMemberPhoneNumber />
          <CompanyMemberAddress />
        </div>
        <div className="gap-y-3xs flex w-full flex-col">
          <CompanyMemberTermsOfServiceField />
          <Button1
            styleSize="lg"
            styleType="primary"
            customClassName="w-full"
            disabled={!isFormValid}
            styleStatus={isFormValid ? 'default' : 'disabled'}
            onClick={async () => {
              if (isFormValid) {
                const result = await postCompanySignUp(companySignUpData, summaryCompanyInfoData?.companyId)
                console.log('result', result)
                if (result.result === 'SUCCESS') {
                  setIsSignUpSuccessModalOpen(true)
                }
              }
            }}
          >
            회원가입
          </Button1>
        </div>
      </div>
    </div>
  )
}
