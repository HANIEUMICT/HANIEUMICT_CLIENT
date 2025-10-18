import Modal from '@/components/common/Modal'
import Button1 from '@/components/common/Button1'
import { CheckboxFillIcon, UnCheckboxIcon } from '@/assets/svgComponents'
import { useRouter } from 'next/navigation'
import { Dispatch, SetStateAction } from 'react'
import { useModalStore } from '@/store/modalStore'
import { useProjectStore } from '@/store/projectStore'

interface CopyrightAgreementModalProps {
  agreement: boolean
  setAgreement: Dispatch<SetStateAction<boolean>>
}

export default function CopyrightAgreementModal({ agreement, setAgreement }: CopyrightAgreementModalProps) {
  const router = useRouter()
  const setModalState = useModalStore((state) => state.setState)
  const projectId = useProjectStore((state) => state.projectId)

  return (
    <Modal>
      <Modal.Content>
        <div className="gap-y-s flex flex-col">
          <section className="flex flex-col gap-y-2">
            <h2 className="h2">
              견적서를 보기 위해선 {` `}
              <span className="text-conic-red-30">저작권 동의</span>가 필요합니다.
            </h2>
          </section>
          <section className="border-gray-20 p-2xs body2 rounded-[16px] border text-gray-50">sdfsdfsdfsdf</section>
          <div
            onClick={() => {
              setAgreement(!agreement)
            }}
            className="flex cursor-pointer items-center gap-x-2"
          >
            {agreement ? <CheckboxFillIcon width={24} height={24} /> : <UnCheckboxIcon width={24} height={24} />}
            <p className="button-sm">저작권 관련된 법을 확인하였습니다. 문제 발생시 책임은 본인에게 있습니다.</p>
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
            닫기
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
            동의하고 견적서 보기
          </Button1>
        </div>
      </Modal.BottomButton>
    </Modal>
  )
}
