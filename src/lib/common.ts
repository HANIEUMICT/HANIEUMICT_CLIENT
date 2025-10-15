import Cookies from 'js-cookie'

import { ApiResponse } from '@/type/common'
import { LoginResponseType } from '@/type/auth'
import { useModalStore } from '@/store/modalStore'

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

  // 401 에러: 인증 실패 (토큰 만료)
  if (response.status === 401 && retry) {
    const refreshed = await refreshAccessToken()
    if (refreshed) {
      return authorizedFetch(input, init, false)
    }
  }

  // 403 에러: 권한 없음 (토큰 유효하지 않음)
  if (response.status === 403) {
    console.warn('🔐 403 Forbidden: 접근 권한이 없습니다')
    useModalStore.getState().setState({ isTokenExpiredModalOpen: true })
    Cookies.remove('accessToken')
    Cookies.remove('refreshToken')
  }

  return response
}

/**
 * refreshToken을 이용해 accessToken 재발급
 */
const refreshAccessToken = async (): Promise<boolean> => {
  try {
    const refreshToken = Cookies.get('refreshToken')
    if (!refreshToken) {
      useModalStore.getState().setState({ isTokenExpiredModalOpen: true })
      console.warn('🔐 Refresh token이 없습니다')
      return false
    }

    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/v1/auth/refresh`, {
      method: 'POST',
      credentials: 'include',
    })

    if (!res.ok) {
      useModalStore.getState().setState({ isTokenExpiredModalOpen: true })
      console.warn('🔐 Refresh token 만료 또는 유효하지 않음')
      Cookies.remove('accessToken')
      Cookies.remove('refreshToken')
      return false
    }

    const response: ApiResponse<LoginResponseType> = await res.json()

    // API 응답이 성공이고 데이터가 있는 경우
    if (response.result === 'SUCCESS' && response.data) {
      const { accessToken, refreshToken } = response.data

      if (accessToken && refreshToken) {
        Cookies.set('accessToken', accessToken)
        Cookies.set('refreshToken', refreshToken)
        return true
      }
    } else if (response.result === 'ERROR') {
      useModalStore.getState().setState({ isTokenExpiredModalOpen: true })
    }

    // API 응답이 실패인 경우
    console.warn('🔐 토큰 갱신 API 응답 실패:', response.error?.message)
    useModalStore.getState().setState({ isTokenExpiredModalOpen: true })
    Cookies.remove('accessToken')
    Cookies.remove('refreshToken')
    return false
  } catch (e) {
    console.error('🚨 토큰 갱신 실패:', e)
    useModalStore.getState().setState({ isTokenExpiredModalOpen: true })
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
