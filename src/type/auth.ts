export type CompanySignUpPageStepType =
  | 'SearchCompanyInfoPage'
  | 'InputCompanyInfoPage'
  | 'RegisterCompanyPage'
  | 'InputRegisterCompanyInfoPage'

export interface IndividualSignUpType {
  email?: string
  password?: string
  phoneNumber?: string
  termsOfServiceAgreed?: boolean
  role?: 'OWNER'
  zipcode?: string
  address1?: string
  address2?: string
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
