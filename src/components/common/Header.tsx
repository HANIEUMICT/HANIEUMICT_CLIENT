import { LogoIcon } from '@/assets/svgComponents'

const Header = () => {
  return (
    <header className="py-s fixed top-0 w-full bg-white px-5 xl:px-[352px] 2xl:px-[352px]">
      <LogoIcon width={105} height={32} />
    </header>
  )
}
export default Header
