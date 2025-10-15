export interface ProjectType {
  memberId?: number | null
  projectTitle?: string | null
  category?: string | null
  categoryDetail?: string | null
  categoryDetailEtc?: string | null
  purpose?: string | null
  purposeEtc?: string | null
  projectQuantity?: number | null
  requests?: string | null
  deadline?: string | null
  canDeadlineChange?: boolean
  requestEstimate?: number | null
  publicUntil?: string | null
  projectStatus?: string | null
  canPhoneConsult?: boolean | undefined
  deliveryAddress?: string | null
  projectBidStatus: 'PRE_BID' | 'BID_CLOSED' | 'BIDDING' | null
  submitStatus?: string | null
}

export interface ProjectResponseType {
  projectId: number
  modifiedAt: string
  projectRegisterRequest: ProjectType
  drawingUrls: string[]
}

export interface ProjectDetailResponseType {
  projectDetailResponse: {
    projectId: number
    modifiedAt: string
    projectRegisterRequest: ProjectType
    drawingUrls: string[]
  }
  proposalThumbnails: proposalThumbnailType[]
}
export interface proposalThumbnailType {
  proposalId: number
  companyThumbnailResponse: {
    companyId: number
    companyName: string
    profileUrl: string
  }
  totalPrice: number
  operateUntil: string
}
