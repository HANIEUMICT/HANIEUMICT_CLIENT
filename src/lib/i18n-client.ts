// src/lib/i18n-client.ts
import i18n from 'i18next'
import resourcesToBackend from 'i18next-resources-to-backend'
import LanguageDetector from 'i18next-browser-languagedetector'
import { initReactI18next } from 'react-i18next'

// JSON 파일들을 직접 import
import koCommon from '@/i18n/locales/ko/common.json'
import enCommon from '@/i18n/locales/en/common.json'

i18n
  .use(
    resourcesToBackend((language: string, namespace: string) => {
      // 동적으로 리소스 반환
      if (language === 'ko' && namespace === 'common') return koCommon
      if (language === 'en' && namespace === 'common') return enCommon
      return {}
    })
  )
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    fallbackLng: 'ko',
    supportedLngs: ['ko', 'en'],
    detection: {
      order: ['localStorage', 'navigator'],
      caches: ['localStorage'],
    },
    ns: ['common'],
    defaultNS: 'common',
    react: {
      useSuspense: false,
    },
  })

export default i18n
