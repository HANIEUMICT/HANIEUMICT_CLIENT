'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Header from '@/components/common/Header'
import ProcessingBar from '@/components/create-project/ProcessingBar'
import Button1 from '@/components/common/Button1'
import BusinessInfo from '@/components/create-proposal/BusinessInfo'
import ProposalContent from '@/components/create-proposal/ProposalContent'
import AdditionalInfo from '@/components/create-proposal/AdditionalInfo'
import DrawingUploader from '@/components/create-proposal/DrawingUploader'
import FinalProposalPreview from '@/components/create-proposal/FinalProposalPreview'
import ProjectSummaryCard from '@/components/create-project/ProjectSummaryCard'

const steps = ['사업자 정보', '견적 내용 입력', '기타 내용 입력', '도면 입력', '견적서 생성']

export default function ProposalPage() {
  const [currentStep, setCurrentStep] = useState<number>(1)
  const router = useRouter()

  return (
    <main className="flex flex-col">
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
            <ProcessingBar steps={steps} currentStep={currentStep} width={'65px'} />
            {currentStep === 1 && <BusinessInfo setCurrentStep={setCurrentStep} />}
            {currentStep === 2 && <ProposalContent setCurrentStep={setCurrentStep} />}
            {currentStep === 3 && <AdditionalInfo setCurrentStep={setCurrentStep} />}
            {currentStep === 4 && <DrawingUploader setCurrentStep={setCurrentStep} />}
            {currentStep === 5 && <FinalProposalPreview setCurrentStep={setCurrentStep} />}
          </div>
          <div className="gap-y-s flex flex-col">
            <ProjectSummaryCard />
          </div>
        </div>
      </div>
    </main>
  )
}
