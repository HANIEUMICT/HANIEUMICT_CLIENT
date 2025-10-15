import Modal from '@/components/common/Modal'
import Input from '@/components/common/Input'
import Button1 from '@/components/common/Button1'
import { Dispatch, SetStateAction, useState } from 'react'
import { patchMemberMePhoneNumber, postSMS, postSMSCertificate } from '@/lib/mypage'
import { formatPhoneNumber } from '@/utils/common'
import { useToast } from '@/provider/ToastProvider'
import { postSendEmailCode } from '@/lib/common'

interface IndividualPhoneChangeModalProps {
  setIsPhoneNumberChangeModalOpen: Dispatch<SetStateAction<boolean>>
}

export default function IndividualPhoneNumberChangeModal({
  setIsPhoneNumberChangeModalOpen,
}: IndividualPhoneChangeModalProps) {
  const [newPhoneNumber, setNewPhoneNumber] = useState<string>('')
  const [isVerifyCodeFieldOpen, setIsVerifyCodeFieldOpen] = useState<boolean | undefined>()
  const [verifyCode, setVerifyCode] = useState<string>('')
  const [isPhoneVerified, setIsPhoneVerified] = useState<boolean | undefined>(undefined)
  //이미 등록한 전화번호 에러 제어 state
  const [isPhoneRegisteredError, setIsPhoneRegisteredError] = useState<boolean | undefined>(undefined)

  // 로딩 상태 추가
  const [isPhoneNumberVerificationLoading, setIsPhoneNumberVerificationLoading] = useState<boolean>(false)

  const handlePhoneNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setIsPhoneVerified(undefined)
    setVerifyCode('')
    setIsVerifyCodeFieldOpen(undefined)
    const formatted = formatPhoneNumber(e.target.value)
    setNewPhoneNumber(formatted)
  }

  const { showToast } = useToast()

  const handleToastSuccess = () => {
    showToast('성공적으로 저장되었습니다!', 'success')
  }

  const handleToastError = () => {
    showToast('오류가 발생했습니다.', 'error')
  }

  return (
    <Modal>
      <Modal.Content>
        <div className="gap-y-s flex flex-col">
          <h2 className="h2">전화번호 변경</h2>
          <div className="flex flex-col gap-y-2">
            <p className="sub2 flex gap-x-1">
              전화번호
              <span className="text-conic-red-30">*</span>
            </p>
            <div className="flex w-full gap-x-1">
              <Input
                customClassName={'w-full'}
                inputBoxStyle={'default'}
                placeholder={'전화번호를 입력해주세요.'}
                onChange={handlePhoneNumberChange}
                value={newPhoneNumber}
              />
              <Button1
                styleSize={'lg'}
                styleType={'primary'}
                styleStatus={newPhoneNumber.length === 13 ? 'default' : 'disabled'}
                onClick={async () => {
                  setIsPhoneVerified(undefined)
                  if (newPhoneNumber) {
                    setIsPhoneNumberVerificationLoading(true) // 로딩 시작
                    console.log('body', newPhoneNumber)
                    try {
                      const response = await postSMS(newPhoneNumber)
                      console.log('result', response)
                      if ((response.result = 'SUCCESS')) {
                        setIsVerifyCodeFieldOpen(true)
                      } else if (response.result === 'ERROR') {
                        setIsPhoneRegisteredError(true)
                      }
                    } catch (error) {
                      console.error('연락처 인증 요청 실패:', error)
                    } finally {
                      setIsPhoneNumberVerificationLoading(false) // 로딩 종료
                    }
                  }
                }}
                customClassName={'w-[96px] h-[46px] whitespace-nowrap'}
              >
                {isPhoneNumberVerificationLoading ? (
                  <div className="flex items-center gap-x-2">
                    <div className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent"></div>
                    <span>전송 중...</span>
                  </div>
                ) : (
                  '인증번호'
                )}
              </Button1>
            </div>
            {isVerifyCodeFieldOpen ? (
              <div className="flex flex-col gap-y-2">
                <div className="flex items-center gap-x-2">
                  <Input
                    value={verifyCode}
                    onChange={(e) => {
                      setVerifyCode(e.target.value)
                      setIsPhoneVerified(undefined)
                    }}
                    inputBoxStyle={'default'}
                    type={'text'}
                    placeholder={'인증번호 입력'}
                    customClassName={'w-full'}
                  />
                  <Button1
                    customClassName={' whitespace-nowrap'}
                    styleType={'primary'}
                    styleSize={'lg'}
                    styleStatus={verifyCode.length !== 6 ? 'disabled' : 'default'}
                    onClick={async () => {
                      const response = await postSMSCertificate(newPhoneNumber, verifyCode)
                      console.log('result', response)
                      if (response.result === 'SUCCESS') {
                        setIsPhoneVerified(true)
                      } else if (response.result === 'ERROR') {
                        setIsPhoneVerified(false)
                      }
                    }}
                  >
                    인증하기
                  </Button1>
                </div>
                {isPhoneVerified === undefined ? null : isPhoneVerified ? (
                  <p className="body1 text-conic-blue-30">인증되었습니다.</p>
                ) : (
                  <p className="body1 text-conic-red-30">인증코드를 다시 확인해주세요</p>
                )}
              </div>
            ) : null}
          </div>
        </div>
      </Modal.Content>
      <Modal.BottomButton>
        <div className="flex gap-x-3">
          <Button1
            styleType={'outline'}
            onClick={() => {
              setIsPhoneNumberChangeModalOpen(false)
            }}
            customClassName={'w-full'}
            styleSize={'lg'}
            styleStatus={'default'}
          >
            취소
          </Button1>
          <Button1
            styleType={'primary'}
            onClick={async () => {
              const result = await patchMemberMePhoneNumber(newPhoneNumber)
              if (result.result === 'SUCCESS') {
                handleToastSuccess()
                setIsPhoneNumberChangeModalOpen(false)
              } else {
                handleToastError()
              }
            }}
            styleSize={'lg'}
            customClassName={'w-full'}
            disabled={newPhoneNumber.length <= 0}
            styleStatus={newPhoneNumber.length > 0 ? 'default' : 'disabled'}
          >
            변경완료
          </Button1>
        </div>
      </Modal.BottomButton>
    </Modal>
  )
}
