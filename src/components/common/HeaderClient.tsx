'use client'

import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { UserDataType } from '@/type/common'
import Button1 from '@/components/common/Button1'
import { AlarmIcon, ProfileIcon, TranslateIcon } from '@/assets/svgComponents'
import TranslationModal from '@/components/modal/TranslationModal'
import { useModalStore } from '@/store/modalStore'
import { useTranslation } from 'react-i18next'
import i18n from '@/lib/i18n-client'

interface HeaderClientProps {
  currentLng: string
}

export default function HeaderClient({ currentLng }: HeaderClientProps) {
  const router = useRouter()
  const { t } = useTranslation()

  const [userData, setUserData] = useState<UserDataType | null>(null)
  const [isClient, setIsClient] = useState(false)
  const [lng, setLng] = useState(currentLng)

  const setState = useModalStore((state) => state.setState)
  const isTranslationModalOpen = useModalStore((state) => state.isTranslationModalOpen)

  useEffect(() => {
    setIsClient(true)

    // localStorage에서 저장된 언어 가져오기
    const savedLanguage = localStorage.getItem('language') || currentLng
    setLng(savedLanguage)
    i18n.changeLanguage(savedLanguage)

    // userData 로드
    const storedUserData = localStorage.getItem('userData')
    if (storedUserData) {
      try {
        setUserData(JSON.parse(storedUserData))
      } catch (error) {
        console.error('userData 파싱 실패:', error)
      }
    }
  }, [currentLng])

  // 언어 변경 시 페이지 새로고침 (선택사항)
  const handleLanguageChange = (langCode: string) => {
    localStorage.setItem('language', langCode)
    setLng(langCode)
    i18n.changeLanguage(langCode)
    setState({ isTranslationModalOpen: false })

    // 필요시 페이지 전체 새로고침
    // window.location.reload()
  }

  if (!isClient) {
    return (
      <section className="gap-x-l flex items-center">
        <div className="flex items-center gap-x-2">
          <TranslateIcon width={32} height={32} />
          <AlarmIcon width={20} height={24} />
        </div>
      </section>
    )
  }

  return (
    <>
      <section className="gap-x-l flex items-center">
        {isTranslationModalOpen && <TranslationModal onLanguageChange={handleLanguageChange} />}

        {userData?.memberRole === 'INDIVIDUAL' ? (
          <Button1
            onClick={() => router.push(`/${currentLng}/create-project`)}
            styleType="primary"
            styleStatus="default"
            styleSize="sm"
            customClassName="rounded-full h-[36px]"
          >
            {t('navigation.createProject')}
          </Button1>
        ) : userData?.memberRole === 'OWNER' ? (
          <Button1
            onClick={() => router.push(`/${currentLng}/register-factory`)}
            styleType="primary"
            styleStatus="default"
            styleSize="sm"
            customClassName="rounded-full h-[36px]"
          >
            {t('navigation.registerCompany')}
          </Button1>
        ) : null}

        <div className="flex items-center gap-x-2">
          <TranslateIcon
            className="cursor-pointer"
            onClick={() => setState({ isTranslationModalOpen: !isTranslationModalOpen })}
            width={32}
            height={32}
          />
          <AlarmIcon className="cursor-pointer" width={20} height={24} />
        </div>

        {userData ? (
          <div
            onClick={() => {
              router.push(
                userData.memberRole === 'INDIVIDUAL'
                  ? `/${currentLng}/mypage/individual`
                  : `/${currentLng}/mypage/company`
              )
            }}
            className="flex cursor-pointer items-center gap-x-2"
          >
            <div className="bg-gray-10 flex h-[32px] w-[32px] items-center justify-center rounded-full">
              <ProfileIcon width={24} height={24} />
            </div>
            <div className="flex items-center gap-x-1">
              <div
                className={`badge p-5xs rounded-[4px] ${
                  userData.memberRole === 'INDIVIDUAL'
                    ? 'text-conic-blue-30 bg-conic-blue-10'
                    : 'text-conic-orange-30 bg-conic-orange-10'
                }`}
              >
                {userData.memberRole === 'INDIVIDUAL' ? t('navigation.roleIndividual') : t('navigation.roleCompany')}
              </div>
              <p className="button-lg">{userData.memberName}</p>
            </div>
          </div>
        ) : (
          <div className="button-lg gap-x-4xs flex cursor-pointer items-center">
            <button onClick={() => router.push(`/${currentLng}/login`)} className="text-gray-40">
              {t('navigation.login')}
            </button>
            <div className="text-gray-50">|</div>
            <button onClick={() => router.push(`/${currentLng}/sign-up`)} className="text-gray-40">
              {t('navigation.signup')}
            </button>
          </div>
        )}
      </section>
    </>
  )
}
