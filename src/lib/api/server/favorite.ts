import { ApiResponse, PaginationResultType } from '@/type/common'
import { serverAuthorizedFetch } from '@/lib/utils/http'
import { ProjectResponseType, ProjectType } from '@/type/project'

/**
 * 특정 기업 정보 조회
 */
export const getCompanyFavorites = async (
  page: number,
  size: number
): Promise<ApiResponse<PaginationResultType<ProjectResponseType>>> => {
  const response = await serverAuthorizedFetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/v1/company/favorites?page=${page}&size=${size}&sort=createdAt%2CDESC`,
    {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    }
  )
  return await response.json()
}
