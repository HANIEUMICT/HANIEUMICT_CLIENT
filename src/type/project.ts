export interface ProjectType {
  memberId?: number
  projectTitle?: string
  category?: string
  categoryDetail?: string
  categoryDetailEtc?: string
  purpose?: string
  purposeEtc?: string
  projectQuantity?: number
  requests?: string
  deadline?: string
  canDeadlineChange?: boolean
  requestEstimate?: number
  publicUntil?: string | null
  projectStatus?: string
  canPhoneConsult?: boolean
  deliveryAddress?: string
  submitStatus?: string
}

export interface ProjectResponseType {
  projectId: number
  projectRegisterRequest: ProjectType
}
