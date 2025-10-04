'use client'

import BidderList from '@/components/create-project/BidderList'
import Header from '@/components/common/Header'
import FinalShippingAndExtraInfo from '@/components/create-project/detail/FinalShippingAndExtraInfo'
import FinalBasicInfo from '@/components/create-project/detail/FinalBasicInfo'
import FinalRequestCondition from '@/components/create-project/detail/FinalRequestCondition'
import Button1 from '@/components/common/Button1'
import { usePathname, useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { getProjectDetail } from '@/lib/project'
import { ProjectDetailResponseType } from '@/type/project'

export default function ProjectDetailPage() {
  const router = useRouter()
  const pathName = usePathname()
  const [projectDetailData, setProjectDetailData] = useState<ProjectDetailResponseType | undefined>()

  useEffect(() => {
    const projectId = pathName.split('/').pop()
    getProjectDetail(projectId).then((response) => {
      if (response.result === 'SUCCESS' && response.data) {
        setProjectDetailData(response.data)
      }
    })
  }, [pathName])

  return (
    <main className="flex flex-col items-center justify-center">
      <Header headerType={'DEFAULT'} />
      <div className="gap-y-l mx-auto mt-[120px] flex h-[80px] flex-col">
        <div className="flex w-full items-center justify-between">
          <h2 className="h2">견적서 상세보기</h2>
          <Button1
            onClick={() => {
              router.back()
            }}
            styleType={'outline'}
            styleStatus={'default'}
            styleSize={'sm'}
            customClassName={'rounded-full text-gray-40 h-[36px]'}
          >
            나가기
          </Button1>
        </div>

        <div className="flex gap-x-[24px]">
          <div className="flex flex-col gap-y-[16px]">
            <FinalBasicInfo
              projectTitle={projectDetailData?.projectDetailResponse.projectRegisterRequest.projectTitle}
              categoryDetail={projectDetailData?.projectDetailResponse.projectRegisterRequest.categoryDetail}
              category={projectDetailData?.projectDetailResponse.projectRegisterRequest.category}
              categoryDetailEtc={projectDetailData?.projectDetailResponse.projectRegisterRequest.categoryDetailEtc}
              purpose={projectDetailData?.projectDetailResponse.projectRegisterRequest.purpose}
              purposeEtc={projectDetailData?.projectDetailResponse.projectRegisterRequest.purposeEtc}
            />
            <FinalRequestCondition
              drawingUrls={projectDetailData?.projectDetailResponse.drawingUrls}
              requests={projectDetailData?.projectDetailResponse.projectRegisterRequest.requests}
              requestEstimate={projectDetailData?.projectDetailResponse.projectRegisterRequest.requestEstimate}
              projectQuantity={projectDetailData?.projectDetailResponse.projectRegisterRequest.projectQuantity}
              deadline={projectDetailData?.projectDetailResponse.projectRegisterRequest.deadline}
              canDeadlineChange={projectDetailData?.projectDetailResponse.projectRegisterRequest.canDeadlineChange}
              publicUntil={projectDetailData?.projectDetailResponse.projectRegisterRequest.publicUntil}
            />
            <FinalShippingAndExtraInfo
              canPhoneConsult={projectDetailData?.projectDetailResponse.projectRegisterRequest.canPhoneConsult}
              deliveryAddress={projectDetailData?.projectDetailResponse.projectRegisterRequest.deliveryAddress}
              projectStatus={projectDetailData?.projectDetailResponse.projectRegisterRequest.projectStatus}
            />
          </div>
          <BidderList
            memberId={projectDetailData?.projectDetailResponse.projectRegisterRequest.memberId}
            proposalThumbnails={projectDetailData?.proposalThumbnails}
            publicUntil={projectDetailData?.projectDetailResponse.projectRegisterRequest.publicUntil}
          />
        </div>
      </div>
    </main>
  )
}
