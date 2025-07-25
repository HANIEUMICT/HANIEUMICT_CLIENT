import { create } from 'zustand'

interface SetModalStoreType {
  isSearchAddressModalOpen?: boolean
}

interface ModalStoreType {
  isSearchAddressModalOpen: boolean
  setState: (params: SetModalStoreType) => void
}

export const useModalStore = create<ModalStoreType>((set) => ({
  isSearchAddressModalOpen: false,
  setState: (params: SetModalStoreType) => {
    set((state) => ({
      ...state,
      ...params,
    }))
  },
}))
