import Modal from '@/components/common/Modal'
import Image from 'next/image'
import Button1 from '@/components/common/Button1'
import { useRouter } from 'next/navigation'
import { Dispatch, SetStateAction } from 'react'

interface SignUpSuccessModalProps {
  setIsModalOpen: Dispatch<SetStateAction<boolean>>
  role?: 'INDIVIDUAL' | 'COMPANY'
}

export default function SignUpSuccessModal({ setIsModalOpen, role = 'INDIVIDUAL' }: SignUpSuccessModalProps) {
  const router = useRouter()
  return (
    <Modal>
      <Modal.Content>
        <div className="flex flex-col">
          <div className="gap-y-4xs flex flex-col">
            <h2 className="h2">
              환영합니다!
              <br />
              <span className={'text-conic-red-30'}>회원등록</span>이 완료되었어요.
            </h2>
            {role === 'INDIVIDUAL' ? (
              <p className="body1 text-gray-50">견적서를 바로 작성하시겠어요?</p>
            ) : (
              <p className="body1 text-gray-50">게시된 견적서들을 바로 확인하시겠어요?</p>
            )}
          </div>
          <div className="mt-[24px] flex w-full items-center justify-center">
            <Image src={'/success-graphic.svg'} width={336} height={240} alt={'회원가입 성공'} />
          </div>
        </div>
      </Modal.Content>
      <Modal.BottomButton>
        <div className="flex gap-x-3">
          <Button1
            onClick={() => {
              setIsModalOpen(false)
              router.push('/')
            }}
            styleType={'outline'}
            styleSize={'lg'}
            customClassName={'w-full'}
          >
            다음에
          </Button1>
          <Button1
            onClick={() => {
              setIsModalOpen(false)
              if (role === 'INDIVIDUAL') {
                router.push('/')
              } else {
                router.push('/project')
              }
            }}
            styleType={'primary'}
            styleSize={'lg'}
            customClassName={'w-full'}
          >
            {role === 'INDIVIDUAL' ? '견적서 작성하기' : '견적서 보러가기'}
          </Button1>
        </div>
      </Modal.BottomButton>
    </Modal>
  )
}
