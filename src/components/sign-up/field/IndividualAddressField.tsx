import Button1 from '@/components/common/Button1'
import { useModalStore } from '@/store/modalStore'
import { useAuthStore } from '@/store/authStore'
import { deleteAddress } from '@/lib/mypage'
import AddressItem from '@/components/common/AddressItem'

export default function IndividualAddressField() {
  const setModalState = useModalStore((state) => state.setState)
  const individualSignUpData = useAuthStore((state) => state.individualSignUpData)
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
      {individualSignUpData?.addressRegisterRequest ? (
        <AddressItem
          addressName={individualSignUpData?.addressRegisterRequest.addressName}
          streetAddress={individualSignUpData?.addressRegisterRequest.streetAddress}
          isDefault={individualSignUpData?.addressRegisterRequest.default}
          onDelete={() => {
            setModalState({ isAddAddressInfoModalOpen: true })
          }}
          detailAddress={individualSignUpData?.addressRegisterRequest.detailAddress}
          onEdit={() => {
            setState({
              ...individualSignUpData,
              individualSignUpData: {
                ...individualSignUpData,
                addressRegisterRequest: undefined,
              },
            })
          }}
          postalCode={individualSignUpData?.addressRegisterRequest.postalCode}
          phoneNumber={individualSignUpData?.addressRegisterRequest.phoneNumber}
          recipient={individualSignUpData?.addressRegisterRequest.recipient}
        ></AddressItem>
      ) : null}
    </div>
  )
}
