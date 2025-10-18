import { ApiResponse, PaginationResultType } from '@/type/common'
import { serverAuthorizedFetch } from '@/lib/utils/http'
import { ProjectDetailResponseType, ProjectResponseType } from '@/type/project'

/**
 * 특정 기업 정보 조회
 */
export const getProjectMeCompany = async (
  page: number,
  size: number
): Promise<ApiResponse<PaginationResultType<ProjectResponseType>>> => {
  const response = await serverAuthorizedFetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/v1/project/me/company?page=${page}&size=${size}&sort=createdAt%2CDESC`,
    {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    }
  )
  return await response.json()
}

/**
 * 사용자 프로젝트(공고) 상세 조회 API
 */
export const getProjectDetail = async (
  projectId: string | string[] | number | undefined
): Promise<ApiResponse<ProjectDetailResponseType>> => {
  const response = await serverAuthorizedFetch(`${process.env.NEXT_PUBLIC_BASE_URL}/v1/project/${projectId}/detail`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
  return await response.json()
}

/**
 * 사용자 프로젝트(공고) 조회 API
 */
export const getProject = async (
  memberId: number | null,
  status: 'TEMPORARY_SAVE' | 'INITIALIZE' | 'SUBMIT' | null,
  page: number,
  size: number
): Promise<ApiResponse<PaginationResultType<ProjectResponseType>>> => {
  const response = await serverAuthorizedFetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/v1/project${status === null ? '' : `?status=${status}`}${memberId ? `&${memberId}` : ''}&page=${page}&size=${size}`,
    {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    }
  )
  return await response.json()
}
