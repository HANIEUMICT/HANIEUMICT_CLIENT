'use client'

import { createContext, useContext, ReactNode, useEffect, useRef } from 'react'
import { I18nextProvider } from 'react-i18next'
import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import { Locale } from '@/lib/i18n.types'
import { resources } from '@/lib/locales'

interface I18nContextType {
  lng: Locale
}

const I18nContext = createContext<I18nContextType | undefined>(undefined)

interface I18nProviderProps {
  lng: Locale
  children: ReactNode
}

export function I18nProvider({ lng, children }: I18nProviderProps) {
  const initialized = useRef(false)

  useEffect(() => {
    if (initialized.current) return

    if (!i18n.isInitialized) {
      i18n.use(initReactI18next).init({
        lng,
        fallbackLng: 'ko',
        resources,
        react: {
          useSuspense: false,
        },
      })

      initialized.current = true
    }
  }, [lng])

  return (
    <I18nContext.Provider value={{ lng }}>
      <I18nextProvider i18n={i18n}>{children}</I18nextProvider>
    </I18nContext.Provider>
  )
}

export const useI18nContext = () => {
  const context = useContext(I18nContext)
  if (!context) {
    throw new Error('useI18nContext must be used within I18nProvider')
  }
  return context
}
