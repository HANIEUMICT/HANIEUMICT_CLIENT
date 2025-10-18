'use client'

import ProposalSentModal from '@/components/modal/ProposalSentModal'
import { useModalStore } from '@/store/modalStore'

export default function ProposalPageClient() {
  const isProposalSentModalOpen = useModalStore((state) => state.isProposalSentModalOpen)
  return <>{isProposalSentModalOpen && <ProposalSentModal />}</>
}
