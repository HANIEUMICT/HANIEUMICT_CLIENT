import { create } from 'zustand'
import { IndividualSignUpType, LoginType } from '@/type/auth'

interface SetAuthStoreType {
  individualSignUpData?: IndividualSignUpType | undefined
  loginData?: LoginType | undefined
  checkPassWord?: string | undefined // 비밀번호 확인
  isIndividualPasswordValid?: boolean | undefined //pw가 8~15자, 대소문자+숫자+기호를 포함하는지
  isIndividualPasswordMatch?: boolean | undefined //pw가 확인 비밀번호와 일치하는지
}

interface AuthStoreType {
  individualSignUpData: IndividualSignUpType | undefined
  loginData: LoginType | undefined
  checkPassWord: string | undefined // 비밀번호 확인
  isIndividualPasswordValid: boolean | undefined //pw가 8~15자, 대소문자+숫자+기호를 포함하는지
  isIndividualPasswordMatch: boolean | undefined //pw가 확인 비밀번호와 일치하는지
  setState: (params: SetAuthStoreType) => void
}

export const useAuthStore = create<AuthStoreType>((set) => ({
  individualSignUpData: undefined,
  loginData: undefined,
  checkPassWord: undefined, // 비밀번호 확인
  isIndividualPasswordValid: undefined, //pw가 8~15자, 대소문자+숫자+기호를 포함하는지
  isIndividualPasswordMatch: undefined, //pw가 확인 비밀번호와 일치하는지
  setState: (params: SetAuthStoreType) => {
    set((state) => ({
      ...state,
      ...params,
    }))
  },
}))
