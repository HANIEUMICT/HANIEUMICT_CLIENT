import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import { ApiResponse } from '@/type/common'
import { LoginResponseType } from '@/type/auth'

interface ServerFetchOptions extends RequestInit {
  revalidate?: number | false // ISR 설정
  tags?: string[] // 태그 기반 재검증
}

/**
 * 서버 컴포넌트용 인증 fetch
 * SSR, ISR 지원
 */
export async function serverAuthorizedFetch(
  input: RequestInfo,
  options: ServerFetchOptions = {},
  retry = true
): Promise<Response> {
  const cookieStore = await cookies()
  const accessToken = cookieStore.get('accessToken')?.value

  // 토큰 없으면 로그인 페이지로
  if (!accessToken) {
    redirect('/login')
  }

  const { revalidate, tags, ...init } = options
  const isFormData = init.body instanceof FormData

  const headers: Record<string, string> = {
    ...(init.headers as Record<string, string>),
    Authorization: `Bearer ${accessToken}`,
  }

  if (!isFormData && !headers['Content-Type']) {
    headers['Content-Type'] = 'application/json'
  }

  try {
    const response = await fetch(input, {
      ...init,
      headers,
      credentials: 'include',
      // ISR/SSR 설정
      next: {
        revalidate: revalidate, // undefined면 SSR (no-store)
        tags: tags,
      },
    })

    // 401 에러: 토큰 만료
    if (response.status === 401 && retry) {
      const refreshed = await serverRefreshAccessToken()
      if (refreshed) {
        // 재시도
        return serverAuthorizedFetch(input, options, false)
      } else {
        // Refresh 실패 시 로그인으로
        redirect('/login?error=token_expired')
      }
    }

    // 403 에러: 권한 없음
    if (response.status === 403) {
      console.warn('🔐 403 Forbidden: 접근 권한이 없습니다')
      // 쿠키 삭제
      cookieStore.delete('accessToken')
      cookieStore.delete('refreshToken')
      redirect('/login?error=forbidden')
    }

    return response
  } catch (error) {
    console.error('Server fetch error:', error)
    throw error
  }
}

/**
 * 서버에서 refreshToken을 이용해 accessToken 재발급
 */
async function serverRefreshAccessToken(): Promise<boolean> {
  try {
    const cookieStore = await cookies()
    const refreshToken = cookieStore.get('refreshToken')?.value

    if (!refreshToken) {
      console.warn('🔐 Refresh token이 없습니다')
      return false
    }

    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/v1/auth/refresh`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
      cache: 'no-store', // 캐시 안 함
    })

    if (!res.ok) {
      console.warn('🔐 Refresh token 만료 또는 유효하지 않음')
      cookieStore.delete('accessToken')
      cookieStore.delete('refreshToken')
      return false
    }

    const response: ApiResponse<LoginResponseType> = await res.json()

    // API 응답이 성공이고 데이터가 있는 경우
    if (response.result === 'SUCCESS' && response.data) {
      const { accessToken, refreshToken: newRefreshToken } = response.data

      if (accessToken && newRefreshToken) {
        const expires = new Date(Date.now() + 604800000) // 7일

        // 쿠키 업데이트
        cookieStore.set('accessToken', accessToken, {
          expires,
          httpOnly: true,
          secure: process.env.NODE_ENV === 'production',
          sameSite: 'lax',
          path: '/',
        })

        cookieStore.set('refreshToken', newRefreshToken, {
          expires,
          httpOnly: true,
          secure: process.env.NODE_ENV === 'production',
          sameSite: 'lax',
          path: '/',
        })

        return true
      }
    }

    // API 응답이 실패인 경우
    console.warn('🔐 토큰 갱신 API 응답 실패:', response.error?.message)
    cookieStore.delete('accessToken')
    cookieStore.delete('refreshToken')
    return false
  } catch (e) {
    console.error('🚨 토큰 갱신 실패:', e)
    return false
  }
}
