'use client'

import Header from '@/components/common/Header'
import ProcessingBar from '@/components/create-project/ProcessingBar'
import { useRef, useState } from 'react'
import FactoryInfo from '@/components/register-factory/FactoryInfo'
import EquipmentInfo from '@/components/register-factory/EquipmentInfo'
import ProductInfo from '@/components/register-factory/ProductInfo'
import { RegisterFactoryPortfolioType } from '@/type/register-factory'
import ServiceCategoryModal from '@/components/modal/ServiceCategoryModal'

export default function RegisterFactory() {
  const [currentStep, setCurrentStep] = useState<number>(2)

  const [portfolioData, setPortfolioData] = useState<RegisterFactoryPortfolioType>({})
  const [isServiceCategoryModalOpen, setIsServiceCategoryModalOpen] = useState(false)

  const companyLogoImageRef = useRef<HTMLInputElement | null>(null)
  const equipmentImageRef = useRef<HTMLInputElement | null>(null)
  const portfolioImageRef = useRef<HTMLInputElement | null>(null)

  return (
    <main className="flex flex-col items-center justify-center">
      {isServiceCategoryModalOpen ? (
        <ServiceCategoryModal
          portfolioData={portfolioData}
          setIsServiceCategoryModalOpen={setIsServiceCategoryModalOpen}
          setPortfolioData={setPortfolioData}
        />
      ) : null}
      <Header headerType={'DEFAULT'} />
      <div className="gap-y-l mt-[120px] flex w-[1218px] flex-col">
        <h1 className="h2">공장 등록하기</h1>
        <ProcessingBar currentStep={currentStep} steps={['공장 정보', '보유 장비 추가', '완제품']} width={'380px'} />
        {currentStep === 1 && <FactoryInfo companyLogoImageRef={companyLogoImageRef} setCurrentStep={setCurrentStep} />}
        {currentStep === 2 && <EquipmentInfo equipmentImageRef={equipmentImageRef} setCurrentStep={setCurrentStep} />}
        {currentStep === 3 && (
          <ProductInfo
            setIsServiceCategoryModalOpen={setIsServiceCategoryModalOpen}
            portfolioImageRef={portfolioImageRef}
            setCurrentStep={setCurrentStep}
            portfolioData={portfolioData}
            setPortfolioData={setPortfolioData}
          />
        )}
      </div>
    </main>
  )
}
