import { Locale } from './i18n.types'
import { resources } from './locales'

const instanceCache = new Map()

export async function useTranslationServer(lng: Locale, ns: string | string[] = 'common') {
  // 캐시 키 생성
  const cacheKey = `${lng}-${Array.isArray(ns) ? ns.join(',') : ns}`

  // 이미 생성된 인스턴스가 있으면 반환
  if (instanceCache.has(cacheKey)) {
    const cached = instanceCache.get(cacheKey)
    return {
      t: cached.t,
      i18n: { language: lng },
    }
  }

  const namespace = Array.isArray(ns) ? ns[0] : ns
  const translations = resources[lng]?.[namespace] || {}

  const t = (key: string, defaultValue?: string): string => {
    const keys = key.split('.')
    let value: any = translations

    for (const k of keys) {
      if (value && typeof value === 'object') {
        value = value[k]
      } else {
        return defaultValue || key
      }
    }

    return typeof value === 'string' ? value : defaultValue || key
  }

  // 캐시에 저장
  instanceCache.set(cacheKey, { t })

  return {
    t,
    i18n: { language: lng },
  }
}
