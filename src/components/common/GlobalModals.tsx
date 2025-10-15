'use client'

import { useModalStore } from '@/store/modalStore'
import ServicePreparingModal from '@/components/modal/ServicePreparingModal'
import TokenExpiredModal from '@/components/modal/TokenExpiredModal'

export default function GlobalModals() {
  const isServicePreparingModalOpen = useModalStore((state) => state.isServicePreparingModalOpen)
  const isTokenExpiredModalOpen = useModalStore((state) => state.isTokenExpiredModalOpen)

  return (
    <>
      {isServicePreparingModalOpen ? <ServicePreparingModal /> : null}
      {isTokenExpiredModalOpen ? <TokenExpiredModal /> : null}
    </>
  )
}
