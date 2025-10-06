import { ApiResponse } from '@/type/common'
import { authorizedFetch } from '@/lib/common'
import { CompanyType } from '@/type/company'

/**
 * 특정 기업 정보 조회
 */
export const getCompany = async (
  companyId: string | string[] | number | undefined
): Promise<ApiResponse<CompanyType>> => {
  const response = await authorizedFetch(`${process.env.NEXT_PUBLIC_BASE_URL}/v1/company/${companyId}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
  return await response.json()
}
