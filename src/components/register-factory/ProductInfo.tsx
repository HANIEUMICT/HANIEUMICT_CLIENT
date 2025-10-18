import Button1 from '@/components/common/Button1'
import { useRegisterFactoryStore } from '@/store/register-factory'
import { Dispatch, RefObject, SetStateAction, useEffect, useState } from 'react'
import { RegisterFactoryPortfolioType } from '@/type/register-factory'
import { FileInfoType } from '@/type/common'
import { CancelIcon, PlusIcon } from '@/assets/svgComponents'
import Image from 'next/image'
import { uploadFiles } from '@/hooks/useFileUpload'
import { postCompanyDetail } from '@/lib/company'
import AddProductModal from '@/components/modal/AddProductModal'
import { useToast } from '@/provider/ToastProvider'

type StepType = '1' | '2' | '3'

interface ProductInfoProps {
  portfolioImageRef: RefObject<HTMLInputElement | null>
  handleStepClick: (step: StepType) => void
  setPortfolioData: Dispatch<SetStateAction<RegisterFactoryPortfolioType>>
  portfolioData: RegisterFactoryPortfolioType
  setIsServiceCategoryModalOpen: Dispatch<SetStateAction<boolean>>
  setIsProductFormOpen: Dispatch<SetStateAction<boolean>>
  isProductFormOpen: boolean
  editingIndex: number | null
  setEditingIndex: Dispatch<SetStateAction<number | null>>
}

