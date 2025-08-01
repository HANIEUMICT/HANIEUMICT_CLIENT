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
  canDeadlineChange?: boolean | null
  requestEstimate?: number | null
  publicUntil?: string | null
  projectStatus?: string | null
  canPhoneConsult?: boolean | null
  deliveryAddress?: string | null
  submitStatus?: string | null
}

export interface ProjectResponseType {
  projectId: number
  projectRegisterRequest: ProjectType
}
