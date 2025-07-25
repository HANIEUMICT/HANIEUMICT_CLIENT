import { CheckboxFillIcon, GrayRightArrowIcon, LogoIcon, UnCheckboxIcon } from '@/assets/svgComponents'
import { useAuthStore } from '@/store/authStore'

export default function TermsOfServiceField() {
  const individualSignUpData = useAuthStore((state) => state.individualSignUpData)
  const setState = useAuthStore((state) => state.setState)
  return (
    <div className="p-3xs flex w-full items-center justify-between rounded-[12px] bg-white">
      <section className="flex items-center gap-x-2">
        {individualSignUpData?.termsOfServiceAgreed ? (
          <CheckboxFillIcon
            onClick={() => {
              setState({
                ...individualSignUpData,
                individualSignUpData: {
                  ...individualSignUpData,
                  termsOfServiceAgreed: !individualSignUpData?.termsOfServiceAgreed,
                },
              })
            }}
            width={24}
            height={24}
          />
        ) : (
          <div
            onClick={() => {
              setState({
                ...individualSignUpData,
                individualSignUpData: {
                  ...individualSignUpData,
                  termsOfServiceAgreed: !individualSignUpData?.termsOfServiceAgreed,
                },
              })
            }}
            className="hover:border-red-20 hover:bg-red-10 border-gray-30 h-[24px] w-[24px] rounded-[8px] border-[1.6px]"
          />
        )}
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
