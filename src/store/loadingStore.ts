import { create } from 'zustand'

interface SetLoadingStoreType {}

interface LoadingStoreType {
  setState: (params: SetLoadingStoreType) => void
}

export const useLoadingStore = create<LoadingStoreType>((set) => ({
  setState: (params: SetLoadingStoreType) => {
    set((state) => ({
      ...state,
      ...params,
    }))
  },
}))
