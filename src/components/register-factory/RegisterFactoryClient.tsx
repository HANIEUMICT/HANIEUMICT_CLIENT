'use client'

import ProcessingBar from '@/components/create-project/ProcessingBar'
import { useEffect, useRef, useState } from 'react'
import FactoryInfo from '@/components/register-factory/FactoryInfo'
import EquipmentInfo from '@/components/register-factory/EquipmentInfo'
import ProductInfo from '@/components/register-factory/ProductInfo'
import { RegisterFactoryPortfolioType } from '@/type/register-factory'
import ServiceCategoryModal from '@/components/modal/ServiceCategoryModal'
import { FileInfoType } from '@/type/common'
import { useRegisterFactoryStore } from '@/store/register-factory'
import { usePathname, useRouter } from 'next/navigation'

type StepType = '1' | '2' | '3'

interface RegisterFactoryClientProps {
  step: StepType
}

export default function RegisterFactoryClient({ step }: RegisterFactoryClientProps) {
  const [portfolioData, setPortfolioData] = useState<RegisterFactoryPortfolioType>({})
  const [isServiceCategoryModalOpen, setIsServiceCategoryModalOpen] = useState(false)
  const [isFormOpen, setIsFormOpen] = useState(false)
  const [editingIndex, setEditingIndex] = useState<number | null>(null)

  const companyLogoImageRef = useRef<HTMLInputElement | null>(null)
  const equipmentImageRef = useRef<HTMLInputElement | null>(null)
  const portfolioImageRef = useRef<HTMLInputElement | null>(null)

  const setState = useRegisterFactoryStore((state) => state.setState)
  const portfolioImageFileList = useRegisterFactoryStore((state) => state.portfolioImageFileList)
  const registerFactoryData = useRegisterFactoryStore((state) => state.registerFactoryData)

  const router = useRouter()
  const pathname = usePathname()

  const handleStepClick = (step: StepType) => {
    // URL 업데이트 → 서버 컴포넌트 재렌더링
    router.push(`${pathname}?step=${encodeURIComponent(step)}`)
  }

  useEffect(() => {
    if (editingIndex !== null) {
      const targetPortfolio = registerFactoryData?.portfolios?.[editingIndex]

      if (targetPortfolio) {
        setPortfolioData({
          category: targetPortfolio.category,
          quantity: targetPortfolio.quantity,
          description: targetPortfolio.description,
          imageUrls: targetPortfolio.imageUrls,
        })

        if (targetPortfolio.imageUrls) {
          const fileList = Array.isArray(targetPortfolio.imageUrls)
            ? targetPortfolio.imageUrls.map((item, index) => {
                if (typeof item === 'object' && 'id' in item && 'url' in item) {
                  return item as FileInfoType
                }
                return {
                  id: `existing-${index}`,
                  name: `image-${index}`,
                  url: typeof item === 'string' ? item : (item as FileInfoType).url,
                  size: 0,
                } as FileInfoType
              })
            : []

          setState({ portfolioImageFileList: fileList })
        } else {
          setState({ portfolioImageFileList: [] })
        }
      }
    } else {
      setPortfolioData({})
      setState({ portfolioImageFileList: [] })
    }

    return () => {
      setState({
        registerFactoryData: undefined,
        companyLogoImageFile: undefined,
        equipmentImageFileList: undefined,
        portfolioImageFileList: undefined,
      })
    }
  }, [editingIndex])

  return (
    <div className="gap-y-l mt-[120px] flex w-[1218px] flex-col">
      {isServiceCategoryModalOpen && (
        <ServiceCategoryModal
          editingIndex={editingIndex}
          setEditingIndex={setEditingIndex}
          setIsFormOpen={setIsFormOpen}
          portfolioData={portfolioData}
          setIsServiceCategoryModalOpen={setIsServiceCategoryModalOpen}
          setPortfolioData={setPortfolioData}
        />
      )}

      <h1 className="h2">공장 등록하기</h1>
      <ProcessingBar currentStep={parseInt(step)} steps={['공장 정보', '보유 장비 추가', '완제품']} width={'380px'} />

      {step === '1' && <FactoryInfo companyLogoImageRef={companyLogoImageRef} handleStepClick={handleStepClick} />}

      {step === '2' && <EquipmentInfo equipmentImageRef={equipmentImageRef} handleStepClick={handleStepClick} />}

      {step === '3' && (
        <ProductInfo
          editingIndex={editingIndex}
          setEditingIndex={setEditingIndex}
          isProductFormOpen={isFormOpen}
          setIsProductFormOpen={setIsFormOpen}
          setIsServiceCategoryModalOpen={setIsServiceCategoryModalOpen}
          portfolioImageRef={portfolioImageRef}
          handleStepClick={handleStepClick}
          portfolioData={portfolioData}
          setPortfolioData={setPortfolioData}
        />
      )}
    </div>
  )
}
