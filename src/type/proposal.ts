export interface ProposalType {
  projectId?: number
  companyId?: number
  totalPrice?: number
  firstPrice?: number
  secondPrice?: number
  proposalNote?: string
  operateUntil?: string
  items?: ItemType[]
  proposalBidStatus?: ProposalStatusType
  submitStatus?: ProposalStatusType
}
export interface ItemType {
  itemName: string
  itemSize: string
  itemNote: string
  itemUnitPrice: number
  itemQuantity: number
}
export type ProposalStatusType = 'INITIALIZE' | 'TEMPORARY_SAVE' | 'SUBMIT'

export interface ProposalResponseType {
  proposalId: number
  modifiedAt: string
  proposalRegisterRequest: ProposalType
}
