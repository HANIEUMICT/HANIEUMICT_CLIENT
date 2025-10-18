'use client'

import Modal from '@/components/common/Modal'
import Button1 from '@/components/common/Button1'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { useModalStore } from '@/store/modalStore'

export default function ProposalSentModal() {
  const router = useRouter()
  const setState = useModalStore((state) => state.setState)

  return (
    <Modal>
      <Modal.Content>
        <div>
          <h1 className="h2">견적서가 전달되었습니다.</h1>
          <Image alt={'성공'} src={'/success-graphic.svg'} width={336} height={240} />
        </div>
      </Modal.Content>
      <Modal.BottomButton>
        <div className="flex gap-x-3">
          <Button1
            customClassName={'w-full'}
            styleSize={'lg'}
            styleType={'outline'}
            styleStatus={'default'}
            onClick={() => {
              router.push('/project')
              setState({ isProposalSentModalOpen: false })
            }}
          >
            목록으로
          </Button1>
          <Button1
            customClassName={'w-full'}
            styleSize={'lg'}
            styleType={'primary'}
            styleStatus={'default'}
            onClick={() => {
              router.push('/mypage')
              setState({ isProposalSentModalOpen: false })
            }}
          >
            견적서 보기
          </Button1>
        </div>
      </Modal.BottomButton>
    </Modal>
  )
}
