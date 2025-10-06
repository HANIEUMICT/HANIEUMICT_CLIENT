import Modal from '@/components/common/Modal'
import Button1 from '@/components/common/Button1'
import { useModalStore } from '@/store/modalStore'
import Input from '@/components/common/Input'
import { UnCheckboxIcon } from '@/assets/svgComponents'

interface AddAddressInfoModalProps {}

export default function AddAddressInfoModal({}: AddAddressInfoModalProps) {
  const setState = useModalStore((state) => state.setState)
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
              <Input value={''} placeholder={'회사명, 집 등을 입력해주세요.'} inputBoxStyle={'default'} />
            </div>
            <div className="gap-y-4xs flex flex-col">
              <p className="sub2">
                수령인 <span className="text-conic-red-30">*</span>
              </p>
              <Input value={''} placeholder={'회사명, 집 등을 입력해주세요.'} inputBoxStyle={'default'} />
            </div>
            <div className="gap-y-4xs flex flex-col">
              <p className="sub2">
                연락처 <span className="text-conic-red-30">*</span>
              </p>
              <Input value={''} placeholder={'회사명, 집 등을 입력해주세요.'} inputBoxStyle={'default'} />
            </div>
            <div className="gap-y-4xs flex flex-col">
              <section className="gap-x-5xs sub2 flex">
                주소 <span className="text-conic-red-30">*</span>
              </section>
              <section className="gap-x-4xs flex">
                <Input
                  readonly={true}
                  onClick={() => {
                    setState({ isSearchAddressModalOpen: true })
                  }}
                  // value={individualSignUpData?.addressRegisterRequest?.postalCode ?? ''}
                  inputBoxStyle={'default'}
                  placeholder={'우편번호 입력'}
                  customClassName={'w-full'}
                />
                <Button1
                  onClick={() => {
                    setState({ isSearchAddressModalOpen: true })
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
                // value={individualSignUpData?.addressRegisterRequest?.streetAddress ?? ''}
                // onChange={(e) =>
                // }
                inputBoxStyle={'default'}
                placeholder={'주소'}
                customClassName={'w-full'}
              />
              <Input
                // value={individualSignUpData?.addressRegisterRequest?.detailAddress ?? ''}
                // onChange={(e) =>
                // }
                inputBoxStyle={'default'}
                placeholder={'상세주소를 입력해주세요.'}
                customClassName={'w-full'}
              />
            </div>
          </section>
          <div className="flex items-center gap-x-2">
            <UnCheckboxIcon width={24} height={24} />
            <p className="body1 text-gray-50">기본 배송지로 설정</p>
          </div>
        </div>
      </Modal.Content>
      <Modal.BottomButton>
        <div className="flex gap-x-3">
          <Button1
            onClick={() => {
              setState({ isAddAddressModalOpen: false })
            }}
            styleSize="lg"
            styleType="outline"
            customClassName="w-full"
          >
            취소
          </Button1>
          <Button1
            onClick={() => {
              setState({ isAddAddressModalOpen: false })
            }}
            styleSize="lg"
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
