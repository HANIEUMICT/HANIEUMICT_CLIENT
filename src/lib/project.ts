import { ApiResponse } from '@/type/common'
import { ProjectResponseType, ProjectType } from '@/type/project'
import { authorizedFetch } from '@/lib/common'

/**
 * 초기 프로젝트(공고) 생성 API
 */
export const postProjectInit = async (memberId: number): Promise<ApiResponse<ProjectResponseType>> => {
  const response = await authorizedFetch(`${process.env.NEXT_PUBLIC_BASE_URL}/v1/project/${memberId}/init`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
  })
  return await response.json()
}

/**
 * 프로젝트(공고) 수정 및 저장 API
 */
export const postProjectFinal = async (
  projectId: number,
  data: ProjectType | undefined
): Promise<ApiResponse<ProjectResponseType>> => {
  const response = await authorizedFetch(`${process.env.NEXT_PUBLIC_BASE_URL}/v1/project/${projectId}/final`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  })
  return await response.json()
}

/**
 * 프로젝트(공고) 수정 및 임시저장 API
 */
export const postProjectDraft = async (
  projectId: number,
  data: ProjectType | undefined
): Promise<ApiResponse<ProjectResponseType>> => {
  const response = await authorizedFetch(`${process.env.NEXT_PUBLIC_BASE_URL}/v1/project/${projectId}/draft`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  })
  return await response.json()
}

/**
 * 프로젝트(공고) 도면 업로드 API
 */
export const postProjectImageUpload = async (
  memberId: number,
  data: { projectId: number; drawingUrl: string }
): Promise<ApiResponse<ProjectResponseType>> => {
  const response = await authorizedFetch(`${process.env.NEXT_PUBLIC_BASE_URL}/v1/project/${memberId}/image`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  })
  return await response.json()
}

/**
 * 사용자 프로젝(공고) 조회 API
 */
export const getProject = async (
  memberId: number,
  status: 'TEMPORARY_SAVE' | 'INITIALIZE' | 'SUBMIT' | null
): Promise<ApiResponse<ProjectResponseType[]>> => {
  const response = await authorizedFetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/v1/project/${memberId}${status === null ? '' : `?status=${status}`}`,
    {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    }
  )
  return await response.json()
}
