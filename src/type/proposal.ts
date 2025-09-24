export interface ProposalType {
  projectId?: number
  companyId?: number
  totalPrice?: number
  firstPrice?: number
  secondPrice?: number
  proposalNote?: string
  items?: ItemType[]
  proposalBidStatus?: 'INITIALIZE' | 'TEMPORARY_SAVE' | 'SUBMIT'
  submitStatus?: 'INITIALIZE' | 'TEMPORARY_SAVE' | 'SUBMIT'
}
export interface ItemType {
  itemName: string
  itemSize: string
  itemNote: string
  itemUnitPrice: number
  itemQuantity: number
}
