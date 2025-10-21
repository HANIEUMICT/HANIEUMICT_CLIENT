import Modal from '@/components/common/Modal'
import Button1 from '@/components/common/Button1'
import { CheckboxFillIcon, UnCheckboxIcon } from '@/assets/svgComponents'
import { useRouter } from 'next/navigation'
import { Dispatch, SetStateAction } from 'react'
import { useModalStore } from '@/store/modalStore'
import { useProjectStore } from '@/store/projectStore'
import { useTranslation } from 'react-i18next'

interface CopyrightAgreementModalProps {
  agreement: boolean
  setAgreement: Dispatch<SetStateAction<boolean>>
}

export default function CopyrightAgreementModal({ agreement, setAgreement }: CopyrightAgreementModalProps) {
  const router = useRouter()
  const setModalState = useModalStore((state) => state.setState)
  const projectId = useProjectStore((state) => state.projectId)
  const { t } = useTranslation()

  return (
    <Modal>
      <Modal.Content>
        <div className="gap-y-s flex flex-col">
          <section className="flex flex-col gap-y-2">
            <h2 className="h2">
              {t('modal.copyrightAgreementModal.title1')}
              {` `}
              <span className="text-conic-red-30">{t('modal.copyrightAgreementModal.title2')}</span>
              {t('modal.copyrightAgreementModal.title3')}
            </h2>
          </section>
          <section className="border-gray-20 p-2xs body2 rounded-[16px] border text-gray-50">
            {t('modal.copyrightAgreementModal.content')}
          </section>
          <div
            onClick={() => {
              setAgreement(!agreement)
            }}
            className="flex cursor-pointer items-center gap-x-2"
          >
            {agreement ? <CheckboxFillIcon width={24} height={24} /> : <UnCheckboxIcon width={24} height={24} />}
            <p className="button-sm">{t('modal.copyrightAgreementModal.agreeButton')}</p>
          </div>
        </div>
      </Modal.Content>
      <Modal.BottomButton>
        <div className="flex gap-x-3">
          <Button1
            onClick={() => {
              setModalState({ isCopyrightAgreementModalOpen: false })
            }}
            styleSize="lg"
            styleType="outline"
            customClassName="w-full"
          >
            {t('modal.button.close')}
          </Button1>
          <Button1
            disabled={!agreement}
            onClick={() => {
              setModalState({ isCopyrightAgreementModalOpen: false })
              router.push(`/project/${projectId}`)
            }}
            styleSize="lg"
            styleType="primary"
            styleStatus={agreement ? 'default' : 'disabled'}
            customClassName="w-full"
          >
            {t('modal.button.copyRightAgreeButton')}
          </Button1>
        </div>
      </Modal.BottomButton>
    </Modal>
  )
}
