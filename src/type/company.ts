export interface CompanyType {
  id: number
  name: string
  owner: string
  email: string
  phoneNumber: string
  businessType: string
  industry: string
  registrationNumber: string
  registrationCertificateUrl: string
  bankbookCopy: string
  profileUrl: string
  status: CompanyStatusType
  address: {
    zipCode: string
    road: string
    detail: string
  }
}
export type CompanyStatusType = 'REGISTER_PENDING' | 'REGISTER_APPROVED' | 'REGISTER_REJECTED'
