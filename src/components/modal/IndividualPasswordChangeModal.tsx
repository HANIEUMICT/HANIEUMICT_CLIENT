import Modal from '@/components/common/Modal'
import Input from '@/components/common/Input'
import Button1 from '@/components/common/Button1'
import { ChangeEvent, Dispatch, SetStateAction, useEffect, useState } from 'react'
import { patchMemberMePassword, postMemberPassword } from '@/lib/mypage'
import { EyeIcon, NonEyeIcon } from '@/assets/svgComponents'
import { useAuthStore } from '@/store/authStore'
import { useToast } from '@/provider/ToastProvider'

interface IndividualPasswordChangeModalProps {
  setIsPasswordChangeModalOpen: Dispatch<SetStateAction<boolean>>
}

export default function IndividualPasswordChangeModal({
  setIsPasswordChangeModalOpen,
}: IndividualPasswordChangeModalProps) {
  const [isView, setIsView] = useState(false)
  const [currentPassword, setCurrentPassword] = useState<string>('')
  const [errorMessage, setErrorMessage] = useState<string | undefined>(undefined)
  const [isVerified, setIsVerified] = useState<boolean | undefined>(undefined)

  const [isIndividualPasswordMatch, setIsIndividualPasswordMatch] = useState<boolean | undefined>(undefined)
  const [isIndividualPasswordValid, setIsIndividualPasswordValid] = useState<boolean | undefined>(undefined)
  const [newPassword, setNewPassword] = useState<string | undefined>(undefined)
  const [checkPassWord, setCheckPassWord] = useState<string | undefined>(undefined)
  const [showPassword, setShowPassword] = useState(false)
  const [showCheckPassword, setShowCheckPassword] = useState(false)

  //비밀번호 문구
  useEffect(() => {
    if (newPassword === undefined) {
      setIsIndividualPasswordMatch(undefined)
      return
    }
    // 정규식을 사용하여 대소문자, 숫자, 기호, 길이 검증
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,15}$/

    if (!passwordRegex.test(newPassword)) {
      setIsIndividualPasswordValid(false)
    } else {
      setIsIndividualPasswordValid(true)
    }
  }, [newPassword])

  //비밀번호 확인 문구
  useEffect(() => {
    if (newPassword === undefined) {
      setIsIndividualPasswordMatch(undefined)
      return
    }
    if (checkPassWord === newPassword) {
      setIsIndividualPasswordMatch(true)
    } else {
      setIsIndividualPasswordMatch(false)
    }
  }, [checkPassWord])

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
          <h2 className="h2">비밀번호 변경</h2>
          <section className="flex flex-col gap-y-2">
            <p className="sub2 flex gap-x-1">
              현재 비밀번호
              <span className="text-conic-red-30">*</span>
            </p>
            <div className="flex items-center gap-x-2">
              <Input
                customClassName={'w-full'}
                type={isView ? 'text' : 'password'}
                rightIcon={
                  isView ? (
                    <NonEyeIcon
                      onClick={() => {
                        setIsView(false)
                      }}
                      width={24}
                      height={24}
                    />
                  ) : (
                    <EyeIcon
                      onClick={() => {
                        setIsView(true)
                      }}
                      width={24}
                      height={24}
                    />
                  )
                }
                inputBoxStyle={'default'}
                placeholder={'비밀번호를 입력해주세요.'}
                onChange={(e) => {
                  setCurrentPassword(e.target.value)
                  setIsVerified(undefined)
                  setErrorMessage(undefined)
                }}
                value={currentPassword}
              />
              <Button1
                customClassName={'flex-shrink-0'}
                disabled={currentPassword.length <= 0}
                styleType={'secondary'}
                styleStatus={currentPassword.length > 0 ? 'default' : 'disabled'}
                onClick={async () => {
                  const result = await postMemberPassword(currentPassword)
                  if (result.result === 'SUCCESS') {
                    setIsVerified(true)
                  } else if (result.error.code === 'INVALID_PASSWORD') {
                    setErrorMessage(result.error.message)
                  }
                }}
                styleSize={'lg'}
              >
                인증하기
              </Button1>
            </div>
            {isVerified ? (
              <p className="body1 text-conic-blue-30">인증되었습니다.</p>
            ) : errorMessage ? (
              <p className="body1 text-conic-red-40">{errorMessage}</p>
            ) : null}
          </section>
          {isVerified && (
            <section className="gap-y-4xs flex flex-col">
              <section className="gap-x-5xs sub2 flex">
                비밀번호 <span className="text-conic-red-30">*</span>
              </section>
              <section className="gap-y-4xs flex flex-col">
                <Input
                  value={newPassword ?? ''}
                  onChange={(e: ChangeEvent<HTMLInputElement>) => {
                    setNewPassword(e.target.value)
                  }}
                  inputBoxStyle={
                    isIndividualPasswordValid !== undefined
                      ? isIndividualPasswordValid
                        ? 'default'
                        : 'error'
                      : 'default'
                  }
                  type={showPassword ? 'text' : 'password'}
                  placeholder={'영문, 숫자, 특수문자 조합하여 8-20자.'}
                  customClassName={'w-full'}
                  rightIcon={
                    showPassword ? (
                      <NonEyeIcon
                        onClick={() => {
                          setShowPassword(false)
                        }}
                        width={24}
                        height={24}
                      />
                    ) : (
                      <EyeIcon
                        onClick={() => {
                          setShowPassword(true)
                        }}
                        width={24}
                        height={24}
                      />
                    )
                  }
                />
                {isIndividualPasswordValid !== undefined ? (
                  <div className="badge-md">
                    {isIndividualPasswordValid ? null : (
                      <p className="text-conic-red-40">
                        비밀번호는 대소문자, 숫자, 기호 포함 8~15자를 만족해야 합니다.
                      </p>
                    )}
                  </div>
                ) : null}
                {isIndividualPasswordValid ? (
                  <div>
                    <Input
                      value={checkPassWord ?? ''}
                      onChange={(e: ChangeEvent<HTMLInputElement>) => {
                        setCheckPassWord(e.target.value)
                      }}
                      inputBoxStyle={
                        isIndividualPasswordMatch !== undefined
                          ? isIndividualPasswordMatch
                            ? 'default'
                            : 'error'
                          : 'default'
                      }
                      type={showCheckPassword ? 'text' : 'password'}
                      placeholder={'비밀번호 확인'}
                      customClassName={'w-full'}
                      rightIcon={
                        showCheckPassword ? (
                          <NonEyeIcon
                            onClick={() => {
                              setShowCheckPassword(false)
                            }}
                            width={24}
                            height={24}
                          />
                        ) : (
                          <EyeIcon
                            onClick={() => {
                              setShowCheckPassword(true)
                            }}
                            width={24}
                            height={24}
                          />
                        )
                      }
                    />
                    {isIndividualPasswordMatch !== undefined ? (
                      <div className="badge-md">
                        {isIndividualPasswordMatch ? null : (
                          <p className="text-conic-red-40">비밀번호가 일치하지 않습니다.</p>
                        )}
                      </div>
                    ) : null}
                  </div>
                ) : null}
              </section>
            </section>
          )}
        </div>
      </Modal.Content>
      <Modal.BottomButton>
        <div className="flex gap-x-3">
          <Button1
            styleType={'outline'}
            onClick={() => {
              setIsPasswordChangeModalOpen(false)
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
              if (newPassword) {
                const result = await patchMemberMePassword(currentPassword, newPassword)
                if (result.result === 'SUCCESS') {
                  handleToastSuccess()
                  setIsPasswordChangeModalOpen(false)
                } else {
                  handleToastError()
                }
              }
            }}
            styleSize={'lg'}
            customClassName={'w-full'}
            styleStatus={'default'}
          >
            변경완료
          </Button1>
        </div>
      </Modal.BottomButton>
    </Modal>
  )
}
