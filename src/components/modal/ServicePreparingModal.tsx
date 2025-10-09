import Modal from '@/components/common/Modal'
import Button1 from '@/components/common/Button1'
import { useModalStore } from '@/store/modalStore'

export default function ServicePreparingModal() {
  const setModalState = useModalStore((state) => state.setState)

  return (
    <Modal>
      <Modal.Content>
        <div className="gap-y-4xs flex flex-col">
          <h2 className="h2">현재 서비스 준비중에 있습니다.</h2>
          <p className="body1 text-gray-50">빠른 시일 내에 찾아뵙겠습니다.</p>
        </div>
      </Modal.Content>
      <Modal.BottomButton>
        <Button1
          onClick={() => {
            setModalState({ isServicePreparingModalOpen: false })
          }}
          styleStatus={'default'}
          styleType={'outline'}
        >
          닫기
        </Button1>
      </Modal.BottomButton>
    </Modal>
  )
}
