import { FileInfoType } from '@/type/common'

export interface RegisterFactoryDataType {
  detail?: RegisterFactoryDetailType
  equipments?: RegisterFactoryEquipmentType[]
  portfolios?: RegisterFactoryPortfolioType[]
}
export interface RegisterFactoryDetailType {
  establishedAt?: string
  logoUrl?: string
  employeeCount?: number
  websiteUrl?: string
  contactAvailableTime?: string
  description?: string
}
export interface RegisterFactoryEquipmentType {
  name?: string
  description?: string
  quantity?: number
  imageUrl?: string[] | FileInfoType[]
}

export interface RegisterFactoryPortfolioType {
  quantity?: number
  description?: string
  imageUrl?: string[] | FileInfoType[]
  category?: string
}
