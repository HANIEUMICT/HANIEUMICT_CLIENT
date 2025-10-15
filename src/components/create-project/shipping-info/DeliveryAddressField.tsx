import { useProjectStore } from '@/store/projectStore'
import { useEffect, useState } from 'react'
import { getAddressList } from '@/lib/mypage'
import { AddressRegisterRequestType } from '@/type/common'
import AddressItem from '@/components/common/AddressItem'
import { CheckboxFillIcon, UnCheckboxIcon } from '@/assets/svgComponents'

export default function DeliveryAddressField() {
  const projectData = useProjectStore((state) => state.projectData)
  const setState = useProjectStore((state) => state.setState)
  const [addressList, setAddressList] = useState<AddressRegisterRequestType[] | undefined>([])

  useEffect(() => {
    getAddressList(0, 10).then((res) => {
      if (res.result === 'SUCCESS') {
        setAddressList(res.data?.content)
      }
    })
  }, [])

  /**
   * 현재 주소가 선택된 주소인지 확인하는 함수
   * @param address - 비교할 주소 객체
   * @returns 선택된 주소이면 true, 아니면 false
   */
  const isSelectedAddress = (address: AddressRegisterRequestType): boolean => {
    if (!projectData.deliveryAddress) return false

    // projectData.deliveryAddress를 공백 기준으로 분리
    const deliveryAddressParts = projectData.deliveryAddress.trim().split(' ')

    // 마지막 부분이 detailAddress, 나머지가 streetAddress
    const detailAddress = deliveryAddressParts.pop() || '' // 마지막 요소 추출
    const streetAddress = deliveryAddressParts.join(' ') // 나머지 요소들을 공백으로 합침

    // 비교
    return address.streetAddress === streetAddress && address.detailAddress === detailAddress
  }

  /**
   * 주소 선택/해제 핸들러
   * @param address - 선택할 주소 객체
   */
  const handleAddressClick = (address: AddressRegisterRequestType) => {
    const isCurrentlySelected = isSelectedAddress(address)

    setState({
      projectData: {
        ...projectData,
        deliveryAddress: isCurrentlySelected ? undefined : `${address.streetAddress} ${address.detailAddress}`,
      },
    })
  }

  return (
    <div className="gap-y-4xs flex flex-col">
      <section className="gap-x-5xs sub2 flex">
        배송지 <span className="text-conic-red-30">*</span>
      </section>
      <div className="flex w-full flex-col gap-y-2">
        {addressList?.map((address, index) => {
          const isSelected = isSelectedAddress(address)

          return (
            <div key={`${address.postalCode}${index}`} className="flex w-full items-start gap-x-2">
              {isSelected ? (
                <CheckboxFillIcon
                  onClick={() => handleAddressClick(address)}
                  width={24}
                  height={24}
                  className="cursor-pointer"
                />
              ) : (
                <UnCheckboxIcon
                  onClick={() => handleAddressClick(address)}
                  width={24}
                  height={24}
                  className="cursor-pointer"
                />
              )}
              <AddressItem
                isDefault={address.default}
                default={address.default}
                detailAddress={address.detailAddress}
                streetAddress={address.streetAddress}
                addressName={address.addressName}
                recipient={address.recipient}
                phoneNumber={address.phoneNumber}
                postalCode={address.postalCode}
              />
            </div>
          )
        })}
      </div>
    </div>
  )
}
