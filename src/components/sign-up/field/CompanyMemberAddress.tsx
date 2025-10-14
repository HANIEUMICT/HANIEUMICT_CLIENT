import Button1 from '@/components/common/Button1'
import { useModalStore } from '@/store/modalStore'
import { useAuthStore } from '@/store/authStore'
import AddressItem from '@/components/common/AddressItem'
import { Dispatch, SetStateAction } from 'react'
import { AddressRegisterRequestType } from '@/type/common'

interface CompanyMemberAddressProps {
  setTempAddressData: Dispatch<SetStateAction<AddressRegisterRequestType>>
}

export default function CompanyMemberAddress({ setTempAddressData }: CompanyMemberAddressProps) {
  const setModalState = useModalStore((state) => state.setState)
  const companySignUpData = useAuthStore((state) => state.companySignUpData)
  const setState = useAuthStore((state) => state.setState)

  return (
    <div className="gap-y-4xs flex flex-col">
      <div className="flex items-center justify-between">
        <section className="gap-x-5xs sub2 flex">
          주소 <span className="text-conic-red-30">*</span>
        </section>
        <Button1
          styleType={'secondary'}
          styleSize={'sm'}
          styleStatus={'default'}
          onClick={() => {
            setModalState({ isAddAddressInfoModalOpen: true })
          }}
          buttonType={'button'}
        >
          추가
        </Button1>
      </div>
      {companySignUpData?.addressRegisterRequest ? (
        <AddressItem
          addressName={companySignUpData?.addressRegisterRequest.addressName}
          streetAddress={companySignUpData?.addressRegisterRequest.streetAddress}
          isDefault={companySignUpData?.addressRegisterRequest.default}
          onDelete={() => {
            setState({
              ...companySignUpData,
              companySignUpData: {
                ...companySignUpData,
                addressRegisterRequest: undefined,
              },
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
          }}
          detailAddress={companySignUpData?.addressRegisterRequest.detailAddress}
          onEdit={() => {
            setModalState({ isAddAddressInfoModalOpen: true })
          }}
          postalCode={companySignUpData?.addressRegisterRequest.postalCode}
          phoneNumber={companySignUpData?.addressRegisterRequest.phoneNumber}
          recipient={companySignUpData?.addressRegisterRequest.recipient}
        />
      ) : null}
    </div>
  )
}
