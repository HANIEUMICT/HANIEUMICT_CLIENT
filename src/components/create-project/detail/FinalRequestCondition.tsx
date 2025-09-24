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
            <p className="body1 text-gray-40">예 (첨부된 CAD 파일 참조)</p>
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
            <DownloadItem ImageUrl={'/test/result.png'} ImageUrlName={'/test/result.png'}></DownloadItem>
          </div>
          <div className="flex flex-col gap-y-[12px]">
            <p className="sub2">제조 수량</p>
            <p className="body1 text-gray-40">{'50,000개'}</p>
          </div>
          <div className="flex flex-col gap-y-[12px]">
            <p className="sub2">세부 요청사항</p>
            <p className="body1 text-gray-40">
              {"머리 부분에 당사 로고 'A+' 레이저 각인 필요.\n" +
                '\n' +
                '전수 검사를 통한 불량률 0.1% 미만 보증.\n' +
                '\n' +
                '1,000개 단위로 방청 처리 후 진공 포장.'}
            </p>
          </div>
          <div className="flex justify-between">
            <div className="flex flex-col gap-y-[12px]">
              <p className="sub2">납기일</p>
              <div className="flex flex-col gap-y-1">
                <p className="body1 text-gray-40">{'2025년 10월 31일'}</p>
                <p className="body1 text-gray-40">
                  {/*{finalProjectData?.projectRegisterRequest.canDeadlineChange ? '협의가능' : null}*/}
                </p>
              </div>
            </div>
            <div className="flex flex-col gap-y-[12px]">
              <p className="sub2">추정 예산</p>
              <p className="body1 text-gray-40">{'개당 300원 (총 15,000,000원)'}</p>
            </div>
            <div className="flex w-[200px] flex-col gap-y-[12px]">
              <p className="sub2">입찰 마감일</p>
              <p className="body1 text-gray-40">{'2025년 9월 20일'}</p>
            </div>
          </div>
        </div>
      </section>
    </section>
  )
}
