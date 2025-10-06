import Modal from '@/components/common/Modal'
import Button1 from '@/components/common/Button1'
import { useModalStore } from '@/store/modalStore'

export default function ServicePreparingModal() {
  const setModalState = useModalStore((state) => state.setState)

  return (
    <Modal>
      <Modal.Content>
        <p>현재 서비스 준비중에 있습니다.</p>
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
