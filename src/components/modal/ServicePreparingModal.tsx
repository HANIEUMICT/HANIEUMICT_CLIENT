import Modal from '@/components/common/Modal'
import Button1 from '@/components/common/Button1'
import { useModalStore } from '@/store/modalStore'
import { useTranslation } from 'react-i18next'

export default function ServicePreparingModal() {
  const setModalState = useModalStore((state) => state.setState)
  const { t } = useTranslation()
  return (
    <Modal>
      <Modal.Content>
        <div className="gap-y-4xs flex flex-col">
          <h2 className="h2">{t('modal.servicePreparingModal.title')}</h2>
          <p className="body1 text-gray-50">{t('modal.servicePreparingModal.content')}</p>
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
          {t('modal.button.close')}
        </Button1>
      </Modal.BottomButton>
    </Modal>
  )
}
