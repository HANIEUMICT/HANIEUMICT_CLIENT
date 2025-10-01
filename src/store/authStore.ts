import { create } from 'zustand'
import {
  CompanyInfoType,
  CompanySignUpType,
  IndividualSignUpType,
  LoginType,
  SummaryCompanyInfoDataType,
} from '@/type/auth'
import { FileInfoType } from '@/type/common'

interface SetAuthStoreType {
  individualSignUpData?: IndividualSignUpType | undefined
  companySignUpData?: CompanySignUpType | undefined
  registerCompanyInfoData?: CompanyInfoType | undefined
  summaryCompanyInfoData?: SummaryCompanyInfoDataType | undefined
  companyLogoFile?: FileInfoType | undefined
  businessRegistrationFile?: FileInfoType | undefined
  bankbookCopyFile?: FileInfoType | undefined
  loginData?: LoginType | undefined
  checkIndividualPassWord?: string | undefined // 비밀번호 확인
  checkCompanyPassWord?: string | undefined // 비밀번호 확인
  isIndividualPasswordValid?: boolean | undefined //pw가 8~15자, 대소문자+숫자+기호를 포함하는지
  isIndividualPasswordMatch?: boolean | undefined //pw가 확인 비밀번호와 일치하는지
  isCompanyPasswordValid?: boolean | undefined
  isCompanyPasswordMatch?: boolean | undefined
}

interface AuthStoreType {
  individualSignUpData: IndividualSignUpType | undefined
  companySignUpData: CompanySignUpType | undefined
  registerCompanyInfoData: CompanyInfoType | undefined
  summaryCompanyInfoData: SummaryCompanyInfoDataType | undefined
  companyLogoFile: FileInfoType | undefined
  businessRegistrationFile: FileInfoType | undefined
  bankbookCopyFile: FileInfoType | undefined
  loginData: LoginType | undefined
  checkIndividualPassWord: string | undefined // 비밀번호 확인
  checkCompanyPassWord: string | undefined // 비밀번호 확인
  isIndividualPasswordValid: boolean | undefined //pw가 8~15자, 대소문자+숫자+기호를 포함하는지
  isIndividualPasswordMatch: boolean | undefined //pw가 확인 비밀번호와 일치하는지
  isCompanyPasswordValid: boolean | undefined //pw가 8~15자, 대소문자+숫자+기호를 포함하는지
  isCompanyPasswordMatch: boolean | undefined //pw가 확인 비밀번호와 일치하는지
  setState: (params: SetAuthStoreType) => void
}

export const useAuthStore = create<AuthStoreType>((set) => ({
  individualSignUpData: undefined,
  companySignUpData: undefined,
  registerCompanyInfoData: undefined,
  summaryCompanyInfoData: undefined,
  companyLogoFile: undefined,
  businessRegistrationFile: undefined,
  bankbookCopyFile: undefined,
  loginData: undefined,
  checkIndividualPassWord: undefined, // 비밀번호 확인
  checkCompanyPassWord: undefined, // 비밀번호 확인
  isIndividualPasswordValid: undefined, //pw가 8~15자, 대소문자+숫자+기호를 포함하는지
  isIndividualPasswordMatch: undefined, //pw가 확인 비밀번호와 일치하는지
  isCompanyPasswordValid: undefined, //pw가 8~15자, 대소문자+숫자+기호를 포함하는지
  isCompanyPasswordMatch: undefined, //pw가 확인 비밀번호와 일치하는지
  setState: (params: SetAuthStoreType) => {
    set((state) => ({
      ...state,
      ...params,
    }))
  },
}))
