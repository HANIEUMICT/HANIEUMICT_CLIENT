import { create } from 'zustand'

interface SetModalStoreType {
  isSearchAddressModalOpen?: boolean // kakao api
  isEstimateModalOpen?: boolean // 견적서를 불러오는 모달창 띄우기
  isAddAddressModalOpen?: boolean //주소 정보
  isServicePreparingModalOpen?: boolean
  isTranslationModalOpen?: boolean
}

interface ModalStoreType {
  isSearchAddressModalOpen: boolean // kakao api
  isEstimateModalOpen: boolean // 견적서를 불러오는 모달창 띄우기
  isAddAddressModalOpen: boolean
  isServicePreparingModalOpen: boolean
  isTranslationModalOpen: boolean
  setState: (params: SetModalStoreType) => void
}

export const useModalStore = create<ModalStoreType>((set) => ({
  isSearchAddressModalOpen: false, // kakao api
  isEstimateModalOpen: false, // 견적서를 불러오는 모달창 띄우기
  isAddAddressModalOpen: false,
  isServicePreparingModalOpen: false,
  isTranslationModalOpen: false,
  setState: (params: SetModalStoreType) => {
    set((state) => ({
      ...state,
      ...params,
    }))
  },
}))
