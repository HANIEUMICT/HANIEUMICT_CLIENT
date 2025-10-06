import Button1 from '@/components/common/Button1'
import { ChatIcon, FavoriteIcon } from '@/assets/svgComponents'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { proposalThumbnailType } from '@/type/project'
import { getUserData } from '@/utils/common'
import { postFavoriteProject } from '@/lib/project'
import { useModalStore } from '@/store/modalStore'

interface BidderListProps {
  projectId: string | undefined
  memberId: number | null | undefined
  proposalThumbnails: proposalThumbnailType[] | undefined
  publicUntil: string | null | undefined
}

export default function BidderList({ projectId, memberId, proposalThumbnails, publicUntil }: BidderListProps) {
  const router = useRouter()
  const [click, setClick] = useState(false)
  const [isWriter, setIsWriter] = useState<boolean>()
  const [hasPermission, setHasPermission] = useState(true)
  const setModalState = useModalStore((state) => state.setState)

  useEffect(() => {
    if (getUserData()?.memberId === memberId) {
      setIsWriter(true)
    } else {
      setIsWriter(false)
    }
  }, [memberId, getUserData()])

  useEffect(() => {
    if (getUserData()?.memberRole === 'INDIVIDUAL') {
      setHasPermission(false)
    } else {
      setHasPermission(true)
    }
  }, [memberId, getUserData()])

  return (
    <div className="gap-y-2xs flex flex-col">
      <div
        className={`${proposalThumbnails && proposalThumbnails?.length === 0 ? 'h-fit' : 'h-[763px]'} border-gray-20 relative w-[442px] rounded-[24px] border bg-white`}
      >
        <div className="gap-y-xs p-s flex flex-col">
          <section className="flex flex-col gap-y-3">
            <p className="sub1">입찰 현황{proposalThumbnails ? `(${proposalThumbnails?.length})` : null}</p>
            <div className="flex w-full justify-between">
              <p className="body1 text-gray-50">입찰 마감일</p>
              <p className="sub2 text-gray-50">{publicUntil}</p>
            </div>
          </section>
          {proposalThumbnails && proposalThumbnails.length > 0 ? (
            proposalThumbnails.map((proposalThumbnail) => {
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
          ) : (
            <div className="flex h-[208px] flex-col items-center justify-center">
              <p className="sub2 text-gray-50">아직 입찰 현황이 없습니다.</p>
            </div>
          )}

          {/* 글쓴이와 소상공인(개인) 한테 제한 */}
          {!isWriter && (
            <Button1
              disabled={!hasPermission}
              onClick={() => {
                router.push('/create-proposal')
              }}
              styleType={'primary'}
              styleStatus={hasPermission ? 'default' : 'disabled'}
              styleSize={'lg'}
              customClassName={'w-full'}
            >
              견적서 작성 후 입찰
            </Button1>
          )}
        </div>
      </div>

      {/* 글쓴이와 소상공인(개인) 한테 제한 */}
      {!isWriter && hasPermission ? (
        <div className="flex gap-x-2">
          <Button1
            onClick={async () => {
              const result = await postFavoriteProject(projectId)
              console.log('result', result)
            }}
            styleType={'outline'}
            leftIcon={<FavoriteIcon width={24} height={24} />}
            customClassName={'w-full'}
          >
            관심 프로젝트
          </Button1>
          <Button1
            onClick={() => {
              setModalState({ isServicePreparingModalOpen: true })
            }}
            styleType={'outline'}
            leftIcon={<ChatIcon width={24} height={24} />}
            customClassName={'w-full'}
          >
            채팅하기
          </Button1>
        </div>
      ) : null}
    </div>
  )
}
