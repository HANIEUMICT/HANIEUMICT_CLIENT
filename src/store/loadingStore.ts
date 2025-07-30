import { create } from 'zustand'

interface SetLoadingStoreType {
  sendingEmailCodeLoading: boolean
}

interface LoadingStoreType {
  sendingEmailCodeLoading: boolean
  setState: (params: SetLoadingStoreType) => void
}

export const useLoadingStore = create<LoadingStoreType>((set) => ({
  sendingEmailCodeLoading: false,
  setState: (params: SetLoadingStoreType) => {
    set((state) => ({
      ...state,
      ...params,
    }))
  },
}))
