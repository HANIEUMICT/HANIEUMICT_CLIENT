import { IndividualSignUpType, LoginType, SignUpResponseType } from '@/type/auth'
import { ApiResponse } from '@/type/common'

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
