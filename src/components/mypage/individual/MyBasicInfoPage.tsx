import { Switch } from '@/components/ui/switch'
import { GrayRightArrowIcon } from '@/assets/svgComponents'

export default function MyBasicInfoPage() {
  return (
    <div className="mt-[40px] flex gap-x-[40px]">
      <section className="gap-y-2xs flex w-[1220px] flex-col">
        <h1 className="h2">기본 정보</h1>
        <section className="p-s border-gray-20 flex flex-col gap-y-[5xs] rounded-[24px] border bg-white">
          <section className="py-xs border-gray-20 flex flex-col gap-y-[12px] border-b">
            <div className="flex w-full items-center justify-between">
              <h2 className="sub1">이메일</h2>
              <p className="sub1">hs*******@n****.com</p>
            </div>
            <div className="flex w-full items-center justify-between">
              <h2 className="sub2">
                혜택/이벤트 정보 알림 수신<span className="body-md pl-2 text-gray-50">(이메일)</span>
              </h2>
              <Switch />
            </div>
            <ul className="gap-y-4xs flex flex-col">
              <ol className="button-sm text-gray-40">
                CONIC 및 제휴사의 소식·혜택·이벤트·광고 정보를 받으실 수 있습니다.
              </ol>
              <ol className="button-sm text-gray-40">
                결제 및 배송과 관련된 메시지는 수신 동의 여부와 상관없이 발송됩니다.
              </ol>
            </ul>
          </section>

          <section className="py-xs border-gray-20 flex items-center justify-between border-b">
            <p className="sub1">이름</p>
            <div className="flex items-center gap-x-2">
              <p className="sub1">황유림</p>
              <div className="flex h-[24px] w-[24px] items-center justify-center">
                <GrayRightArrowIcon width={7} height={16} />
              </div>
            </div>
          </section>

          <section className="py-xs border-gray-20 flex flex-col gap-y-[12px] border-b">
            <div className="flex w-full items-center justify-between">
              <h2 className="sub1">전화번호</h2>
              <div className="flex items-center gap-x-2">
                <p className="sub1">010-7557-9217</p>
                <div className="flex h-[24px] w-[24px] items-center justify-center">
                  <GrayRightArrowIcon width={7} height={16} />
                </div>
              </div>
            </div>
            <div className="flex w-full items-center justify-between">
              <h2 className="sub2">
                혜택/이벤트 정보 알림 수신<span className="body-md pl-2 text-gray-50">(앱 알림 또는 문자 메시지)</span>
              </h2>
              <Switch />
            </div>
            <ul className="gap-y-4xs flex flex-col">
              <ol className="button-sm text-gray-40">CONIC 또는 문자 메시지로 알림이 발송될 수 있습니다.</ol>
              <ol className="button-sm text-gray-40">
                CONIC 및 제휴사의 소식·혜택·이벤트·광고 정보를 받으실 수 있습니다.
              </ol>
            </ul>
          </section>

          <section className="py-xs border-gray-20 flex items-center justify-between border-b">
            <p className="sub1">비밀번호 변경</p>
            <div className="flex items-center gap-x-2">
              <div className="flex h-[24px] w-[24px] items-center justify-center">
                <GrayRightArrowIcon width={7} height={16} />
              </div>
            </div>
          </section>

          <section className="py-xs border-gray-20 flex items-center justify-between border-b">
            <p className="sub1">서비스 이용약관 동의</p>
            <div className="flex items-center gap-x-2">
              <div className="flex h-[24px] w-[24px] items-center justify-center">
                <GrayRightArrowIcon width={7} height={16} />
              </div>
            </div>
          </section>

          <section className="py-xs border-gray-20 flex items-center justify-between border-b">
            <p className="sub1">개인정보 수집 및 이용 동의</p>
            <div className="flex items-center gap-x-2">
              <div className="flex h-[24px] w-[24px] items-center justify-center">
                <GrayRightArrowIcon width={7} height={16} />
              </div>
            </div>
          </section>

          <section className="py-xs flex items-center justify-between">
            <p className="sub1">저작권에 관한 약관</p>
            <div className="flex items-center gap-x-2">
              <div className="flex h-[24px] w-[24px] items-center justify-center">
                <GrayRightArrowIcon width={7} height={16} />
              </div>
            </div>
          </section>
        </section>
      </section>
    </div>
  )
}
