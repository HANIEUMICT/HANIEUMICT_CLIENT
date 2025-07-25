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
}
export interface SignUpResponseType {
  accessToken: string
  refreshToken: string
  memberId: number
}
