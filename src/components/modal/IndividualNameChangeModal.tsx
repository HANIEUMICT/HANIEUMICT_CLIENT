import Modal from '@/components/common/Modal'
import Button1 from '@/components/common/Button1'
import Input from '@/components/common/Input'
import { Dispatch, SetStateAction, useState } from 'react'
import { patchMemberMeName, patchMemberProfile } from '@/lib/mypage'
import { useToast } from '@/provider/ToastProvider'

interface NameChangeModalProps {
  setIsNameChangeModalOpen: Dispatch<SetStateAction<boolean>>
}

export default function IndividualNameChangeModal({ setIsNameChangeModalOpen }: NameChangeModalProps) {
  const [newName, setNewName] = useState<string>('')
  const { showToast } = useToast()

  const handleToastSuccess = () => {
    showToast('성공적으로 저장되었습니다!', 'success')
  }

  const handleToastError = () => {
    showToast('오류가 발생했습니다.', 'error')
  }

  return (
    <Modal>
      <Modal.Content>
        <div className="gap-y-s flex flex-col">
          <h2 className="h2">이름 변경</h2>
          <div className="flex flex-col gap-y-2">
            <p className="sub2 flex gap-x-1">
              이름
              <span className="text-conic-red-30">*</span>
            </p>
            <Input
              inputBoxStyle={'default'}
              placeholder={'이름을 입력해주세요.'}
              onChange={(e) => {
                setNewName(e.target.value)
              }}
              value={newName}
            />
          </div>
        </div>
      </Modal.Content>
      <Modal.BottomButton>
        <div className="flex gap-x-3">
          <Button1
            styleType={'outline'}
            onClick={() => {
              setIsNameChangeModalOpen(false)
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
              const result = await patchMemberMeName(newName)
              if (result.result === 'SUCCESS') {
                handleToastSuccess()
                setIsNameChangeModalOpen(false)
              } else {
                handleToastError()
              }
            }}
            styleSize={'lg'}
            customClassName={'w-full'}
            disabled={newName.length <= 0}
            styleStatus={newName.length > 0 ? 'default' : 'disabled'}
          >
            변경완료
          </Button1>
        </div>
      </Modal.BottomButton>
    </Modal>
  )
}
