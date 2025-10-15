import Modal from '@/components/common/Modal'
import Button1 from '@/components/common/Button1'
import { useRouter } from 'next/navigation'

export default function PriorityModal() {
  const router = useRouter()
  return (
    <Modal>
      <Modal.Content>
        <div className="flex flex-col gap-y-2">
          <div className="h2">중요 우선순위를 정해주세요.</div>
          <div className="text-gray-50">우선순위를 기반으로 FABKIT이 공급업체를 추천해드릴께요.</div>
        </div>
      </Modal.Content>
      <Modal.BottomButton>
        <div className="mt-s flex gap-x-3">
          <Button1
            onClick={() => {
              router.push('/')
            }}
            styleSize={'lg'}
            styleStatus={'default'}
            styleType={'outline'}
            customClassName={'w-full'}
          >
            닫기
          </Button1>
          <Button1
            onClick={() => {
              router.push('/')
            }}
            styleSize={'lg'}
            styleStatus={'default'}
            styleType={'primary'}
            customClassName={'w-full'}
          >
            완료
          </Button1>
        </div>
      </Modal.BottomButton>
    </Modal>
  )
}
