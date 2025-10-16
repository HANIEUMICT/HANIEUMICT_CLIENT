import { serverAuthorizedFetch } from '@/lib/utils/http'
import { ApiResponse } from '@/type/common'
import { CompanyDetailInfoType, CompanyType } from '@/type/company'

/**
 * 특정 기업 정보 조회
 */
export const getCompany = async (
  companyId: string | string[] | number | undefined
): Promise<ApiResponse<CompanyType>> => {
  const response = await serverAuthorizedFetch(`${process.env.NEXT_PUBLIC_BASE_URL}/v1/company/${companyId}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
  return await response.json()
}

/**
 * 기업 상세 페이지 단건 조회
 */
export const getCompanyDetail = async (
  companyId: string | string[] | number | undefined
): Promise<ApiResponse<CompanyDetailInfoType>> => {
  const response = await serverAuthorizedFetch(`${process.env.NEXT_PUBLIC_BASE_URL}/v1/company/detail/${companyId}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
  return await response.json()
}
