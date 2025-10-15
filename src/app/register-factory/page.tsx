'use client'

import Header from '@/components/common/Header'
import ProcessingBar from '@/components/create-project/ProcessingBar'
import { useEffect, useRef, useState } from 'react'
import FactoryInfo from '@/components/register-factory/FactoryInfo'
import EquipmentInfo from '@/components/register-factory/EquipmentInfo'
import ProductInfo from '@/components/register-factory/ProductInfo'
import { RegisterFactoryPortfolioType } from '@/type/register-factory'
import ServiceCategoryModal from '@/components/modal/ServiceCategoryModal'
import { FileInfoType } from '@/type/common'
import { useRegisterFactoryStore } from '@/store/register-factory'

export default function RegisterFactory() {
  const [currentStep, setCurrentStep] = useState<number>(1)

  const [portfolioData, setPortfolioData] = useState<RegisterFactoryPortfolioType>({})
  const [isServiceCategoryModalOpen, setIsServiceCategoryModalOpen] = useState(false)
  const [isFormOpen, setIsFormOpen] = useState(false) // 🔥 초기값 false로 변경
  const [editingIndex, setEditingIndex] = useState<number | null>(null) // 🔥 수정 중인 인덱스

  const companyLogoImageRef = useRef<HTMLInputElement | null>(null)
  const equipmentImageRef = useRef<HTMLInputElement | null>(null)
  const portfolioImageRef = useRef<HTMLInputElement | null>(null)

  const setState = useRegisterFactoryStore((state) => state.setState)
  const portfolioImageFileList = useRegisterFactoryStore((state) => state.portfolioImageFileList)
  const registerFactoryData = useRegisterFactoryStore((state) => state.registerFactoryData)

  // 🔥 모달이 처음 열릴 때만 데이터 초기화
  useEffect(() => {
    if (editingIndex !== null) {
      // 수정 모드: 기존 데이터 로드
      const targetPortfolio = registerFactoryData?.portfolios?.[editingIndex]

      if (targetPortfolio) {
        // portfolioData 상태에 기존 값 설정
        setPortfolioData({
          category: targetPortfolio.category,
          quantity: targetPortfolio.quantity,
          description: targetPortfolio.description,
          imageUrls: targetPortfolio.imageUrls,
        })

        // 이미지 파일 리스트 설정
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

          setState({
            portfolioImageFileList: fileList,
          })
        } else {
          setState({
            portfolioImageFileList: [],
          })
        }
      }
    } else {
      // 추가 모드: 빈 데이터
      setPortfolioData({})
      setState({
        portfolioImageFileList: [],
      })
    }

    // cleanup 함수
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
    <main className="flex flex-col items-center justify-center">
      {isServiceCategoryModalOpen ? (
        <ServiceCategoryModal
          editingIndex={editingIndex}
          setEditingIndex={setEditingIndex}
          setIsFormOpen={setIsFormOpen}
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
            editingIndex={editingIndex}
            setEditingIndex={setEditingIndex}
            isProductFormOpen={isFormOpen}
            setIsProductFormOpen={setIsFormOpen}
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
