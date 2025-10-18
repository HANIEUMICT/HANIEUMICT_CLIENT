'use client'

import { useModalStore } from '@/store/modalStore'
import { useTranslation } from 'react-i18next'
import { useRouter, usePathname } from 'next/navigation'
import { Locale } from '@/lib/i18n.types'

interface TranslationModalProps {
  onLanguageChange?: (lng: string) => void
}

export default function TranslationModal({ onLanguageChange }: TranslationModalProps) {
  const { i18n } = useTranslation()
  const setState = useModalStore((state) => state.setState)
  const router = useRouter()
  const pathname = usePathname()

  const changeLanguage = async (langCode: Locale) => {
    try {
      // i18n 언어 변경
      await i18n.changeLanguage(langCode)

      // localStorage에 저장 (선택사항)
      localStorage.setItem('language', langCode)

      // 경로 변경 (언어 코드 포함)
      const newPathname = pathname.replace(/^\/[a-z]{2}/, `/${langCode}`)
      router.push(newPathname)

      // 모달 닫기
      setState({ isTranslationModalOpen: false })

      // 콜백 실행
      onLanguageChange?.(langCode)
    } catch (error) {
      console.error('언어 변경 실패:', error)
    }
  }

  const languageList = [
    { content: '한국어', type: 'ko' as Locale },
    { content: 'English', type: 'en' as Locale },
  ]

  return (
    <div className="p-xs absolute top-20 right-40 flex flex-col gap-y-3 rounded-[20px] bg-white shadow-md">
      {languageList.map((language) => (
        <button
          onClick={() => changeLanguage(language.type)}
          key={language.type}
          className={`button-sm p-4xs flex w-[100px] items-center justify-center transition-colors ${
            i18n.language === language.type ? 'bg-conic-red-30 text-white' : 'text-gray-40 hover:bg-gray-10'
          }`}
        >
          {language.content}
        </button>
      ))}
    </div>
  )
}
