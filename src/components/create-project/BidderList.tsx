import Button1 from '@/components/common/Button1'
import { ChatIcon, FavoriteIcon } from '@/assets/svgComponents'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { proposalThumbnailType } from '@/type/project'
import { getUserData } from '@/utils/common'

interface BidderListProps {
  memberId: number | null | undefined
  proposalThumbnails: proposalThumbnailType[] | undefined
  publicUntil: string | null | undefined
}

export default function BidderList({ memberId, proposalThumbnails, publicUntil }: BidderListProps) {
  const router = useRouter()
  const [click, setClick] = useState(false)
  const [isWriter, setIsWriter] = useState<boolean>()

  useEffect(() => {
    if (getUserData()?.memberId === memberId) {
      setIsWriter(true)
    } else {
      setIsWriter(false)
    }
  }, [memberId, getUserData()])

  return (
    <div className="border-gray-20 relative h-[763px] w-[442px] rounded-[24px] border bg-white">
      <div className="gap-y-xs p-s flex flex-col">
        <section className="flex flex-col gap-y-3">
          <p className="sub1">입찰 현황{proposalThumbnails ? `(${proposalThumbnails?.length})` : null}</p>
          <div className="flex w-full justify-between">
            <p className="body1 text-gray-50">입찰 마감일</p>
            <p className="sub2 text-gray-50">{publicUntil}</p>
          </div>
        </section>
        {proposalThumbnails
          ? proposalThumbnails.map((proposalThumbnail) => {
              return (
                <section
                  onClick={() => setClick(!click)}
                  className={`${click ? 'border-conic-red-20 p-2xs gap-y-4xs flex w-full flex-col rounded-[16px] border' : 'border-gray-20 p-2xs gap-y-4xs flex w-full flex-col rounded-[16px] border'}`}
                >
                  <p className="h3">{proposalThumbnail.companyThumbnailResponse.companyName}</p>
                  <div className="flex items-center justify-between">
                    <p className="body2 text-gray-40">제안 가격</p>
                    <p className="button-sm text-gray-50">{proposalThumbnail.totalPrice}</p>
                  </div>
                  <div className="flex items-center justify-between">
                    <p className="body2 text-gray-40">최대 제조 가능 날짜</p>
                    <p className="button-sm text-gray-50">{proposalThumbnail.operateUntil}</p>
                  </div>
                </section>
              )
            })
          : null}
      </div>
      {proposalThumbnails && proposalThumbnails.length > 0 ? (
        <section className="gap-x-4xs p-s absolute bottom-0 flex w-full">
          {!isWriter ? (
            <button className="border-gray-20 flex h-[52px] w-[52px] min-w-[52px] flex-shrink-0 items-center justify-center rounded-[12px] border whitespace-nowrap">
              <FavoriteIcon width={24} height={24} />
            </button>
          ) : null}
          <button className="border-gray-20 flex h-[52px] w-[52px] min-w-[52px] flex-shrink-0 items-center justify-center rounded-[12px] border whitespace-nowrap">
            <ChatIcon width={24} height={24} />
          </button>
          <Button1
            onClick={() => {
              router.push('/proposal')
            }}
            styleType={'primary'}
            styleStatus={'default'}
            styleSize={'lg'}
            customClassName={'w-full'}
          >
            선택하기
          </Button1>
        </section>
      ) : null}
    </div>
  )
}
