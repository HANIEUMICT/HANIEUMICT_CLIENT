import Button1 from '@/components/common/Button1'
import { useModalStore } from '@/store/modalStore'
import { useAuthStore } from '@/store/authStore'
import AddressItem from '@/components/common/AddressItem'
import { Dispatch, SetStateAction } from 'react'
import { AddressRegisterRequestType } from '@/type/common'

interface CompanyAddressFieldProps {
  setTempAddressData: Dispatch<SetStateAction<AddressRegisterRequestType>>
}

export default function CompanyAddressField({ setTempAddressData }: CompanyAddressFieldProps) {
  const setModalState = useModalStore((state) => state.setState)
  const registerCompanyInfoData = useAuthStore((state) => state.registerCompanyInfoData)
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
      {registerCompanyInfoData?.addressRegisterRequest ? (
        <AddressItem
          addressName={registerCompanyInfoData?.addressRegisterRequest.addressName}
          streetAddress={registerCompanyInfoData?.addressRegisterRequest.streetAddress}
          isDefault={registerCompanyInfoData?.addressRegisterRequest.default}
          onDelete={() => {
            setState({
              ...registerCompanyInfoData,
              registerCompanyInfoData: {
                ...registerCompanyInfoData,
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
          detailAddress={registerCompanyInfoData?.addressRegisterRequest.detailAddress}
          onEdit={() => {
            setModalState({ isAddAddressInfoModalOpen: true })
          }}
          postalCode={registerCompanyInfoData?.addressRegisterRequest.postalCode}
          phoneNumber={registerCompanyInfoData?.addressRegisterRequest.phoneNumber}
          recipient={registerCompanyInfoData?.addressRegisterRequest.recipient}
        />
      ) : null}
    </div>
  )
}
