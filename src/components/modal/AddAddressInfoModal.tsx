import Modal from '@/components/common/Modal'
import Button1 from '@/components/common/Button1'
import { useModalStore } from '@/store/modalStore'
import Input from '@/components/common/Input'
import { CheckboxFillIcon, UnCheckboxIcon } from '@/assets/svgComponents'
import { useMyPageStore } from '@/store/mypageStore'
import { useEffect, useMemo } from 'react'
import { formatPhoneNumber } from '@/utils/common'
import { patchMemberAddresses } from '@/lib/mypage'

interface AddAddressInfoModalProps {}

export default function AddAddressInfoModal({}: AddAddressInfoModalProps) {
  const setModalState = useModalStore((state) => state.setState)
  const setMyPageState = useMyPageStore((state) => state.setState)
  const addressData = useMyPageStore((state) => state.addressData)

  useEffect(() => {
    console.log('addressData', addressData)
  }, [addressData])

  const handlePhoneNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatPhoneNumber(e.target.value)
    setMyPageState({ ...addressData, addressData: { ...addressData, phoneNumber: formatted } })
  }

  const isVerified = useMemo(() => {
    return !!(
      addressData?.addressName &&
      addressData?.recipient &&
      addressData?.phoneNumber &&
      addressData?.postalCode &&
      addressData?.streetAddress &&
      addressData?.detailAddress
    )
  }, [
    addressData?.addressName,
    addressData?.recipient,
    addressData?.phoneNumber,
    addressData?.postalCode,
    addressData?.streetAddress,
    addressData?.detailAddress,
  ])

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
                  setMyPageState({
                    ...addressData,
                    addressData: {
                      ...addressData,
                      addressName: e.target.value, // 수령지 이름
                    },
                  })
                }}
                value={addressData?.addressName ?? ''}
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
                  setMyPageState({
                    ...addressData,
                    addressData: {
                      ...addressData,
                      recipient: e.target.value, // 수령 전화번호
                    },
                  })
                }}
                value={addressData?.recipient ?? ''}
                placeholder={'회사명, 집 등을 입력해주세요.'}
                inputBoxStyle={'default'}
              />
            </div>
            <div className="gap-y-4xs flex flex-col">
              <p className="sub2">
                연락처 <span className="text-conic-red-30">*</span>
              </p>
              <Input
                onChange={handlePhoneNumberChange}
                value={addressData?.phoneNumber ?? ''}
                placeholder={'회사명, 집 등을 입력해주세요.'}
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
                    setModalState({ isSearchAddressModalOpen: true, isAddAddressInfoModalOpen: false })
                  }}
                  value={addressData?.postalCode ?? ''}
                  inputBoxStyle={'default'}
                  placeholder={'우편번호 입력'}
                  customClassName={'w-full'}
                />
                <Button1
                  onClick={() => {
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
                value={addressData?.streetAddress ?? ''}
                inputBoxStyle={'default'}
                placeholder={'주소'}
                customClassName={'w-full'}
              />
              <Input
                value={addressData?.detailAddress ?? ''}
                onChange={(e) =>
                  setMyPageState({
                    ...addressData,
                    addressData: {
                      ...addressData,
                      detailAddress: e.target.value, // 전체 도로명 주소
                    },
                  })
                }
                inputBoxStyle={'default'}
                placeholder={'상세주소를 입력해주세요.'}
                customClassName={'w-full'}
              />
            </div>
          </section>
          <div
            onClick={() => {
              setMyPageState({ ...addressData, addressData: { ...addressData, default: true } })
            }}
            className="flex items-center gap-x-2"
          >
            {addressData?.default ? (
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
            onClick={async () => {
              if (addressData) {
                const response = await patchMemberAddresses(addressData)
                if (response.result === 'SUCCESS') {
                  console.log('배송지 추가 완료', response)
                  setMyPageState({ addressData: undefined })
                  setModalState({ isAddAddressInfoModalOpen: false })
                }
              }
            }}
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
