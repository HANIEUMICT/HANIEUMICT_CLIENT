import { create } from 'zustand'
import { AddressType } from '@/type/mypage'

interface SetMyPageStoreType {
  addressData?: AddressType | undefined
}

interface MyPageStoreType {
  addressData: AddressType | undefined
  setState: (params: SetMyPageStoreType) => void
}

export const useMyPageStore = create<MyPageStoreType>((set) => ({
  addressData: undefined,
  setState: (params: SetMyPageStoreType) => {
    set((state) => ({
      ...state,
      ...params,
    }))
  },
}))
