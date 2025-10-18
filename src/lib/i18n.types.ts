export type Locale = 'ko' | 'en'

export interface I18nParams {
  lang: Locale
}

export type TranslationFunction = (key: string, defaultValue?: string) => string
