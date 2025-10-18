'use client'

import CopyrightAgreementModal from '@/components/modal/CopyrightAgreementModal'
import { useModalStore } from '@/store/modalStore'
import { useState } from 'react'

export default function ProjectPageClient() {
  const isCopyrightAgreementModalOpen = useModalStore((state) => state.isCopyrightAgreementModalOpen)
  const [agreement, setAgreement] = useState(false)

  return (
    <>
      {isCopyrightAgreementModalOpen && <CopyrightAgreementModal setAgreement={setAgreement} agreement={agreement} />}
    </>
  )
}
