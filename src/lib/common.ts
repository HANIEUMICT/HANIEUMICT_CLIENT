import { ApiResponse } from '@/type/common'

/**
 * 이메일 코드 전송
 */
export const postSendEmailCode = async (email: string): Promise<ApiResponse<{}>> => {
  const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/v1/email`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(email),
  })
  return await response.json()
}

/**
 * 이메일 인증
 */
export const postEmailValidation = async (data: { email: string; authCode: string }): Promise<ApiResponse<{}>> => {
  const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/v1/email`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  })
  return await response.json()
}
