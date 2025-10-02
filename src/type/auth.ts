import { AddressRegisterRequestType } from '@/type/common'

export type CompanySignUpPageStepType = 'SearchCompanyInfoPage' | 'RegisterCompanyPage' | 'CompanyMemberSignUpPage'

export interface IndividualSignUpType {
  email?: string
  password?: string
  phoneNumber?: string
  termsOfServiceAgreed?: boolean
  role?: 'OWNER'
  addressRegisterRequest?: AddressRegisterRequestType
}
//기업 회원가입
export interface CompanySignUpType {
  name?: string
  email?: string
  password?: string
  phoneNumber?: string
  termsOfServiceAgreed?: boolean
  addressRegisterRequest?: AddressRegisterRequestType
}

//기업 등록
export interface CompanyInfoType {
  name?: string
  owner?: string
  email?: string
  phoneNumber?: string
  businessType?: string
  industry?: string
  registrationNumber?: string
  registrationCertificateUrl?: string
  bankbookCopy?: string
  profileUrl?: string
  addressRegisterRequest?: AddressRegisterRequestType
}

export interface SummaryCompanyInfoDataType {
  companyId?: number
  name?: string
  owner?: string
  addressRegisterRequest?: AddressRegisterRequestType
  registrationNumber?: string
  businessType?: string
}
export interface SummaryCompanyInfoResponseDataType {
  id: number
  name: string
  businessType: string
  owner: string
  registrationNumber: string
  address: {
    postal: string
    street: string
    detail: string
  }
}
export interface SignUpResponseType {
  memberInfo: {
    memberId: number
    memberName: string
    memberRole: 'INDIVIDUAL' | 'OWNER'
  }
  tokenInfo: {
    accessToken: string
    refreshToken: string
  }
}

export interface LoginType {
  email?: string
  password?: string
}

export interface LoginResponseType {
  accessToken: string
  refreshToken: string
  accessTokenExpiresIn: number
  refreshTokenExpiresIn: number
}
