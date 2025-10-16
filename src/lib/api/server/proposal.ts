import { ApiResponse, PaginationResultType } from '@/type/common'
import { serverAuthorizedFetch } from '@/lib/utils/http'
import { ProposalType } from '@/type/proposal'

/**
 * 특정 기업 정보 조회
 */
export const getProposalMe = async (
  page: number,
  size: number
): Promise<ApiResponse<PaginationResultType<ProposalType>>> => {
  const response = await serverAuthorizedFetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/v1/proposal/me?page=${page}&size=${size}&sort=createdAt%2CDESC`,
    {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    }
  )
  return await response.json()
}
