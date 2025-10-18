import commonKo from '@/i18n/locales/ko/common.json'
import commonEn from '@/i18n/locales/en/common.json'
import { Locale } from './i18n.types'

type Resources = {
  [key in Locale]: {
    [key: string]: Record<string, any>
  }
}

export const resources: Resources = {
  ko: {
    common: commonKo,
  },
  en: {
    common: commonEn,
  },
}
