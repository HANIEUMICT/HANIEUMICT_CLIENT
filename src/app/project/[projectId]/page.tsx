'use client'

import BidderList from '@/components/project/BidderList'
import Header from '@/components/common/Header'
import FinalShippingAndExtraInfo from '@/components/project/detail/FinalShippingAndExtraInfo'
import FinalBasicInfo from '@/components/project/detail/FinalBasicInfo'
import FinalRequestCondition from '@/components/project/detail/FinalRequestCondition'
import Button1 from '@/components/common/Button1'
import { useRouter } from 'next/navigation'
import ProcessingBar from '@/components/project/ProcessingBar'
import BusinessInfo from '@/components/proposal/BusinessInfo'
import ProposalContent from '@/components/proposal/ProposalContent'
import AdditionalInfo from '@/components/proposal/AdditionalInfo'
import DrawingUploader from '@/components/proposal/DrawingUploader'
import FinalProposalPreview from '@/components/proposal/FinalProposalPreview'
import ProjectSummaryCard from '@/components/project/ProjectSummaryCard'
import TotalPriceCard from '@/components/proposal/proposal-content/TotalPriceCard'

export default function ProjectDetailPage() {
  const router = useRouter()
  return (
    <main className="flex flex-col items-center justify-center">
      <Header headerType={'DEFAULT'} />
      <div className="gap-y-l mx-auto mt-[120px] flex h-[80px] flex-col">
        <div className="flex w-full items-center justify-between">
          <h2 className="h2">견적서 작성하기</h2>
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
            <FinalBasicInfo />
            <FinalRequestCondition />
            <FinalShippingAndExtraInfo />
          </div>
          <BidderList />
        </div>
      </div>
    </main>
  )
}
