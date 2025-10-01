import Modal from '@/components/common/Modal'
import Image from 'next/image'
import Button1 from '@/components/common/Button1'
import Header from '@/components/common/Header'
import EmailField from '@/components/sign-up/field/EmailField'
import PasswordField from '@/components/sign-up/field/PasswordField'
import PhoneNumberField from '@/components/sign-up/field/PhoneNumberField'
import AddressField from '@/components/sign-up/field/AddressField'
import TermsOfServiceField from '@/components/sign-up/field/TermsOfServiceField'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { useAuthStore } from '@/store/authStore'
import SearchAddressModal from '@/components/common/SearchAddressModal'
import { useModalStore } from '@/store/modalStore'
import { postAuthSignUp } from '@/lib/auth'

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
      {isModalOpen ? (
        <Modal>
          <Modal.Content>
            <div className="flex flex-col">
              <div className="gap-y-4xs flex flex-col">
                <h2 className="h2">
                  환영합니다!
                  <br />
                  <span className={'text-conic-red-30'}>회원등록</span>이 완료되었어요.
                </h2>
                <p className="body1 text-gray-50">견적서를 바로 작성하시겠어요?</p>
              </div>
              <div className="mt-[24px] flex w-full items-center justify-center">
                <Image src={'/success-graphic.svg'} width={336} height={240} alt={'회원가입 성공'} />
              </div>
            </div>
          </Modal.Content>
          <Modal.BottomButton>
            <div className="flex gap-x-3">
              <Button1
                onClick={() => {
                  setIsModalOpen(false)
                  router.push('/')
                }}
                styleType={'outline'}
                styleSize={'lg'}
                customClassName={'w-full'}
              >
                다음에
              </Button1>
              <Button1
                onClick={() => {
                  setIsModalOpen(false)
                  router.push('/')
                }}
                styleType={'primary'}
                styleSize={'lg'}
                customClassName={'w-full'}
              >
                견적서 작성하기
              </Button1>
            </div>
          </Modal.BottomButton>
        </Modal>
      ) : null}
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
          <EmailField />
          <PasswordField />
          <PhoneNumberField />
          <AddressField />
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
