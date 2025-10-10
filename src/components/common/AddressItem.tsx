import Button1 from '@/components/common/Button1'
import { AddressRegisterRequestType } from '@/type/common'

interface AddressItemProps extends AddressRegisterRequestType {
  isDefault: boolean | undefined
  onDelete: () => void
  onEdit: () => void
}

export default function AddressItem({
  addressName,
  isDefault,
  streetAddress,
  detailAddress,
  phoneNumber,
  recipient,
  postalCode,
  onDelete,
  onEdit,
}: AddressItemProps) {
  return (
    <section className="p-s border-gray-20 flex gap-y-[16px] rounded-[24px] border bg-white">
      <div className="flex w-full flex-col gap-y-[16px]">
        <div className="flex justify-between">
          <div className="gap-x-4xs flex items-center">
            <h1 className="sub1">{addressName}</h1>
            {isDefault ? (
              <div className="badge text-conic-blue-30 bg-conic-blue-10 p-5xs w-fit rounded-[4px]">기본 배송지</div>
            ) : null}
          </div>
          <div className="flex h-fit gap-x-3">
            <Button1
              onClick={onDelete}
              styleType={'secondary'}
              styleSize={'sm'}
              styleStatus={'disabled'}
              customClassName={'text-gray-40 w-[80px] rounded-full h-[36px]'}
            >
              삭제
            </Button1>
            <Button1
              onClick={onEdit}
              styleType={'outline'}
              styleSize={'sm'}
              styleStatus={'disabled'}
              customClassName={'text-gray-40 w-[80px] rounded-full h-[36px]'}
            >
              수정
            </Button1>
          </div>
        </div>

        <div className="flex w-full flex-col gap-y-2">
          <div className="flex items-center gap-x-[7px]">
            <p className="body1 text-gray-40">수령인</p>
            <p className="button-lg">{recipient}</p>
          </div>
          <div className="flex items-center gap-x-[7px]">
            <p className="body1 text-gray-40">전화번호</p>
            <p className="button-lg">{phoneNumber}</p>
          </div>
          <div className="flex w-full flex-shrink-0 items-center gap-x-[7px]">
            <p className="body1 text-gray-40">주소</p>
            <p className="button-lg">
              {streetAddress} {detailAddress} {postalCode}
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
