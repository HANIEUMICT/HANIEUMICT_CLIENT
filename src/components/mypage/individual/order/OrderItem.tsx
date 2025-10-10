import ProcessingBar from '@/components/create-project/ProcessingBar'
import { ChatIcon, GrayDistanceIcon, GrayFactoryIcon } from '@/assets/svgComponents'
import Button1 from '@/components/common/Button1'
import { useRouter } from 'next/navigation'
import { useModalStore } from '@/store/modalStore'

const stepList = ['거래 승인', '검수', '검수 샘플 제작', '검수 샘플 전달', '검수 샘플 확인', '제작', '배송']

export default function OrderItem() {
  const router = useRouter()
  const setModalState = useModalStore((state) => state.setState)

  return (
    <section
      onClick={(e) => {
        router.push('/mypage/individual/order/1')
        e.stopPropagation()
      }}
      className="gap-y-4xs py-xs hover:border-conic-red-30 flex flex-col rounded-[24px] bg-white px-5 transition hover:border"
    >
      <section className="flex flex-col gap-y-2">
        <div className="flex items-center gap-x-2">
          <div className="bg-conic-orange-10 text-conic-orange-30 button-sm flex h-[24px] items-center justify-center rounded-full px-2">
            선반 가공 및 밀링
          </div>
          <h1 className="h3">고강도 합금강 육각 머리 볼트(M10) 제작</h1>
        </div>
        <div className="gap-x-4xs flex items-center">
          <p className="body2 text-gray-40">제조 분류</p>
          <div className="flex gap-x-1">
            <div className="border-gray-20 button-sm flex h-[24px] w-fit items-center justify-center rounded-full border px-2 text-gray-50">
              절삭 가공
            </div>
            {/*<div className="border-gray-20 button-sm flex h-[24px] w-fit items-center justify-center rounded-full border px-2 text-gray-50">*/}
            {/*  제조 분류*/}
            {/*</div>*/}
          </div>
        </div>
        <ProcessingBar row={false} steps={stepList} currentStep={1} width={'82px'} />
      </section>

      <section className="bg-gray-10 flex justify-between rounded-[12px] p-3">
        <div className="gap-y-4xs flex w-[235px] flex-col">
          <p className="body2 text-gray-40">납기일</p>
          <p className="button-sm text-gray-50">2025년 10월 31일</p>
        </div>
        <div className="gap-y-4xs flex w-[235px] flex-col">
          <p className="body2 text-gray-40">추정액</p>
          <p className="button-sm text-gray-50">개당 300원 (총 15,000,000원)</p>
        </div>
        <div className="gap-y-4xs flex w-[235px] flex-col">
          <p className="body2 text-gray-40">입찰 마감일</p>
          <p className="button-sm text-gray-50">2025년 9월 20일</p>
        </div>
        <div className="gap-y-4xs flex w-[235px] flex-col">
          <p className="body2 text-gray-40">제작 시작일</p>
          <p className="button-sm text-gray-50">2025. 08. 01(화)</p>
        </div>
      </section>

      <section className="flex justify-between">
        <div className="gap-x-2xs flex">
          <div className="gap-x-5xs flex items-center">
            <GrayFactoryIcon width={20} height={20} />
            <p className="button-sm text-gray-50">유일</p>
          </div>
          <div className="gap-x-5xs flex items-center">
            <GrayDistanceIcon width={20} height={20} />
            <p className="button-sm text-gray-50">서울 강남</p>
          </div>
        </div>

        <Button1
          onClick={() => {
            setModalState({ isServicePreparingModalOpen: true })
          }}
          leftIcon={<ChatIcon width={24} height={20} />}
          styleStatus={'default'}
          styleSize={'sm'}
          styleType={'outline'}
          customClassName={'h-[36px] px-2xs rounded-full text-gray-40'}
        >
          '유일' 공장과 채팅
        </Button1>
      </section>
    </section>
  )
}
