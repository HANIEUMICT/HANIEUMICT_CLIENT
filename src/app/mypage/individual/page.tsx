'use client'

import { Switch } from '@/components/ui/switch'
import { GrayRightArrowIcon } from '@/assets/svgComponents'
import { useEffect, useState } from 'react'
import IndividualNameChangeModal from '@/components/modal/IndividualNameChangeModal'
import IndividualPhoneNumberChangeModal from '@/components/modal/IndividualPhoneNumberChangeModal'
import IndividualPasswordChangeModal from '@/components/modal/IndividualPasswordChangeModal'
import { getMemberInfo, patchMemberMeEmailMarketingConsent, patchMemberMeSMSMarketingConsent } from '@/lib/mypage'
import { MemberInfoType } from '@/type/mypage'

export default function IndividualMyBasicInfoPage() {
  const [isNameChangeModalOpen, setIsNameChangeModalOpen] = useState(false)
  const [isPhoneNumberChangeModalOpen, setIsPhoneNumberChangeModalOpen] = useState(false)
  const [isPasswordChangeModalOpen, setIsPasswordChangeModalOpen] = useState(false)
  const [userInfo, setUserInfo] = useState<undefined | MemberInfoType>()

  // Switch 상태 관리
  const [emailMarketingAgreed, setEmailMarketingAgreed] = useState(false)
  const [smsMarketingAgreed, setSmsMarketingAgreed] = useState(false)

  useEffect(() => {
    getMemberInfo().then((res) => {
      if (res.result === 'SUCCESS') {
        setUserInfo(res.data)
        console.log('res', res)
        // userInfo가 로드되면 Switch 상태 초기화
        setEmailMarketingAgreed(res.data?.emailMarketingAgreed ?? false)
        setSmsMarketingAgreed(res.data?.smsMarketingAgreed ?? false)
      }
    })
  }, [])

  /**
   * 이메일 마케팅 동의 토글 핸들러
   */
  const handleEmailMarketingToggle = async (checked: boolean) => {
    setEmailMarketingAgreed(checked)
    // TODO: API 호출하여 서버에 업데이트
    const response = await patchMemberMeEmailMarketingConsent(checked)
    console.log('이메일 마케팅 동의', response)
  }

  /**
   * SMS 마케팅 동의 토글 핸들러
   */
  const handleSmsMarketingToggle = async (checked: boolean) => {
    setSmsMarketingAgreed(checked)
    // TODO: API 호출하여 서버에 업데이트
    const response = await patchMemberMeSMSMarketingConsent(checked)
    console.log('SMS 마케팅 동의', response)
  }

  return (
    <div className="mx-auto mt-[40px] flex gap-x-[40px]">
      {isNameChangeModalOpen && <IndividualNameChangeModal setIsNameChangeModalOpen={setIsNameChangeModalOpen} />}
      {isPhoneNumberChangeModalOpen && (
        <IndividualPhoneNumberChangeModal setIsPhoneNumberChangeModalOpen={setIsPhoneNumberChangeModalOpen} />
      )}
      {isPasswordChangeModalOpen && (
        <IndividualPasswordChangeModal setIsPasswordChangeModalOpen={setIsPasswordChangeModalOpen} />
      )}

      <section className="gap-y-2xs flex w-[1220px] flex-col">
        <h1 className="h2">기본 정보</h1>
        <section className="p-s border-gray-20 flex flex-col gap-y-[5xs] rounded-[24px] border bg-white">
          <section className="py-xs border-gray-20 flex flex-col gap-y-[12px] border-b">
            <div className="flex w-full items-center justify-between">
              <h2 className="sub1">이메일</h2>
              <p className="sub1">{userInfo?.email.address}</p>
            </div>
            <div className="flex w-full items-center justify-between">
              <h2 className="sub2">
                혜택/이벤트 정보 알림 수신<span className="body-md pl-2 text-gray-50">(이메일)</span>
              </h2>
              <Switch checked={emailMarketingAgreed} onCheckedChange={handleEmailMarketingToggle} />
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

          <section
            onClick={() => {
              setIsNameChangeModalOpen(!isNameChangeModalOpen)
            }}
            className="py-xs border-gray-20 flex items-center justify-between border-b"
          >
            <p className="sub1">이름</p>
            <div className="flex items-center gap-x-2">
              <p className="sub1">{userInfo?.name}</p>
              <div className="flex h-[24px] w-[24px] items-center justify-center">
                <GrayRightArrowIcon width={7} height={16} />
              </div>
            </div>
          </section>

          <section className="py-xs border-gray-20 flex flex-col gap-y-[12px] border-b">
            <div
              onClick={() => {
                setIsPhoneNumberChangeModalOpen(!isPhoneNumberChangeModalOpen)
              }}
              className="flex w-full items-center justify-between"
            >
              <h2 className="sub1">전화번호</h2>
              <div className="flex items-center gap-x-2">
                <p className="sub1">{userInfo?.phoneNumber}</p>
                <div className="flex h-[24px] w-[24px] items-center justify-center">
                  <GrayRightArrowIcon width={7} height={16} />
                </div>
              </div>
            </div>
            <div className="flex w-full items-center justify-between">
              <h2 className="sub2">
                혜택/이벤트 정보 알림 수신<span className="body-md pl-2 text-gray-50">(앱 알림 또는 문자 메시지)</span>
              </h2>
              <Switch checked={smsMarketingAgreed} onCheckedChange={handleSmsMarketingToggle} />
            </div>
            <ul className="gap-y-4xs flex flex-col">
              <ol className="button-sm text-gray-40">CONIC 또는 문자 메시지로 알림이 발송될 수 있습니다.</ol>
              <ol className="button-sm text-gray-40">
                CONIC 및 제휴사의 소식·혜택·이벤트·광고 정보를 받으실 수 있습니다.
              </ol>
            </ul>
          </section>

          <section
            onClick={() => {
              setIsPasswordChangeModalOpen(!isPasswordChangeModalOpen)
            }}
            className="py-xs border-gray-20 flex items-center justify-between border-b"
          >
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
