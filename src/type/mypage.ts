export type IndividualSideBarType = '내 정보' | '배송 정보' | '견적서' | '주문 정보' | '관심 공급업체'
export type CompanySideBarType = '내 정보' | '견적서' | '주문 정보'

export interface AddressResponseType {
  id: number
  postalCode: string
  streetAddress: string
  detailAddress: string
  addressName: string
  recipient: string
  phoneNumber: string
  isDefault: boolean
}

export interface AddressType {
  addressName?: string
  recipient?: string
  phoneNumber?: string
  postalCode?: string
  streetAddress?: string
  detailAddress?: string
  default?: boolean
}
