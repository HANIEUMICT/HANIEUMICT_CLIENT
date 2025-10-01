import Button1 from '@/components/common/Button1'
import Header from '@/components/common/Header'
import IndividualEmailField from '@/components/sign-up/field/IndividualEmailField'
import IndividualPasswordField from '@/components/sign-up/field/IndividualPasswordField'
import IndividualPhoneNumberField from '@/components/sign-up/field/IndividualPhoneNumberField'
import IndividualAddressField from '@/components/sign-up/field/IndividualAddressField'
import TermsOfServiceField from '@/components/sign-up/field/TermsOfServiceField'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { useAuthStore } from '@/store/authStore'
import SearchAddressModal from '@/components/common/SearchAddressModal'
import { useModalStore } from '@/store/modalStore'
import { postAuthSignUp } from '@/lib/auth'
import SignUpSuccessModal from '@/components/modal/SignUpSuccessModal'

interface PersonSignUpPageProps {}

const PersonSignUpPage = ({}: PersonSignUpPageProps) => {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const isSearchAddressModalOpen = useModalStore((state) => state.isSearchAddressModalOpen)

  const router = useRouter()
  const setState = useAuthStore((state) => state.setState)
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
    setState({
      ...individualSignUpData,
      individualSignUpData: {
        ...individualSignUpData,
        addressRegisterRequest: { postalCode: zonecode, streetAddress: fullAddress },
      },
    })

    setModalState({ isSearchAddressModalOpen: false })
  }

  useEffect(() => {
    console.log('individualSignUpData', individualSignUpData)
  }, [individualSignUpData])

  return (
    <div className="flex flex-col items-center justify-center">
      {isSearchAddressModalOpen && <SearchAddressModal handleComplete={handleComplete} />}
      {isModalOpen ? <SignUpSuccessModal setIsModalOpen={setIsModalOpen} /> : null}
      <Header headerType={'SIGNUP'} />
      <div className="mt-[200px] flex w-[600px] flex-col items-center justify-center">
        <section className="gap-y-2xs flex flex-col items-center">
          <h2 className="h2">회원가입 유형</h2>
          <div className="flex rounded-[12px] bg-white">
            <Button1 onClick={() => {}} styleType={'secondary'} styleSize={'md'} customClassName="h-[48px] w-[120px]">
              개인회원
            </Button1>
            <Button1 onClick={() => {}} styleType={'ghost'} styleSize={'md'} customClassName="h-[48px] w-[120px]">
              기업회원
            </Button1>
          </div>
        </section>
        <section className="gap-y-2xs my-[40px] flex w-full flex-col">
          <IndividualEmailField />
          <IndividualPasswordField />
          <IndividualPhoneNumberField />
          <IndividualAddressField />
        </section>
        <TermsOfServiceField />
        <Button1
          styleSize="lg"
          styleType="primary"
          styleStatus={isSignUpEnabled ? 'default' : 'disabled'}
          customClassName="mt-3xs w-full mb-[252px]"
          onClick={() => {
            if (individualSignUpData) {
              const response = postAuthSignUp(individualSignUpData)
              console.log('회원가입 완료', response)
              setIsModalOpen(true)
            }
          }}
        >
          회원가입
        </Button1>
      </div>
    </div>
  )
}
export default PersonSignUpPage
