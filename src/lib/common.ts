import Cookies from 'js-cookie'

import { ApiResponse } from '@/type/common'
import { LoginResponseType } from '@/type/auth'

/**
 * 이메일 코드 전송
 */
export const postSendEmailCode = async (email: string): Promise<ApiResponse<string>> => {
  const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/v1/email`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email }),
  })
  return await response.json()
}

/**
 * 이메일 인증
 */
export const postEmailValidation = async (data: { email: string; authCode: string }): Promise<ApiResponse<boolean>> => {
  const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/v1/email/certificate`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  })
  return await response.json()
}

/**
 * 기본 api 요청 함수
 * @param input
 * @param init
 * @param retry
 */
export const authorizedFetch = async (input: RequestInfo, init: RequestInit = {}, retry = true): Promise<Response> => {
  const accessToken = Cookies.get('accessToken')
  const isFormData = init.body instanceof FormData

  const headers: Record<string, string> = {
    ...(init.headers as Record<string, string>),
    Authorization: `Bearer ${accessToken}`,
  }

  if (!isFormData && !headers['Content-Type']) {
    headers['Content-Type'] = 'application/json'
  }

  const response = await fetch(input, {
    ...init,
    headers,
    credentials: 'include',
  })

  if (response.status === 401 && retry) {
    const refreshed = await refreshAccessToken()
    if (refreshed) {
      return authorizedFetch(input, init, false)
    }
  }

  return response
}
/**
 * refreshToken을 이용해 accessToken 재발급
 */
const refreshAccessToken = async (): Promise<boolean> => {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/v1/auth/refresh`, {
      method: 'POST',
      credentials: 'include', // refreshToken이 쿠키에 있다고 가정
    })

    if (!res.ok) {
      console.warn('🔐 Refresh token 만료 또는 유효하지 않음')
      Cookies.remove('accessToken')
      Cookies.remove('refreshToken')
      return false
    }

    const response: ApiResponse<LoginResponseType> = await res.json()

    // API 응답이 성공이고 데이터가 있는 경우
    if (response.result === 'success' && response.data) {
      const { accessToken, refreshToken } = response.data

      if (accessToken && refreshToken) {
        Cookies.set('accessToken', accessToken)
        Cookies.set('refreshToken', refreshToken)
        return true
      }
    }

    // API 응답이 실패인 경우
    console.warn('🔐 토큰 갱신 API 응답 실패:', response.error?.message)
    Cookies.remove('accessToken')
    Cookies.remove('refreshToken')
    return false
  } catch (e) {
    console.error('🚨 토큰 갱신 실패:', e)
    Cookies.remove('accessToken')
    Cookies.remove('refreshToken')
    return false
  }
}

/**
 * 이미지 업로드
 */
export const postImageUrl = async (data: {
  prefix: string
  originalFilename: string
}): Promise<ApiResponse<{ preSignedUrl: string; objectUrl: string }>> => {
  const response = await authorizedFetch(`${process.env.NEXT_PUBLIC_BASE_URL}/v1/bucket/presigned`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  })
  return await response.json()
}
