import { ChatIcon, GrayFavoriteIcon } from '@/assets/svgComponents'
import Image from 'next/image'
import { ProjectResponseType } from '@/type/project'
import { useRouter } from 'next/navigation'

interface ProjectCardProps extends ProjectResponseType {}

export default function ProjectCard({ projectRegisterRequest, projectId, drawingUrls, modifiedAt }: ProjectCardProps) {
  const router = useRouter()
  return (
    <div
      onClick={(e) => {
        e.stopPropagation()
        router.push(`/project/${projectId}`)
      }}
      className="gap-y-4xs py-xs flex flex-col rounded-[24px] bg-white px-5"
    >
      <h3 className="h3">{projectRegisterRequest.projectTitle}</h3>
      <section className="gap-x-2xs flex">
        {drawingUrls && drawingUrls.length > 0 ? (
          <div className="relative h-[110px] w-[110px] flex-shrink-0">
            <Image src={drawingUrls[0]} alt={'사진'} className="rounded-[16px] object-cover" fill></Image>
          </div>
        ) : (
          <div className="bg-gray-20 h-[110px] w-[110px] flex-shrink-0 rounded-[16px]" />
        )}

        <div className="flex w-full flex-col gap-y-2">
          <div className="button-sm text-conic-orange-30 bg-conic-orange-10 flex h-[24px] w-fit items-center justify-center rounded-full px-2">
            {projectRegisterRequest.category}
          </div>
          <div className="gap-y-5xs flex flex-col">
            <section className="flex gap-x-2">
              <div className="border-gray-20 button-sm flex h-[24px] w-fit items-center justify-center rounded-full border px-2 text-gray-50">
                {projectRegisterRequest.category}
              </div>
              <div className="border-gray-20 button-sm flex h-[24px] w-fit items-center justify-center rounded-full border px-2 text-gray-50">
                {projectRegisterRequest.categoryDetail}
              </div>
            </section>
            <div className="flex w-full items-center justify-between">
              <p className="body2 text-gray-40">납기일</p>
              <p className="button-sm text-gray-50">2025. 08. 01(화)</p>
            </div>
            <div className="flex w-full items-center justify-between">
              <p className="body2 text-gray-40">추정액</p>
              <p className="button-sm text-gray-50">{projectRegisterRequest.requestEstimate?.toLocaleString()}원</p>
            </div>
            <div className="flex w-full items-center justify-between">
              <p className="body2 text-gray-40">입찰 마감일</p>
              <p className="button-sm text-gray-50">~ {projectRegisterRequest.canDeadlineChange}까지</p>
            </div>
          </div>
        </div>
      </section>
      <section className="flex justify-between">
        <div className="gap-x-5xs flex items-center">
          <GrayFavoriteIcon width={20} height={18} />
          <p className="button-sm text-gray-30">123</p>
        </div>
        <button className="px-2xs border-gray-20 button-sm text-gray-40 flex h-[36px] w-fit items-center justify-center gap-x-2 rounded-full border">
          <ChatIcon width={24} height={19} />
          <p>채팅하기</p>
        </button>
      </section>
    </div>
  )
}
