import { AlarmIcon, DropDownIcon, LogoIcon, TranslateIcon } from '@/assets/svgComponents'
import { useRouter } from 'next/navigation'
import Button1 from '@/components/common/Button1'
import { useEffect, useState } from 'react'
import { UserDataType } from '@/type/common'

type HeaderType = 'DEFAULT' | 'SIGNUP'

interface HeaderProps {
  headerType?: HeaderType
}

const Header = ({ headerType = 'DEFAULT' }: HeaderProps) => {
  const router = useRouter()

  const [userData, setUserData] = useState<UserDataType | null>(null)

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
          <header className="py-s fixed top-0 flex h-[80px] w-full items-center justify-between bg-white px-[40px]">
            <section className="gap-x-2xl flex items-center">
              <LogoIcon width={105} height={32} />
              <div className="gap-x-l sub1 flex">
                <button className="text-conic-red-30">홈</button>
                <button className="text-gray-30">견적서</button>
                <button className="text-gray-30">공급업체</button>
              </div>
            </section>
            <section className="gap-x-l flex items-center">
              <Button1
                onClick={() => {
                  router.push('/project')
                }}
                styleType="primary"
                styleStatus={'default'}
                styleSize={'sm'}
                customClassName={'rounded-full h-[36px]'}
              >
                견적서 작성하기
              </Button1>
              <div className="flex items-center gap-x-2">
                <TranslateIcon width={32} height={32} />
                <AlarmIcon width={20} height={24} />
              </div>
              {userData ? (
                <div className="flex gap-x-1">
                  <p className="button-lg">{userData.memberName}</p>
                  <DropDownIcon width={16} height={12} />
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
          <header className="py-s fixed top-0 w-full bg-white px-5 xl:px-[352px] 2xl:px-[352px]">
            <LogoIcon width={105} height={32} />
          </header>
        )
    }
  }
  return renderHeaderType(headerType)
}
export default Header
