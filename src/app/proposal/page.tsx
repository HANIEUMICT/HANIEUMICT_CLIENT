'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Header from '@/components/common/Header'
import ProcessingBar from '@/components/project/ProcessingBar'
import Button1 from '@/components/common/Button1'
import BusinessInfo from '@/components/proposal/BusinessInfo'
import ProposalContent from '@/components/proposal/ProposalContent'
import AdditionalInfo from '@/components/proposal/AdditionalInfo'
import DrawingUploader from '@/components/proposal/DrawingUploader'
import FinalProposalPreview from '@/components/proposal/FinalProposalPreview'

const steps = ['사업자 정보', '견적 내용 입력', '기타 내용 입력', '도면 입력', '견적서 생성']

export default function ProposalPage() {
  const [currentStep, setCurrentStep] = useState<number>(1)
  const router = useRouter()

  return (
    <main className="flex flex-col items-center">
      <Header headerType={'DEFAULT'} />
      <div className="gap-y-l mt-[120px] flex h-[80px] w-[1063px] flex-col">
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

        <div className="flex flex-col gap-y-[16px]">
          <ProcessingBar steps={steps} currentStep={currentStep} width={'65px'} />
          {currentStep === 1 && <BusinessInfo />}
          {currentStep === 2 && <ProposalContent />}
          {currentStep === 3 && <AdditionalInfo />}
          {currentStep === 4 && <DrawingUploader />}
          {currentStep === 5 && <FinalProposalPreview />}
        </div>
      </div>
    </main>
  )
}
