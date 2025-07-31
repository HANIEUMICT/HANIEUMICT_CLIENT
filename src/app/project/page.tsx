'use client'

import ProcessingBar from '@/components/project/ProcessingBar'
import Header from '@/components/common/Header'
import { useState } from 'react'
import BasicInfo from '@/components/project/BasicInfo'
import DrawingRegistration from '@/components/project/DrawingRegistration'
import ProjectInfo from '@/components/project/ProjectInfo'
import ShippingInfo from '@/components/project/ShippingInfo'
import EstimateCreator from '@/components/project/EstimateCreator'
import { useModalStore } from '@/store/modalStore'
import { useProjectStore } from '@/store/projectStore'
import SearchAddressModal from '@/components/common/SearchAddressModal'

export default function EstimatePage() {
  const [currentStep, setCurrentStep] = useState<number>(5)
  const isSearchAddressModalOpen = useModalStore((state) => state.isSearchAddressModalOpen)

  const setModalState = useModalStore((state) => state.setState)
  const projectData = useProjectStore((state) => state.projectData)
  const setState = useProjectStore((state) => state.setState)

  const handleComplete = async (data: any) => {
    let fullAddress = data.address
    let extraAddress = ''

    const { addressType, bname, buildingName, zonecode } = data
    console.log('data', data)

    if (addressType === 'R') {
      if (bname !== '') {
        extraAddress += bname
      }
      if (buildingName !== '') {
        extraAddress += `${extraAddress !== '' && ', '}${buildingName}`
      }
      fullAddress += `${extraAddress !== '' ? ` ${extraAddress}` : ''}`
    }
    setState({
      ...projectData,
      projectData: { ...projectData, deliveryAddress: zonecode },
    })

    setModalState({ isSearchAddressModalOpen: false })
  }

  return (
    <main className="flex flex-col items-center justify-center">
      {isSearchAddressModalOpen && <SearchAddressModal handleComplete={handleComplete} />}
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
