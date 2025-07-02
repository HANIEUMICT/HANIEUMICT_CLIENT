import { GrayRightArrowIcon, LogoIcon, UnCheckboxIcon } from '@/assets/svgComponents'

export default function TermsOfServiceField() {
  return (
    <div className="p-3xs flex w-full items-center justify-between rounded-[12px] bg-white">
      <section className="flex items-center gap-x-2">
        <UnCheckboxIcon width={24} height={24} />
        <div className="gap-x-5xs flex">
          <LogoIcon width={52} height={16} />
          <p className="button-lg text-gray-50">이용 약관에 모두 동의합니다.</p>
        </div>
      </section>
      <section className="gap-x-5xs flex items-center">
        <p className="button-sm text-gray-40">보기</p>
        <div className="flex h-[24px] w-[24px] items-center justify-center">
          <GrayRightArrowIcon width={8} height={16} />
        </div>
      </section>
    </div>
  )
}
