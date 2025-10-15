import Modal from '@/components/common/Modal'
import Button1 from '@/components/common/Button1'
import { useModalStore } from '@/store/modalStore'
import { useRouter } from 'next/navigation'
import Cookies from 'js-cookie'

export default function TokenExpiredModal() {
  const setModalState = useModalStore((state) => state.setState)
  const router = useRouter()
  return (
    <Modal>
      <Modal.Content>
        <div className="h2">로그인을 다시 진행해주세요</div>
      </Modal.Content>
      <Modal.BottomButton>
        <Button1
          onClick={() => {
            setModalState({ isTokenExpiredModalOpen: false })
            router.push('/login')
            Cookies.remove('accessToken')
            Cookies.remove('refreshToken')
            localStorage.removeItem('userData')
          }}
          styleStatus={'default'}
          styleType={'outline'}
        >
          로그인하러 가기
        </Button1>
      </Modal.BottomButton>
    </Modal>
  )
}
