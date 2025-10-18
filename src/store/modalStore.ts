import { create } from 'zustand'

interface SetModalStoreType {
  isSearchAddressModalOpen?: boolean // kakao api
  isEstimateModalOpen?: boolean // 견적서를 불러오는 모달창 띄우기
  isAddAddressInfoModalOpen?: boolean //주소 모달
  isServicePreparingModalOpen?: boolean
  isTranslationModalOpen?: boolean
  //로그인 만료되어있을 때 띄우는 state
  isTokenExpiredModalOpen?: boolean
  //저작권 동의 모달 state
  isCopyrightAgreementModalOpen?: boolean
  //기업 견적서 제출 완료 모달 state
  isProposalSentModalOpen?: boolean
}

interface ModalStoreType {
  isSearchAddressModalOpen: boolean // kakao api
  isEstimateModalOpen: boolean // 견적서를 불러오는 모달창 띄우기
  isAddAddressInfoModalOpen?: boolean //주소 모달
  isServicePreparingModalOpen: boolean
  isTranslationModalOpen: boolean
  isTokenExpiredModalOpen: boolean
  isCopyrightAgreementModalOpen: boolean
  isProposalSentModalOpen: boolean
  setState: (params: SetModalStoreType) => void
}

export const useModalStore = create<ModalStoreType>((set) => ({
  isSearchAddressModalOpen: false, // kakao api
  isEstimateModalOpen: false, // 견적서를 불러오는 모달창 띄우기
  isAddAddressInfoModalOpen: false, //주소 모달
  isServicePreparingModalOpen: false,
  isTranslationModalOpen: false,
  isTokenExpiredModalOpen: false,
  isCopyrightAgreementModalOpen: false,
  isProposalSentModalOpen: false,
  setState: (params: SetModalStoreType) => {
    set((state) => ({
      ...state,
      ...params,
    }))
  },
}))
