import Modal from '@/components/common/Modal'
import Input from '@/components/common/Input'
import Button1 from '@/components/common/Button1'
import { Dispatch, SetStateAction, useState } from 'react'
import { patchMemberProfile } from '@/lib/mypage'

interface IndividualPhoneChangeModalProps {
  setIsPhoneNumberChangeModalOpen: Dispatch<SetStateAction<boolean>>
}

export default function IndividualPhoneNumberChangeModal({
  setIsPhoneNumberChangeModalOpen,
}: IndividualPhoneChangeModalProps) {
  const [newPhoneNumber, setNewPhoneNumber] = useState<string>('')

  // 전화번호 포맷팅 함수
  const formatPhoneNumber = (value: string) => {
    // 숫자만 추출
    const numbers = value.replace(/[^\d]/g, '')

    // 길이에 따라 포맷팅
    if (numbers.length <= 3) {
      return numbers
    } else if (numbers.length <= 7) {
      return `${numbers.slice(0, 3)}-${numbers.slice(3)}`
    } else if (numbers.length <= 11) {
      return `${numbers.slice(0, 3)}-${numbers.slice(3, 7)}-${numbers.slice(7)}`
    } else {
      // 11자리 초과시 11자리까지만
      return `${numbers.slice(0, 3)}-${numbers.slice(3, 7)}-${numbers.slice(7, 11)}`
    }
  }

  const handlePhoneNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatPhoneNumber(e.target.value)
    setNewPhoneNumber(formatted)
  }

  return (
    <Modal>
      <Modal.Content>
        <div className="gap-y-s flex flex-col">
          <h2 className="h2">전화번호 변경</h2>
          <div className="flex flex-col gap-y-2">
            <p className="sub2 flex gap-x-1">
              전화번호
              <span className="text-conic-red-30">*</span>
            </p>
            <Input
              inputBoxStyle={'default'}
              placeholder={'전화번호를 입력해주세요.'}
              onChange={handlePhoneNumberChange}
              value={newPhoneNumber}
            />
          </div>
        </div>
      </Modal.Content>
      <Modal.BottomButton>
        <div className="flex gap-x-3">
          <Button1
            styleType={'outline'}
            onClick={() => {
              setIsPhoneNumberChangeModalOpen(false)
            }}
            customClassName={'w-full'}
            styleSize={'lg'}
            styleStatus={'default'}
          >
            취소
          </Button1>
          <Button1
            styleType={'primary'}
            onClick={async () => {
              const result = await patchMemberProfile({ newPhoneNumber: newPhoneNumber })
              if (result.result === 'SUCCESS') {
                console.log('전화번호 변경 성공', result)
                setIsPhoneNumberChangeModalOpen(false)
              }
            }}
            styleSize={'lg'}
            customClassName={'w-full'}
            disabled={newPhoneNumber.length <= 0}
            styleStatus={newPhoneNumber.length > 0 ? 'default' : 'disabled'}
          >
            변경완료
          </Button1>
        </div>
      </Modal.BottomButton>
    </Modal>
  )
}
