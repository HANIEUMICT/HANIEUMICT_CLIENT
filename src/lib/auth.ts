import { IndividualSignUpType, SignUpResponseType } from '@/type/auth'
import { ApiResponse } from '@/type/common'

/**
 * 소상공인 회원가입
 */
export const postAuthSignUp = async (data: IndividualSignUpType): Promise<ApiResponse<SignUpResponseType>> => {
  const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/v1/auth/signup`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  })
  return await response.json()
}
