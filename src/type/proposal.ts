export interface ProposalType {
  projectId?: number
  companyId?: number
  totalPrice?: number
  firstPrice?: number
  secondPrice?: number
  proposalNote?: string
  operateUntil?: string
  items?: ItemType[]
  proposalBidStatus?: ProposalBidStatusType
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
export type ProposalBidStatusType = 'PRE_BID' | 'BID_CLOSED' | 'BIDDING'

export interface ProposalResponseType {
  proposalId: number
  modifiedAt: string
  proposalRegisterRequest: ProposalType
}
