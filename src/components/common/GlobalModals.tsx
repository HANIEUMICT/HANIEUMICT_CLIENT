'use client'

import { useModalStore } from '@/store/modalStore'
import ServicePreparingModal from '@/components/modal/ServicePreparingModal'

export default function GlobalModals() {
  const isServicePreparingModalOpen = useModalStore((state) => state.isServicePreparingModalOpen)
  return <>{isServicePreparingModalOpen ? <ServicePreparingModal /> : null}</>
}
