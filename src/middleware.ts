// src/middleware.ts
import { NextRequest, NextResponse } from 'next/server'

const DEFAULT_LANGUAGE = 'ko'
const SUPPORTED_LANGUAGES = ['ko', 'en']

export function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname

  // /로 접속하면 /ko으로 리다이렉트
  if (pathname === '/') {
    return NextResponse.redirect(new URL(`/${DEFAULT_LANGUAGE}`, request.url))
  }

  // 경로에서 언어 추출 (원본 pathname 사용)
  const segments = pathname.split('/').filter(Boolean)
  const potentialLanguage = segments[0]
  const hasLanguage = SUPPORTED_LANGUAGES.includes(potentialLanguage)

  // 언어가 없는 경우만 리다이렉트
  if (!hasLanguage && !pathname.startsWith('/api') && !pathname.startsWith('/_next')) {
    return NextResponse.redirect(new URL(`/${DEFAULT_LANGUAGE}${pathname}`, request.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico|api).*)'],
}
