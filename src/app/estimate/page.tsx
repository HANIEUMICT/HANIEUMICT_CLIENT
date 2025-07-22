'use client'

import ProcessingBar from '@/components/estimate/ProcessingBar'
import Header from '@/components/common/Header'
import { useState } from 'react'
import BasicInfo from '@/components/estimate/BasicInfo'
import DrawingRegistration from '@/components/estimate/DrawingRegistration'
import ProjectInfo from '@/components/estimate/ProjectInfo'
import ShippingInfo from '@/components/estimate/ShippingInfo'
import EstimateCreator from '@/components/estimate/EstimateCreator'

export default function EstimatePage() {
  const [currentStep, setCurrentStep] = useState<number>(2)

  return (
    <main className="flex flex-col items-center justify-center">
      <Header headerType={'DEFAULT'} />
      <div className="mt-[180px] mb-[120px] flex w-[1280px] flex-col gap-y-[32px]">
        <h2 className="h2">견적서 작성하기</h2>
        <ProcessingBar currentStep={currentStep} />
        {currentStep === 2 && <BasicInfo setCurrentStep={setCurrentStep} />}
        {currentStep === 3 && <DrawingRegistration setCurrentStep={setCurrentStep} />}
        {currentStep === 4 && <ProjectInfo setCurrentStep={setCurrentStep} />}
        {currentStep === 5 && <ShippingInfo setCurrentStep={setCurrentStep} />}
        {currentStep === 6 && <EstimateCreator setCurrentStep={setCurrentStep} />}
      </div>
    </main>
  )
}
