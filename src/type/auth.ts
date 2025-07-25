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
  accessToken: string
  refreshToken: string
  memberId: number
}
