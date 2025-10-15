import {
  CompanyInfoType,
  CompanySignUpType,
  IndividualSignUpType,
  LoginType,
  SignUpResponseType,
  SummaryCompanyInfoResponseDataType,
} from '@/type/auth'
import { ApiResponse, PaginationResultType } from '@/type/common'
import { ProjectResponseType } from '@/type/project'
import { authorizedFetch } from '@/lib/common'

/**
 * 소상공인 회원가입
 */
export const postAuthSignUp = async (data: IndividualSignUpType): Promise<ApiResponse<SignUpResponseType>> => {
  const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/v1/auth/signup/individual`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  })
  return await response.json()
}

/**
 * 소상공인 로그인
 */
export const postAuthLogin = async (data: LoginType): Promise<ApiResponse<SignUpResponseType>> => {
  const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/v1/auth/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  })
  return await response.json()
}

/**
 * 기업 등록 API
 */
export const postRegisterCompanyInfo = async (data: CompanyInfoType): Promise<ApiResponse<number>> => {
  const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/v1/company`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  })
  return await response.json()
}

/**
 * 기업 회원가입 API
 */
export const postCompanySignUp = async (
  data: CompanySignUpType | undefined,
  companyId: number | undefined
): Promise<ApiResponse<SignUpResponseType>> => {
  const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/v1/auth/signup/company/${companyId}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  })
  return await response.json()
}

/**
 * 기업 요약 리스트 불러오는 api
 */
export const getSummaryCompanyInfoList = async (
  name: string | undefined,
  page: number,
  size: number
): Promise<ApiResponse<PaginationResultType<SummaryCompanyInfoResponseDataType>>> => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/v1/company/summaries?${name ? `name=${name}&` : ''}page=${page}&size=${size}&sort=createdAt,DESC`,
    {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    }
  )
  return await response.json()
}
