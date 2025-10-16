import { ApiResponse } from '@/type/common'
import { CompanyInfoType } from '@/type/auth'
import { authorizedFetch } from '@/lib/common'

/**
 * 기업 정보 수정
 */
export const patchCompanyInfo = async (data: CompanyInfoType | undefined): Promise<ApiResponse<void>> => {
  const response = await authorizedFetch(`${process.env.NEXT_PUBLIC_BASE_URL}/v1/company`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  })
  return await response.json()
}
