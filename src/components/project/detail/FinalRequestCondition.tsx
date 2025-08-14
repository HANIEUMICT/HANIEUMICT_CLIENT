import DownloadItem from '@/components/common/DownloadItem'
import { extractImageInfo } from '@/utils/project'
import Button1 from '@/components/common/Button1'

interface FinalRequestConditionProps {}
export default function FinalRequestCondition() {
  return (
    <section className="border-gray-20 flex w-[1063px] flex-col gap-y-[16px] rounded-[24px] border bg-white p-6">
      <h1 className="sub1">요청 조건입력</h1>
      <section className="flex flex-col gap-y-[16px]">
        <div className="flex flex-col gap-y-3">
          <div className="flex w-[577px] flex-col gap-y-[12px]">
            <p className="sub2">도면 소유 여부</p>
            <p className="body1 text-gray-40">프로젝트명</p>
          </div>
          <div className="flex flex-col gap-y-2">
            {/*{finalProjectData?.drawingUrls.map((drawingUrl) => {*/}
            {/*  return (*/}
            {/*    <DownloadItem*/}
            {/*      key={drawingUrl}*/}
            {/*      ImageUrlName={extractImageInfo(drawingUrl).imageName}*/}
            {/*      ImageUrl={drawingUrl}*/}
            {/*    />*/}
            {/*  )*/}
            {/*})}*/}
          </div>
          <div className="flex flex-col gap-y-[12px]">
            <p className="sub2">제조 수량</p>
            <p className="body1 text-gray-40">{''}</p>
          </div>
          <div className="flex flex-col gap-y-[12px]">
            <p className="sub2">세부 요청사항</p>
            <p className="body1 text-gray-40">{''}</p>
          </div>
          <div className="flex">
            <div className="flex flex-col gap-y-[12px]">
              <p className="sub2">납기일</p>
              <div className="flex flex-col gap-y-1">
                <p className="body1 text-gray-40">{''}</p>
                <p className="body1 text-gray-40">
                  {/*{finalProjectData?.projectRegisterRequest.canDeadlineChange ? '협의가능' : null}*/}
                </p>
              </div>
            </div>
            <div className="flex flex-col gap-y-[12px]">
              <p className="sub2">추정 예산</p>
              <p className="body1 text-gray-40">{''}</p>
            </div>
            <div className="flex flex-col gap-y-[12px]">
              <p className="sub2">입찰 마감일</p>
              <p className="body1 text-gray-40">{''}</p>
            </div>
          </div>
        </div>
      </section>
    </section>
  )
}
