'use client'

import AddAddressInfoModal from '@/components/modal/AddAddressInfoModal'
import { useModalStore } from '@/store/modalStore'

export default function MyPage() {
  const isAddAddressModalOpen = useModalStore((state) => state.isAddAddressModalOpen)

  return <main>{isAddAddressModalOpen && <AddAddressInfoModal />}</main>
}
