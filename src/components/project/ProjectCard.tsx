import { ChatIcon, GrayFavoriteIcon, ImgUploadIcon } from '@/assets/svgComponents'
import Image from 'next/image'
import { ProjectResponseType } from '@/type/project'
import { useRouter } from 'next/navigation'
import { Dispatch, SetStateAction, useState } from 'react'
import { useModalStore } from '@/store/modalStore'
import { postFavoriteProject } from '@/lib/project'
import { useToast } from '@/provider/ToastProvider'

interface ProjectCardProps extends ProjectResponseType {
  setSelectedProjectId?: Dispatch<SetStateAction<number | undefined>>
  setIsCopyrightAgreementModalOpen?: Dispatch<SetStateAction<boolean>>
}

export default function ProjectCard({
  projectRegisterRequest,
  projectId,
  drawingUrls,
  setSelectedProjectId,
  setIsCopyrightAgreementModalOpen,
}: ProjectCardProps) {
  const router = useRouter()
  const setState = useModalStore((state) => state.setState)
  const [imageError, setImageError] = useState(false)

  const { showToast } = useToast()

  return (
    <div
      onClick={(e) => {
        if (setSelectedProjectId && setIsCopyrightAgreementModalOpen) {
          setSelectedProjectId(projectId)
          setIsCopyrightAgreementModalOpen(true)
        } else {
          router.push(`/project/${projectId}`)
        }
        e.stopPropagation()
      }}
      className="gap-y-4xs py-xs hover:border-conic-red-30 flex cursor-pointer flex-col rounded-[24px] bg-white px-5 transition hover:border"
    >
      <h3 className="h3">{projectRegisterRequest.projectTitle}</h3>
      <section className="gap-x-2xs flex">
        {drawingUrls && drawingUrls.length > 0 ? (
          <>
            {imageError ? (
              <div className="flex-shrink-0">
                <ImgUploadIcon width={110} height={110} />
              </div>
            ) : (
              <div className="relative h-[110px] w-[110px] flex-shrink-0">
                <Image
                  onError={() => setImageError(true)}
                  src={drawingUrls[0]}
                  alt={'사진'}
                  className="rounded-[16px] object-cover"
                  fill
                />
              </div>
            )}
          </>
        ) : (
          <div className="flex-shrink-0">
            <ImgUploadIcon width={110} height={110} />
          </div>
        )}

        <div className="flex w-full flex-col gap-y-2">
          <div className="button-sm text-conic-orange-30 bg-conic-orange-10 flex h-[24px] w-fit items-center justify-center rounded-full px-2">
            {projectRegisterRequest.category}
          </div>
          <div className="gap-y-5xs flex flex-col">
            <section className="flex gap-x-2">
              <div className="border-gray-20 button-sm flex h-[24px] w-fit items-center justify-center rounded-full border px-2 text-gray-50">
                {projectRegisterRequest.purpose}
              </div>
            </section>
            <div className="flex w-full items-center justify-between">
              <p className="body2 text-gray-40">납기일</p>
              <p className="button-sm text-gray-50">{projectRegisterRequest.deadline}</p>
            </div>
            <div className="flex w-full items-center justify-between">
              <p className="body2 text-gray-40">추정액</p>
              <p className="button-sm text-gray-50">{projectRegisterRequest.requestEstimate?.toLocaleString()}원</p>
            </div>
            <div className="flex w-full items-center justify-between">
              <p className="body2 text-gray-40">입찰 마감일</p>
              <p className="button-sm text-gray-50">{projectRegisterRequest.publicUntil} 까지</p>
            </div>
          </div>
        </div>
      </section>
      <section className="flex justify-between">
        <div
          onClick={async (e) => {
            e.stopPropagation() // 부모 클릭 이벤트 전파 중단
            const result = await postFavoriteProject(projectId)
            if (result.result === 'SUCCESS') {
              showToast('찜하기 성공', 'success')
            } else if (result.result === 'ERROR') {
              showToast('찜하기 실패', 'error')
            }
            // setState({ isServicePreparingModalOpen: true })
          }}
          className="gap-x-5xs flex items-center"
        >
          <GrayFavoriteIcon width={20} height={18} />
          <p className="button-sm text-gray-30">123</p>
        </div>
        <button
          onClick={(e) => {
            e.stopPropagation() // 부모 클릭 이벤트 전파 중단
            setState({ isServicePreparingModalOpen: true })
          }}
          className="px-2xs border-gray-20 button-sm text-gray-40 flex h-[36px] w-fit cursor-pointer items-center justify-center gap-x-2 rounded-full border"
        >
          <ChatIcon width={24} height={19} />
          <p>채팅하기</p>
        </button>
      </section>
    </div>
  )
}
