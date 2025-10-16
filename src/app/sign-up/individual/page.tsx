'use client'

import Button1 from '@/components/common/Button1'
import Header from '@/components/common/Header'
import IndividualEmailField from '@/components/sign-up/field/IndividualEmailField'
import IndividualPasswordField from '@/components/sign-up/field/IndividualPasswordField'
import IndividualPhoneNumberField from '@/components/sign-up/field/IndividualPhoneNumberField'
import IndividualAddressField from '@/components/sign-up/field/IndividualAddressField'
import TermsOfServiceField from '@/components/sign-up/field/TermsOfServiceField'
import { useEffect, useState } from 'react'
import { useAuthStore } from '@/store/authStore'
import SearchAddressModal from '@/components/common/SearchAddressModal'
import { useModalStore } from '@/store/modalStore'
import { postAuthSignUp } from '@/lib/auth'
import SignUpSuccessModal from '@/components/modal/SignUpSuccessModal'
import IndividualSignUpAddAddressInfoModal from '@/components/modal/IndividualSignUpAddAddressInfoModal'
import { AddressRegisterRequestType } from '@/type/common'
import IndividualNameField from '@/components/sign-up/field/IndividualNameField'
import Cookies from 'js-cookie'

interface IndividualSignUpPageProps {}

const IndividualSignUpPage = ({}: IndividualSignUpPageProps) => {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const setAuthState = useAuthStore((state) => state.setState)

  const isSearchAddressModalOpen = useModalStore((state) => state.isSearchAddressModalOpen)
  const isAddAddressInfoModalOpen = useModalStore((state) => state.isAddAddressInfoModalOpen)
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

  const setModalState = useModalStore((state) => state.setState)

  const individualSignUpData = useAuthStore((state) => state.individualSignUpData)
  const isIndividualPasswordValid = useAuthStore((state) => state.isIndividualPasswordValid)
  const isIndividualPasswordMatch = useAuthStore((state) => state.isIndividualPasswordMatch)

  const isSignUpEnabled = !!(
    individualSignUpData?.email &&
    individualSignUpData?.password &&
    individualSignUpData?.phoneNumber &&
    individualSignUpData?.termsOfServiceAgreed === true &&
    isIndividualPasswordValid === true &&
    isIndividualPasswordMatch === true
  )

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

  useEffect(() => {
    console.log('individualSignUpData', individualSignUpData)
  }, [individualSignUpData])

  return (
    <div className="flex flex-col items-center justify-center">
      {isAddAddressInfoModalOpen && (
        <IndividualSignUpAddAddressInfoModal
          tempAddressData={tempAddressData}
          setTempAddressData={setTempAddressData}
        />
      )}
      {isSearchAddressModalOpen && <SearchAddressModal handleComplete={handleComplete} />}
      {isModalOpen ? <SignUpSuccessModal setIsModalOpen={setIsModalOpen} /> : null}
      <Header headerType={'SIGNUP'} />
      <div className="mt-[200px] flex w-[600px] flex-col items-center justify-center">
        <section className="gap-y-2xs flex flex-col items-center">
          <h2 className="h2">회원가입 유형</h2>
          <div className="flex rounded-[12px] bg-white">
            <div className="bg-conic-orange-30 button-lg flex h-[48px] w-[120px] items-center justify-center rounded-[12px] text-white">
              개인회원
            </div>
            <div className="button-lg flex h-[48px] w-[120px] items-center justify-center rounded-[12px] bg-white text-gray-50">
              기업회원
            </div>
          </div>
        </section>
        <section className="gap-y-2xs my-[40px] flex w-full flex-col">
          <IndividualNameField />
          <IndividualEmailField />
          <IndividualPasswordField />
          <IndividualPhoneNumberField />
          <IndividualAddressField setTempAddressData={setTempAddressData} />
        </section>
        <TermsOfServiceField />
        <Button1
          styleSize="lg"
          styleType="primary"
          styleStatus={isSignUpEnabled ? 'default' : 'disabled'}
          customClassName="mt-3xs w-full mb-[252px]"
          onClick={async () => {
            try {
              setIsLoading(true)
              if (individualSignUpData) {
                const response = await postAuthSignUp(individualSignUpData)
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
                      Cookies.set('userData', JSON.stringify(userData))
                    }
                  }
                  setIsModalOpen(true)
                  setAuthState({
                    individualSignUpData: {
                      ...individualSignUpData,
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
          {isLoading ? (
            <div className="flex items-center gap-x-2">
              <div className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent"></div>
              <span>등록 중...</span>
            </div>
          ) : (
            '회원가입'
          )}
        </Button1>
      </div>
    </div>
  )
}
export default IndividualSignUpPage
