'use client'
import { AlarmIcon, LogoIcon, ProfileIcon, TranslateIcon } from '@/assets/svgComponents'
import { usePathname, useRouter } from 'next/navigation'
import Button1 from '@/components/common/Button1'
import { useEffect, useState } from 'react'
import { UserDataType } from '@/type/common'
import Link from 'next/link'
import TranslationModal from '@/components/modal/TranslationModal'
import { useModalStore } from '@/store/modalStore'

type HeaderType = 'DEFAULT' | 'SIGNUP'

interface HeaderProps {
  headerType?: HeaderType
}

const Header = ({ headerType = 'DEFAULT' }: HeaderProps) => {
  const router = useRouter()
  const pathName = usePathname()

  const [userData, setUserData] = useState<UserDataType | null>(null)
  const setState = useModalStore((state) => state.setState)
  const isTranslationModalOpen = useModalStore((state) => state.isTranslationModalOpen)

  // localStorage에서 userData 가져오기 (클라이언트 사이드에서만)
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const storedUserData = localStorage.getItem('userData')
      if (storedUserData) {
        try {
          const parsedUserData: UserDataType = JSON.parse(storedUserData)
          setUserData(parsedUserData)
        } catch (error) {
          console.error('userData 파싱 실패:', error)
        }
      }
    }
  }, [])

  const renderHeaderType = (headerType: HeaderType) => {
    switch (headerType) {
      case 'DEFAULT':
        return (
          <header className="py-s fixed top-0 z-50 flex h-[80px] w-full items-center justify-between bg-white px-[40px]">
            {isTranslationModalOpen && <TranslationModal />}
            <section className="gap-x-2xl flex items-center">
              <LogoIcon
                className="cursor-pointer"
                onClick={() => {
                  router.push('/')
                }}
                width={105}
                height={32}
              />
              <div className="gap-x-l sub1 flex">
                <Link href={'/'} className={pathName === '/' ? 'text-conic-red-30' : 'text-gray-30'}>
                  공급업체
                </Link>
                <Link href={'/project'} className={pathName === '/project' ? 'text-conic-red-30' : 'text-gray-30'}>
                  견적서
                </Link>
                <Link href={'/chat'} className={pathName === '/chat' ? 'text-conic-red-30' : 'text-gray-30'}>
                  채팅
                </Link>
              </div>
            </section>
            <section className="gap-x-l flex items-center">
              {userData?.memberRole === 'INDIVIDUAL' ? (
                <Button1
                  onClick={() => {
                    router.push('/create-project')
                  }}
                  styleType="primary"
                  styleStatus={'default'}
                  styleSize={'sm'}
                  customClassName={'rounded-full h-[36px]'}
                >
                  견적서 작성하기
                </Button1>
              ) : userData?.memberRole === 'OWNER' ? (
                <Button1
                  onClick={() => {
                    router.push('/register-factory')
                  }}
                  styleType="primary"
                  styleStatus={'default'}
                  styleSize={'sm'}
                  customClassName={'rounded-full h-[36px]'}
                >
                  내 공장 등록하기
                </Button1>
              ) : null}
              <div className="flex items-center gap-x-2">
                <TranslateIcon
                  className="cursor-pointer"
                  onClick={() => {
                    setState({ isTranslationModalOpen: !isTranslationModalOpen })
                  }}
                  width={32}
                  height={32}
                />
                <AlarmIcon className="cursor-pointer" width={20} height={24} />
              </div>
              {userData ? (
                <div
                  onClick={() => {
                    if (userData?.memberRole === 'INDIVIDUAL') {
                      router.push('/mypage/individual')
                    } else {
                      router.push('/mypage/company')
                    }
                  }}
                  className="flex cursor-pointer items-center gap-x-2"
                >
                  <div className="bg-gray-10 flex h-[32px] w-[32px] items-center justify-center rounded-full">
                    <ProfileIcon width={24} height={24} />
                  </div>
                  <div className="flex items-center gap-x-1">
                    {userData.memberRole === 'INDIVIDUAL' ? (
                      <div className="badge text-conic-blue-30 bg-conic-blue-10 p-5xs rounded-[4px]">개인</div>
                    ) : (
                      <div className="badge text-conic-orange-30 bg-conic-orange-10 p-5xs rounded-[4px]">기업</div>
                    )}
                    <p className="button-lg">{userData.memberName}</p>
                  </div>
                </div>
              ) : (
                <div className="button-lg gap-x-4xs flex items-center">
                  <button
                    onClick={() => {
                      router.push('/login')
                    }}
                    className="text-gray-40"
                  >
                    로그인
                  </button>
                  <div className="text-gray-50">|</div>
                  <button
                    onClick={() => {
                      router.push('/sign-up')
                    }}
                    className="text-gray-40"
                  >
                    회원가입
                  </button>
                </div>
              )}
            </section>
          </header>
        )
      case 'SIGNUP':
        return (
          <header className="py-s fixed top-0 z-50 w-full bg-white px-5 xl:px-[352px] 2xl:px-[352px]">
            <LogoIcon
              onClick={() => {
                router.push('/')
              }}
              width={105}
              height={32}
            />
          </header>
        )
    }
  }
  return <>{renderHeaderType(headerType)}</>
}
export default Header
