import { useModalStore } from '@/store/modalStore'
import { useAuthStore } from '@/store/authStore'
import Modal from '@/components/common/Modal'
import Button1 from '@/components/common/Button1'
import Input from '@/components/common/Input'
import { CheckboxFillIcon, UnCheckboxIcon } from '@/assets/svgComponents'
import { Dispatch, SetStateAction, useEffect, useMemo } from 'react'
import { formatPhoneNumber } from '@/utils/common'
import { AddressRegisterRequestType } from '@/type/common'

interface AddAddressInfoModalProps {
  tempAddressData: AddressRegisterRequestType
  setTempAddressData: Dispatch<SetStateAction<AddressRegisterRequestType>>
}

export default function IndividualSignUpAddAddressInfoModal({
  tempAddressData,
  setTempAddressData,
}: AddAddressInfoModalProps) {
  const setModalState = useModalStore((state) => state.setState)
  const setAuthState = useAuthStore((state) => state.setState)
  const individualSignUpData = useAuthStore((state) => state.individualSignUpData)

  // 이 useEffect들을 제거하거나 수정
  // useEffect(() => {
  //   if (individualSignUpData?.addressRegisterRequest) {
  //     setTempAddressData({ ... })
  //   }
  // }, [individualSignUpData?.addressRegisterRequest])

  // useEffect(() => {
  //   if (individualSignUpData?.addressRegisterRequest?.postalCode) {
  //     setTempAddressData({ ... })
  //   }
  // }, [individualSignUpData?.addressRegisterRequest?.postalCode])

  const handlePhoneNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatPhoneNumber(e.target.value)
    setTempAddressData({ ...tempAddressData, phoneNumber: formatted })
  }

  const isVerified = useMemo(() => {
    return !!(
      tempAddressData.addressName &&
      tempAddressData.recipient &&
      tempAddressData.phoneNumber &&
      tempAddressData.postalCode &&
      tempAddressData.streetAddress &&
      tempAddressData.detailAddress
    )
  }, [
    tempAddressData.addressName,
    tempAddressData.recipient,
    tempAddressData.phoneNumber,
    tempAddressData.postalCode,
    tempAddressData.streetAddress,
    tempAddressData.detailAddress,
  ])

  // 배송지 등록 버튼 클릭 시 실제 저장
  const handleRegister = () => {
    setAuthState({
      individualSignUpData: {
        ...individualSignUpData,
        addressRegisterRequest: tempAddressData,
      },
    })
    setModalState({ isAddAddressInfoModalOpen: false })
  }
  return (
    <Modal>
      <Modal.Content>
        <div className="gap-y-s flex flex-col">
          <h2 className="h2">배송지 등록</h2>
          <section className="gap-y-2xs flex flex-col">
            <div className="gap-y-4xs flex flex-col">
              <p className="sub2">
                배송지명 <span className="text-conic-red-30">*</span>
              </p>
              <Input
                onChange={(e) => {
                  setTempAddressData({ ...tempAddressData, addressName: e.target.value })
                }}
                value={tempAddressData.addressName}
                placeholder={'회사명, 집 등을 입력해주세요.'}
                inputBoxStyle={'default'}
              />
            </div>
            <div className="gap-y-4xs flex flex-col">
              <p className="sub2">
                수령인 <span className="text-conic-red-30">*</span>
              </p>
              <Input
                onChange={(e) => {
                  setTempAddressData({ ...tempAddressData, recipient: e.target.value })
                }}
                value={tempAddressData.recipient}
                placeholder={'수령인을 입력해주세요.'}
                inputBoxStyle={'default'}
              />
            </div>
            <div className="gap-y-4xs flex flex-col">
              <p className="sub2">
                연락처 <span className="text-conic-red-30">*</span>
              </p>
              <Input
                onChange={handlePhoneNumberChange}
                value={tempAddressData.phoneNumber}
                placeholder={'수령인 연락처를 입력해주세요.'}
                inputBoxStyle={'default'}
              />
            </div>
            <div className="gap-y-4xs flex flex-col">
              <section className="gap-x-5xs sub2 flex">
                주소 <span className="text-conic-red-30">*</span>
              </section>
              <section className="gap-x-4xs flex">
                <Input
                  readonly={true}
                  onClick={() => {
                    // 주소 찾기 전에 현재 입력값 임시 저장
                    setModalState({ isSearchAddressModalOpen: true, isAddAddressInfoModalOpen: false })
                  }}
                  value={tempAddressData.postalCode}
                  inputBoxStyle={'default'}
                  placeholder={'우편번호 입력'}
                  customClassName={'w-full'}
                />
                <Button1
                  onClick={() => {
                    // 주소 찾기 전에 현재 입력값 임시 저장
                    setModalState({ isSearchAddressModalOpen: true, isAddAddressInfoModalOpen: false })
                  }}
                  styleSize={'lg'}
                  styleStatus={'default'}
                  styleType={'primary'}
                  customClassName={'whitespace-nowrap w-[120px]'}
                >
                  주소찾기
                </Button1>
              </section>
              <Input
                value={tempAddressData.streetAddress}
                inputBoxStyle={'default'}
                placeholder={'주소'}
                customClassName={'w-full'}
                readonly={true}
              />
              <Input
                value={tempAddressData.detailAddress}
                onChange={(e) => setTempAddressData({ ...tempAddressData, detailAddress: e.target.value })}
                inputBoxStyle={'default'}
                placeholder={'상세주소를 입력해주세요.'}
                customClassName={'w-full'}
              />
            </div>
          </section>
          <div
            onClick={() => {
              setTempAddressData({ ...tempAddressData, default: !tempAddressData.default })
            }}
            className="flex cursor-pointer items-center gap-x-2"
          >
            {tempAddressData.default ? (
              <CheckboxFillIcon width={24} height={24} />
            ) : (
              <UnCheckboxIcon width={24} height={24} />
            )}
            <div className="body1 text-gray-50">기본 배송지로 설정</div>
          </div>
        </div>
      </Modal.Content>
      <Modal.BottomButton>
        <div className="flex gap-x-3">
          <Button1
            onClick={() => {
              setModalState({ isAddAddressInfoModalOpen: false })
            }}
            styleSize="lg"
            styleType="outline"
            customClassName="w-full"
          >
            취소
          </Button1>
          <Button1
            onClick={handleRegister}
            styleSize="lg"
            disabled={!isVerified}
            styleStatus={isVerified ? 'default' : 'disabled'}
            styleType="primary"
            customClassName="w-full"
          >
            배송지 등록
          </Button1>
        </div>
      </Modal.BottomButton>
    </Modal>
  )
}
