import Button1 from '@/components/common/Button1'
import { useState } from 'react'
import { useProjectStore } from '@/store/projectStore'

export default function VisibilitySelect() {
  const [isPublic, setIsPublic] = useState<boolean | undefined>(undefined)
  const projectData = useProjectStore((state) => state.projectData)
  const setState = useProjectStore((state) => state.setState)
  return (
    <div className="flex flex-col gap-y-[16px]">
      <section className="flex flex-col gap-y-2">
        <p className="sub2">견적서 공개 여부</p>
        <div className="gap-x-3xs flex">
          <Button1
            onClick={() => {
              setIsPublic(isPublic === true ? undefined : true)
            }}
            styleType={isPublic ? 'outline2' : 'outline'}
            styleSize={'lg'}
            styleStatus={isPublic ? 'selected' : 'default'}
            customClassName={'w-full'}
          >
            공개
          </Button1>
          <Button1
            onClick={() => {
              setIsPublic(isPublic === false ? undefined : false)
              setState({
                projectData: {
                  ...projectData,
                  projectStatus: projectData?.projectStatus === 'PRIVATE' ? undefined : 'PRIVATE',
                },
              })
            }}
            styleType={isPublic === false ? 'outline2' : 'outline'}
            styleSize={'lg'}
            styleStatus={isPublic === false ? 'selected' : 'default'}
            customClassName={'w-full'}
          >
            비공개
          </Button1>
        </div>
      </section>
      {isPublic && (
        <section className="flex flex-col gap-y-2">
          <p className="sub2">견적서를 공개할 공장</p>
          <p className="body1 text-conic-orange-40">모든 공장 혹은 찜한 공장 중에서 선택할 수 있습니다.</p>
          <div className="gap-y-3xs flex flex-col">
            <div
              onClick={() => {
                setState({
                  projectData: {
                    ...projectData,
                    projectStatus: projectData?.projectStatus === 'PUBLIC' ? undefined : 'PUBLIC',
                  },
                })
              }}
              className="flex cursor-pointer gap-x-2"
            >
              {projectData?.projectStatus === 'PUBLIC' ? (
                <div className="border-conic-red-30 flex h-[24px] w-[24px] items-center justify-center rounded-full border-[1.6px]">
                  <div className="bg-conic-red-30 h-[12px] w-[12px] rounded-full" />
                </div>
              ) : (
                <div className="border-gray-30 h-[24px] w-[24px] rounded-full border-[1.6px]" />
              )}

              <p className="body1 text-gray-50">모든 공장에게 공개</p>
            </div>
            <div
              onClick={() => {
                setState({
                  projectData: {
                    ...projectData,
                    projectStatus: projectData?.projectStatus === 'PROTECTED' ? undefined : 'PROTECTED',
                  },
                })
              }}
              className="flex cursor-pointer gap-x-2"
            >
              {projectData?.projectStatus === 'PROTECTED' ? (
                <div className="border-conic-red-30 flex h-[24px] w-[24px] items-center justify-center rounded-full border-[1.6px]">
                  <div className="bg-conic-red-30 h-[12px] w-[12px] rounded-full" />
                </div>
              ) : (
                <div className="border-gray-30 h-[24px] w-[24px] rounded-full border-[1.6px]" />
              )}
              <p className="body1 text-gray-50">찜한 공장에서 선택</p>
            </div>
          </div>
        </section>
      )}
    </div>
  )
}
