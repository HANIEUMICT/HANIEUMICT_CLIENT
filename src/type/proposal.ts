export interface ProposalType {
  proposalId?: number
  projectId?: number
  companyId?: number
  totalPrice?: number
  firstPrice?: number
  secondPrice?: number
  proposalNote?: string
  submitStatus?: ProposalStatusType
  operateUntil?: string
  items?: ItemType[]
  drawingFiles?: DrawingFileType[]
  proposalBidStatus?: ProposalBidStatusType
}
export interface ItemType {
  itemId?: number
  itemName: string
  itemSize: string
  itemNote: string
  itemUnitPrice: number
  itemQuantity: number
  totalAmount?: number
}
export type ProposalStatusType = 'INITIALIZE' | 'TEMPORARY_SAVE' | 'SUBMIT'
export type ProposalBidStatusType = 'PRE_BID' | 'BID_CLOSED' | 'BIDDING'

export interface ProposalResponseType {
  proposalId: number
  modifiedAt: string
  proposalRegisterRequest: ProposalType
}

export interface DrawingFileType {
  drawingFileId: number
  drawingUrl: string
}
