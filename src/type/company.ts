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
    postal: string
    street: string
    detail: string
    addressName: string
    recipient: string
    phoneNumber: string
  }
}
export type CompanyStatusType = 'REGISTER_PENDING' | 'REGISTER_APPROVED' | 'REGISTER_REJECTED'

export interface CompanyDetailInfoType {
  company: CompanyType
  detail: CompanyDetailType
  equipments: EquipmentType[]
  portfolios: PortfolioType[]
}

export interface CompanyDetailType {
  detailId: number
  establishedAt: string
  logoUrl: string
  employeeCount: number
  websiteUrl: string
  contactAvailableTime: string
  description: string
  rating: number | null
  totalOrderCount: number
  repeatOrderCount: number
  avgProductionLeadHours: number | null
  avgResponseMinutes: number | null
}

export interface EquipmentType {
  id: number
  name: string
  quantity: number
  description: string
  imageUrls: string[]
}

export interface PortfolioType {
  id: number
  category: string
  quantity: number
  description: string
  imageUrls: string[]
}
