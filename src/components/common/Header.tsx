import { LogoIcon } from '@/assets/svgComponents'
import HeaderClient from './HeaderClient'
import Link from 'next/link'
import { useTranslationServer } from '@/lib/i18n'
import { I18nParams } from '@/lib/i18n.types'

type HeaderType = 'DEFAULT' | 'SIGNUP'

interface HeaderProps {
  headerType?: HeaderType
  params: Promise<I18nParams>
}

export default async function Header({ headerType = 'DEFAULT', params }: HeaderProps) {
  const { lang } = await params

  const { t } = await useTranslationServer(lang, 'common')

  if (headerType === 'SIGNUP') {
    return (
      <header className="py-s fixed top-0 z-50 w-full bg-white px-5 xl:px-[352px] 2xl:px-[352px]">
        <LogoIcon className="cursor-pointer" width={105} height={32} />
      </header>
    )
  }

  return (
    <header className="py-s fixed top-0 z-50 flex h-[80px] w-full items-center justify-between bg-white px-[40px]">
      <section className="gap-x-2xl flex items-center">
        <Link href={`/${lang}`}>
          <LogoIcon width={105} height={32} className="cursor-pointer" />
        </Link>
        <nav className="gap-x-l sub1 flex">
          <Link href={`/${lang}`} className="text-gray-30 hover:text-conic-red-30">
            {t('navigation.company')}
          </Link>
          <Link href={`/${lang}/project`} className="text-gray-30 hover:text-conic-red-30">
            {t('navigation.project')}
          </Link>
          <Link href={`/${lang}/chat`} className="text-gray-30 hover:text-conic-red-30">
            {t('navigation.chat')}
          </Link>
        </nav>
      </section>

      <HeaderClient currentLng={lang} />
    </header>
  )
}
