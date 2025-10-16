'use client'

import { useEffect, useMemo, useState } from 'react'
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
import { postAuthSignUp, postCompanySignUp } from '@/lib/auth'
import CompanyMemberEmail from '@/components/sign-up/field/CompanyMemberEmail'
import RegisterCompanyMemberAddAddressInfoModal from '@/components/modal/RegisterCompanyMemberAddAddressInfoModal'
import { AddressRegisterRequestType } from '@/type/common'
import Cookies from 'js-cookie'

export default function CompanyMemberSignUpPage() {
  const setState = useAuthStore((state) => state.setState)
  const companySignUpData = useAuthStore((state) => state.companySignUpData)
  const summaryCompanyInfoData = useAuthStore((state) => state.summaryCompanyInfoData)

  const setModalState = useModalStore((state) => state.setState)
  const isAddAddressInfoModalOpen = useModalStore((state) => state.isAddAddressInfoModalOpen)
  const isSearchAddressModalOpen = useModalStore((state) => state.isSearchAddressModalOpen)
  const [isLoading, setIsLoading] = useState(false)

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
        companySignUpData: undefined,
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
    setTempAddressData({ ...tempAddressData, postalCode: zonecode, streetAddress: fullAddress })
    setModalState({ isAddAddressInfoModalOpen: true, isSearchAddressModalOpen: false })
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

  return (
    <div className="flex flex-col items-center justify-center">
      {/* 회원가입 완료 모달 */}
      {isSignUpSuccessModalOpen && <SignUpSuccessModal setIsModalOpen={setIsSignUpSuccessModalOpen} role={'COMPANY'} />}

      {isSearchAddressModalOpen && <SearchAddressModal handleComplete={handleComplete} />}
      {isAddAddressInfoModalOpen && (
        <RegisterCompanyMemberAddAddressInfoModal
          tempAddressData={tempAddressData}
          setTempAddressData={setTempAddressData}
        />
      )}
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
          <CompanyInfoField />
          <CompanyMemberName />
          <CompanyMemberEmail />
          <CompanyMemberPassword />
          <CompanyMemberPhoneNumber />
          <CompanyMemberAddress setTempAddressData={setTempAddressData} />
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
              try {
                setIsLoading(true)
                if (isFormValid) {
                  const response = await postCompanySignUp(companySignUpData, summaryCompanyInfoData?.companyId)
                  console.log('회원가입', response)
                  if (response.result === 'SUCCESS') {
                    if (response.data) {
                      Cookies.set('accessToken', response.data.tokenInfo.accessToken)
                      Cookies.set('refreshToken', response.data.tokenInfo.accessToken)

                      const userData: {
                        memberId: number
                        memberName: string
                        memberRole: 'INDIVIDUAL' | 'OWNER'
                        companyId?: number
                      } = {
                        memberId: response.data.memberInfo.memberId,
                        memberName: response.data.memberInfo.memberName,
                        memberRole: response.data.memberInfo.memberRole,
                        companyId: response.data.companyId,
                      }
                      // localStorage 는 브라우저 환경에서만 접근 가능
                      if (typeof window !== 'undefined') {
                        localStorage.setItem('userData', JSON.stringify(userData))
                        Cookies.set('userData', JSON.stringify(userData))
                      }
                    }
                    setIsSignUpSuccessModalOpen(true)

                    setState({
                      companySignUpData: {
                        ...companySignUpData,
                        addressRegisterRequest: undefined,
                      },
                    })
                  } else if (response.result === 'ERROR') {
                    alert(response.error.message)
                  }
                }
              } catch (e) {
                console.log('error', e)
              } finally {
                setIsLoading(false)
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
