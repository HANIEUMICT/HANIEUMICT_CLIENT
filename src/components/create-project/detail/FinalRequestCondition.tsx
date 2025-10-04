import DownloadItem from '@/components/common/DownloadItem'
import { extractImageInfo } from '@/utils/project'
import Button1 from '@/components/common/Button1'

interface FinalRequestConditionProps {
  drawingUrls: string[] | undefined
  projectQuantity?: number | null
  requests?: string | null
  deadline?: string | null
  canDeadlineChange?: boolean
  requestEstimate?: number | null
  publicUntil?: string | null
}
export default function FinalRequestCondition({
  drawingUrls,
  projectQuantity,
  requestEstimate,
  requests,
  publicUntil,
  deadline,
  canDeadlineChange,
}: FinalRequestConditionProps) {
  return (
    <section className="border-gray-20 flex w-[1063px] flex-col gap-y-[16px] rounded-[24px] border bg-white p-6">
      <h1 className="sub1">요청 조건입력</h1>
      <section className="flex flex-col gap-y-[16px]">
        <div className="flex flex-col gap-y-3">
          <div className="flex w-[577px] flex-col gap-y-[12px]">
            <p className="sub2">도면 소유 여부</p>
            <p className="body1 text-gray-40">예 (첨부된 CAD 파일 참조)</p>
          </div>
          <div className="flex flex-col gap-y-2">
            {drawingUrls
              ? drawingUrls.map((drawingUrl, index) => {
                  return (
                    <DownloadItem
                      key={index + drawingUrl}
                      ImageUrlName={extractImageInfo(drawingUrl).imageName}
                      ImageUrl={drawingUrl}
                    />
                  )
                })
              : null}
          </div>
          <div className="flex flex-col gap-y-[12px]">
            <p className="sub2">제조 수량</p>
            <p className="body1 text-gray-40">{projectQuantity}개</p>
          </div>
          <div className="flex flex-col gap-y-[12px]">
            <p className="sub2">세부 요청사항</p>
            <p className="body1 text-gray-40">{requests}</p>
          </div>
          <div className="flex justify-between">
            <div className="flex flex-col gap-y-[12px]">
              <p className="sub2">납기일</p>
              <div className="flex flex-col gap-y-1">
                <p className="body1 text-gray-40">{deadline}</p>
                <p className="body1 text-gray-40">{canDeadlineChange ? '협의가능' : null}</p>
              </div>
            </div>
            <div className="flex flex-col gap-y-[12px]">
              <p className="sub2">추정 예산</p>
              <p className="body1 text-gray-40">{requestEstimate?.toLocaleString()}원</p>
            </div>
            <div className="flex w-[200px] flex-col gap-y-[12px]">
              <p className="sub2">입찰 마감일</p>
              <p className="body1 text-gray-40">{publicUntil}</p>
            </div>
          </div>
        </div>
      </section>
    </section>
  )
}
