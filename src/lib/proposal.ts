import { authorizedFetch } from '@/lib/common'
import { ApiResponse } from '@/type/common'
import { ProposalResponseType, ProposalType } from '@/type/proposal'
import { ProjectResponseType, ProjectType } from '@/type/project'

/**
 * 초기 견적서 생성 API
 */
export const postProposalInit = async (
  memberId: number | undefined,
  projectId: string | undefined
): Promise<ApiResponse<ProposalResponseType>> => {
  const response = await authorizedFetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/v1/proposal/${projectId}/${memberId}/init`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
    }
  )
  return await response.json()
}

/**
 * 견적서 수정 및 저장 API
 */
export const postProposalFinal = async (
  proposalId: number | undefined,
  data: ProposalType | null
): Promise<ApiResponse<ProposalResponseType>> => {
  const response = await authorizedFetch(`${process.env.NEXT_PUBLIC_BASE_URL}/v1/proposal/${proposalId}/final`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  })
  return await response.json()
}

/**
 * 견적서 수정 및 임시저장 API
 */
export const postProposalDraft = async (
  proposalId: number,
  data: ProposalType | undefined
): Promise<ApiResponse<ProposalResponseType>> => {
  const response = await authorizedFetch(`${process.env.NEXT_PUBLIC_BASE_URL}/v1/proposal/${proposalId}/draft`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  })
  return await response.json()
}

/**
 * 견적서 도면 업로드 API
 */
export const postProposalImageUpload = async (
  memberId: number | undefined,
  data: { proposalId: number; drawingUrl: string }
): Promise<string> => {
  const response = await authorizedFetch(`${process.env.NEXT_PUBLIC_BASE_URL}/v1/proposal/${memberId}/image`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  })
  return await response.json()
}