export default function ProductInfo({
  portfolioImageRef,
  handleStepClick,
  setPortfolioData,
  portfolioData,
  setIsServiceCategoryModalOpen,
  setIsProductFormOpen,
  isProductFormOpen,
  editingIndex,
  setEditingIndex,
}: ProductInfoProps) {
  const setState = useRegisterFactoryStore((state) => state.setState)
  const registerFactoryData = useRegisterFactoryStore((state) => state.registerFactoryData)
  const portfolioImageFileList = useRegisterFactoryStore((state) => state.portfolioImageFileList)
  const companyLogoImageFile = useRegisterFactoryStore((state) => state.companyLogoImageFile)
  const equipmentImageFileList = useRegisterFactoryStore((state) => state.equipmentImageFileList)

  const [isUploading, setIsUploading] = useState(false)

  useEffect(() => {
    console.log('registerFactoryData', registerFactoryData)
  }, [registerFactoryData])

  /**
   * imageUrls에서 첫 번째 URL 추출 (대표 이미지)
   */
  const getImageUrl = (imageUrls: string | FileInfoType | FileInfoType[] | undefined): string => {
    if (!imageUrls) return ''
    if (typeof imageUrls === 'string') return imageUrls
    if (Array.isArray(imageUrls) && imageUrls.length > 0) {
      const firstImage = imageUrls[0]
      return typeof firstImage === 'string' ? firstImage : (firstImage.url as string)
    }
    if ('url' in imageUrls) return imageUrls.url as string
    return ''
  }

  /**
   * imageUrls에서 alt 텍스트 추출
   */
  const getImageAlt = (imageUrls: string | FileInfoType | FileInfoType[] | undefined): string => {
    if (!imageUrls) return 'portfolio image'
    if (typeof imageUrls === 'string') return 'portfolio image'
    if (Array.isArray(imageUrls) && imageUrls.length > 0) {
      const firstImage = imageUrls[0]
      return typeof firstImage === 'string' ? 'portfolio image' : firstImage.name || firstImage.id || 'portfolio image'
    }
    if ('name' in imageUrls) return imageUrls.name || imageUrls.id || 'portfolio image'
    return 'portfolio image'
  }

  /**
   * 포트폴리오 삭제
   */
  const handleRemovePortfolio = (indexToRemove: number) => {
    if (!confirm('이 포트폴리오를 삭제하시겠습니까?')) {
      return
    }

    const updatedPortfolios = registerFactoryData?.portfolios?.filter((_, index) => index !== indexToRemove)

    setState({
      registerFactoryData: {
        ...registerFactoryData,
        portfolios: updatedPortfolios,
      },
    })
  }

  /**
   * 포트폴리오 추가 모달 열기
   */
  const handleAddPortfolio = () => {
    setPortfolioData({}) // 빈 데이터
    setEditingIndex(null) // 추가 모드
    setIsProductFormOpen(true)
  }

  /**
   * 포트폴리오 수정 모달 열기
   */
  const handleEditPortfolio = (portfolio: RegisterFactoryPortfolioType, index: number) => {
    setPortfolioData(portfolio) // 기존 데이터
    setEditingIndex(index) // 수정 모드
    setIsProductFormOpen(true)
  }

  const { showToast } = useToast()

  const handleSubmit = async () => {
    try {
      setIsUploading(true)
      console.log('공장 등록 시작...')

      // 업데이트할 registerFactoryData 복사
      const updatedRegisterFactoryData = { ...registerFactoryData }

      // 1. 회사 로고 업로드 및 처리
      if (companyLogoImageFile) {
        console.log('회사 로고 업로드 중...')

        // S3에 업로드하고 objectUrl 받기
        const logoUploadResult = await uploadFiles([companyLogoImageFile])

        if (!logoUploadResult.success || logoUploadResult.uploadedUrls.length === 0) {
          throw new Error('회사 로고 업로드 실패')
        }

        // detail.logoUrl 업데이트
        updatedRegisterFactoryData.detail = {
          ...updatedRegisterFactoryData.detail,
          logoUrl: logoUploadResult.uploadedUrls[0],
        }

        console.log('회사 로고 업로드 완료:', logoUploadResult.uploadedUrls[0])
      }

      // 2. 장비 이미지 업로드 및 처리
      if (updatedRegisterFactoryData.equipments && updatedRegisterFactoryData.equipments.length > 0) {
        console.log('장비 이미지 업로드 중...')

        const updatedEquipments = await Promise.all(
          updatedRegisterFactoryData.equipments.map(async (equipment) => {
            // imageUrl이 FileInfoType[] 형태인 경우에만 업로드
            if (equipment.imageUrls && Array.isArray(equipment.imageUrls) && equipment.imageUrls.length > 0) {
              // FileInfoType[]인지 string[]인지 확인
              const firstItem = equipment.imageUrls[0]

              // 이미 string[]인 경우 그대로 반환
              if (typeof firstItem === 'string') {
                return equipment
              }

              // FileInfoType[]인 경우 업로드 진행
              const imageFiles = equipment.imageUrls as FileInfoType[]

              // S3에 업로드하고 objectUrls 받기
              const equipmentUploadResult = await uploadFiles(imageFiles)

              if (!equipmentUploadResult.success) {
                throw new Error('장비 이미지 업로드 실패')
              }

              return {
                ...equipment,
                imageUrls: equipmentUploadResult.uploadedUrls,
              }
            }

            return equipment
          })
        )

        updatedRegisterFactoryData.equipments = updatedEquipments
        console.log('장비 이미지 업로드 완료')
      }

      // 추가: 현재 폼에 있는 장비 이미지가 있다면 처리
      if (equipmentImageFileList && equipmentImageFileList.length > 0) {
        console.log('폼에 남아있는 장비 이미지 감지 - 저장되지 않은 장비가 있습니다.')
        alert('완료하기 버튼을 누르지 않은 장비가 있습니다. 먼저 장비를 추가 완료해주세요.')
        throw new Error('미완성 장비 존재')
      }

      // 3. 포트폴리오 이미지 업로드 및 처리
      if (updatedRegisterFactoryData.portfolios && updatedRegisterFactoryData.portfolios.length > 0) {
        console.log('포트폴리오 이미지 업로드 중...')

        const updatedPortfolios = await Promise.all(
          updatedRegisterFactoryData.portfolios.map(async (portfolio) => {
            // imageUrl이 FileInfoType[] 형태인 경우에만 업로드
            if (portfolio.imageUrls && Array.isArray(portfolio.imageUrls) && portfolio.imageUrls.length > 0) {
              // FileInfoType[]인지 string[]인지 확인
              const firstItem = portfolio.imageUrls[0]

              // 이미 string[]인 경우 그대로 반환
              if (typeof firstItem === 'string') {
                return portfolio
              }

              // FileInfoType[]인 경우 업로드 진행
              const imageFiles = portfolio.imageUrls as FileInfoType[]

              // S3에 업로드하고 objectUrls 받기
              const portfolioUploadResult = await uploadFiles(imageFiles)

              if (!portfolioUploadResult.success) {
                throw new Error('포트폴리오 이미지 업로드 실패')
              }

              return {
                ...portfolio,
                imageUrls: portfolioUploadResult.uploadedUrls,
              }
            }

            return portfolio
          })
        )

        updatedRegisterFactoryData.portfolios = updatedPortfolios
        console.log('포트폴리오 이미지 업로드 완료')
      }

      // 추가: 현재 폼에 있는 포트폴리오 이미지가 있다면 처리
      if (portfolioImageFileList && portfolioImageFileList.length > 0) {
        console.log('폼에 남아있는 포트폴리오 이미지 감지 - 저장되지 않은 포트폴리오가 있습니다.')
        alert('완료하기 버튼을 누르지 않은 포트폴리오가 있습니다. 먼저 포트폴리오를 추가 완료해주세요.')
        throw new Error('미완성 포트폴리오 존재')
      }

      // 4. store 업데이트
      setState({
        registerFactoryData: updatedRegisterFactoryData,
      })

      // 5. 최종 공장 정보 제출
      console.log('공장 정보 제출 시작...', updatedRegisterFactoryData)
      const result = await postCompanyDetail(updatedRegisterFactoryData)
      if (result.result === 'SUCCESS') {
        showToast('공장 등록 성공!', 'success')
      } else if (result.result === 'ERROR') {
        showToast('공장 등록 실패', 'error')
      }
      // 필요시 다음 단계로 이동
      // router.push('/success-page')
    } catch (error) {
      console.error('공장 등록 실패:', error)
      alert('공장 등록에 실패했습니다. 다시 시도해주세요.')
    } finally {
      setIsUploading(false)
    }
  }

  return (
    <div>
      {isProductFormOpen && (
        <AddProductModal
          setIsFormOpen={setIsProductFormOpen}
          setIsServiceCategoryModalOpen={setIsServiceCategoryModalOpen}
          portfolioImageRef={portfolioImageRef}
          portfolioData={portfolioData}
          setPortfolioData={setPortfolioData}
          editingIndex={editingIndex} // 🔥 수정 중인 인덱스 전달
          setEditingIndex={setEditingIndex}
        />
      )}

      <div className="border-gray-20 flex flex-col gap-y-3 rounded-[24px] border bg-white p-6">
        <div className="flex items-center justify-between">
          <h2 className="sub1">완제품</h2>
          <Button1
            onClick={handleAddPortfolio}
            leftIcon={<PlusIcon width={16} height={16} />}
            styleSize={'md'}
            styleType={'secondary'}
          >
            포트폴리오 추가
          </Button1>
        </div>

        {registerFactoryData?.portfolios?.map((portfolio, index) => {
          return (
            <section
              onClick={() => handleEditPortfolio(portfolio, index)}
              key={`${portfolio.description}-${index}`}
              className="border-gray-20 p-xs gap-x-xs hover:bg-gray-10 flex cursor-pointer rounded-[20px] border transition-colors"
            >
              {portfolio.imageUrls && portfolio.imageUrls.length > 0 ? (
                <div className="relative h-[189px] w-[317px] flex-shrink-0">
                  <Image
                    src={getImageUrl(portfolio.imageUrls[0])}
                    alt={getImageAlt(portfolio.imageUrls[0])}
                    fill
                    className="rounded-[16px] object-cover"
                  />
                </div>
              ) : (
                <div className="bg-gray-20 flex h-[189px] w-[317px] flex-shrink-0 items-center justify-center rounded-[16px]">
                  <p className="body1 text-gray-40">이미지 없음</p>
                </div>
              )}

              <div className="flex w-full flex-col gap-y-5">
                <div className="flex items-center justify-between">
                  <h3 className="h3">{portfolio.category}</h3>
                  <button
                    onClick={(e) => {
                      e.stopPropagation()
                      handleRemovePortfolio(index)
                    }}
                    className={
                      'border-gray-20 hover:border-gray-30 flex h-[36px] w-[100px] items-center justify-center rounded-[8px] border transition-colors'
                    }
                    type={'button'}
                  >
                    <CancelIcon width={12} height={12} />
                  </button>
                </div>

                <div className="flex flex-col gap-y-2">
                  <div className="gap-x-4xs flex">
                    <div className="sub2 text-gray-40">제작 수량</div>
                    <p className="body1">{portfolio.quantity}</p>
                  </div>
                  <div className="flex flex-col gap-y-1">
                    <div className="sub2 text-gray-40">완제품 설명</div>
                    <p className="body1">{portfolio.description}</p>
                  </div>
                </div>
              </div>
            </section>
          )
        })}
      </div>

      <div className="mt-[40px] mb-[100px] flex justify-between">
        <Button1
          onClick={() => {
            handleStepClick('2')
          }}
          customClassName={'w-[260px]'}
          styleType={'outline'}
        >
          이전
        </Button1>
        <Button1
          onClick={handleSubmit}
          customClassName={'h-[52px] w-[260px]'}
          styleStatus={'default'}
          styleType={'primary'}
          styleSize={'lg'}
          disabled={isUploading}
        >
          {isUploading ? '업로드 중...' : '공장 정보 등록'}
        </Button1>
      </div>
    </div>
  )
}
