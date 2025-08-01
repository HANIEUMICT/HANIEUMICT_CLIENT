import Button1 from '@/components/common/Button1'
import UploadItem from '@/components/common/UploadItem'
import { useProjectStore } from '@/store/projectStore'
import { Dispatch, SetStateAction } from 'react'

interface FinalRequestConditionProps {
  setCurrentStep: Dispatch<SetStateAction<number>>
}

export default function FinalRequestCondition({ setCurrentStep }: FinalRequestConditionProps) {
  const finalProjectData = useProjectStore((state) => state.finalProjectData)

  return (
    <section className="border-gray-20 flex flex-col gap-y-[16px] rounded-[24px] border bg-white p-6">
      <h1 className="sub1">요청 조건입력</h1>
      <section className="flex flex-col gap-y-[16px]">
        <div className="flex flex-col gap-y-3">
          <div className="flex w-[577px] flex-col gap-y-[12px]">
            <p className="sub2">도면 소유 여부</p>
            <p className="body1 text-gray-40">프로젝트명</p>
          </div>
          <div className="flex flex-col gap-y-2">
            {finalProjectData?.drawingUrls.map((drawingUrl) => {
              return (
                <UploadItem
                  ImageUrl={drawingUrl}
                  ImageUrlName={drawingUrl}
                  imageSize={drawingUrl}
                  onRemove={() => {}}
                />
              )
            })}
          </div>
          <div className="flex w-[577px] flex-col gap-y-[12px]">
            <p className="sub2">제조 수량</p>
            <p className="body1 text-gray-40">{finalProjectData?.projectRegisterRequest.projectQuantity}</p>
          </div>
          <div className="flex w-[577px] flex-col gap-y-[12px]">
            <p className="sub2">세부 요청사항</p>
            <p className="body1 text-gray-40">{finalProjectData?.projectRegisterRequest.requests}</p>
          </div>
          <div className="flex">
            <div className="flex w-[380px] w-[577px] flex-col gap-y-[12px]">
              <p className="sub2">납기일</p>
              <div className="flex flex-col gap-y-1">
                <p className="body1 text-gray-40">{finalProjectData?.projectRegisterRequest.deadline}</p>
                <p className="body1 text-gray-40">
                  {finalProjectData?.projectRegisterRequest.canDeadlineChange ? '협의가능' : null}
                </p>
              </div>
            </div>
            <div className="flex w-[380px] w-[577px] flex-col gap-y-[12px]">
              <p className="sub2">추정 예산</p>
              <p className="body1 text-gray-40">{finalProjectData?.projectRegisterRequest.requestEstimate}</p>
            </div>
            <div className="flex w-[380px] w-[577px] flex-col gap-y-[12px]">
              <p className="sub2">입찰 마감일</p>
              <p className="body1 text-gray-40">{finalProjectData?.projectRegisterRequest.publicUntil}</p>
            </div>
          </div>
        </div>
      </section>
      <div className="flex w-full justify-end">
        <Button1
          onClick={() => {
            setCurrentStep(4)
          }}
          styleType={'outline'}
          styleStatus={'default'}
          styleSize={'md'}
          customClassName={'w-[128px] h-[48px]'}
        >
          수정
        </Button1>
      </div>
    </section>
  )
}
