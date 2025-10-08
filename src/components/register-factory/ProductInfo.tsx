import Input from '@/components/common/Input'
import Button1 from '@/components/common/Button1'
import { useRegisterFactoryStore } from '@/store/register-factory'
import { Dispatch, RefObject, SetStateAction, useEffect, useState } from 'react'
import { RegisterFactoryPortfolioType } from '@/type/register-factory'
import { generateId } from '@/utils/upload'
import { FileInfoType } from '@/type/common'
import { CancelIcon, ImgUploadIcon, PlusIcon } from '@/assets/svgComponents'
import Image from 'next/image'
import ImageUploadItem from '@/components/common/ImageUploadItem'
import { uploadFiles } from '@/hooks/useFileUpload'
import { postCompanyDetail } from '@/lib/company'

interface ProductInfoProps {
  portfolioImageRef: RefObject<HTMLInputElement | null>
  setCurrentStep: Dispatch<SetStateAction<number>>
  setPortfolioData: Dispatch<SetStateAction<RegisterFactoryPortfolioType>>
  portfolioData: RegisterFactoryPortfolioType
  setIsServiceCategoryModalOpen: Dispatch<SetStateAction<boolean>>
}

export default function ProductInfo({
  portfolioImageRef,
  setCurrentStep,
  setPortfolioData,
  portfolioData,
  setIsServiceCategoryModalOpen,
}: ProductInfoProps) {
  const setState = useRegisterFactoryStore((state) => state.setState)
  const registerFactoryData = useRegisterFactoryStore((state) => state.registerFactoryData)
  const portfolioImageFileList = useRegisterFactoryStore((state) => state.portfolioImageFileList)
  const companyLogoImageFile = useRegisterFactoryStore((state) => state.companyLogoImageFile)
  const equipmentImageFileList = useRegisterFactoryStore((state) => state.equipmentImageFileList)

  const [isFormOpen, setIsFormOpen] = useState(true)
  const [isUploading, setIsUploading] = useState(false)

  useEffect(() => {
    console.log('registerFactoryData', registerFactoryData)
  }, [registerFactoryData])

  /**
   * 이미지 미리보기 설정 (여러 파일)
   */
  const handleImagePreview = async () => {
    const files = portfolioImageRef.current?.files

    if (files && files.length > 0) {
      const fileArray = Array.from(files)

      // 모든 파일을 비동기로 읽기
      const newFiles = await Promise.all(
        fileArray.map((file) => {
          return new Promise<{ id: string; name: string; size: number; url: string | ArrayBuffer | null }>(
            (resolve) => {
              const reader = new FileReader()

              reader.onloadend = () => {
                resolve({
                  id: generateId(),
                  name: file.name,
                  size: file.size,
                  url: reader.result,
                })
              }
              reader.readAsDataURL(file)
            }
          )
        })
      )

      // 기존 파일 리스트에 새 파일들 추가
      setState({
        portfolioImageFileList: [...(portfolioImageFileList || []), ...newFiles],
      })
    }
  }

  /**
   * 특정 파일 삭제
   */
  const handleRemoveFile = (id: string) => {
    setState({
      portfolioImageFileList: portfolioImageFileList?.filter((file) => file.id !== id),
    })
  }

  /**
   * 포트폴리오 추가 완료
   */
  const handleCompletePortfolio = () => {
    // 유효성 검사
    if (
      !portfolioData.quantity ||
      !portfolioData.description ||
      !portfolioImageFileList ||
      portfolioImageFileList.length === 0
    ) {
      alert('모든 필수 항목을 입력해주세요.')
      return
    }

    // 이미지 URL 배열 포함한 완성된 포트폴리오 데이터
    const newPortfolio: RegisterFactoryPortfolioType = {
      ...portfolioData,
      imageUrls: portfolioImageFileList, // 배열로 저장
    }

    // 기존 portfolios 배열에 추가
    const updatedPortfolios = [...(registerFactoryData?.portfolios || []), newPortfolio]

    // Zustand store 업데이트
    setState({
      registerFactoryData: {
        ...registerFactoryData,
        portfolios: updatedPortfolios,
      },
      portfolioImageFileList: [], // 이미지 파일 리스트 초기화
    })

    // 폼 초기화 및 닫기
    setPortfolioData({})
    setIsFormOpen(false)

    // file input 초기화
    if (portfolioImageRef.current) {
      portfolioImageRef.current.value = ''
    }
  }

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
    // 확인 대화상자 (선택사항)
    if (!confirm('이 포트폴리오를 삭제하시겠습니까?')) {
      return
    }

    // 해당 index를 제외한 새 배열 생성
    const updatedPortfolios = registerFactoryData?.portfolios?.filter((_, index) => index !== indexToRemove)

    // Zustand store 업데이트
    setState({
      registerFactoryData: {
        ...registerFactoryData,
        portfolios: updatedPortfolios,
      },
    })
  }

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
      console.log('공장 정보 제출 완료:', result)

      // 6. 성공 메시지
      alert('공장 등록이 완료되었습니다.')

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
      <div className="border-gray-20 flex flex-col gap-y-3 rounded-[24px] border bg-white p-6">
        <div className="flex items-center justify-between">
          <h2 className="sub1">완제품</h2>
          <Button1
            onClick={() => {
              setIsFormOpen(true)
            }}
            leftIcon={<PlusIcon width={16} height={16} />}
            styleSize={'md'}
            styleType={'secondary'}
          >
            장비 추가
          </Button1>
        </div>
        {registerFactoryData?.portfolios?.map((portfolio, index) => {
          return (
            <section
              key={`${portfolio.description}-${index}`}
              className="border-gray-20 p-xs gap-x-xs flex rounded-[20px] border"
            >
              {portfolio.imageUrls && (
                <div className="relative h-[189px] w-[317px]">
                  <Image
                    src={getImageUrl(portfolio.imageUrls[0])}
                    alt={getImageAlt(portfolio.imageUrls[0])}
                    fill
                    className="rounded-[16px] object-cover"
                  />
                </div>
              )}

              <div className="flex w-full flex-col gap-y-5">
                <div className="flex items-center justify-between">
                  <h3 className="h3">{portfolio.category}</h3>
                  <button
                    onClick={() => handleRemovePortfolio(index)}
                    className={
                      'border-gray-20 flex h-[36px] w-[100px] items-center justify-center rounded-[8px] border transition-colors hover:bg-gray-50'
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
        {isFormOpen ? (
          <div className="gap-y-2xs flex flex-col">
            <section className="flex flex-col gap-y-2">
              <p className="gap-x-5xs sub2 flex">
                제조 서비스 카테고리 선택 <span className="text-conic-red-30">*</span>
              </p>
              <Input
                value={portfolioData.category ?? ''}
                onClick={() => {
                  setIsServiceCategoryModalOpen(true)
                }}
                inputBoxStyle={'default'}
                placeholder={'프로젝트 카테고리를 선택해주세요.'}
              />
            </section>
            <section className="flex flex-col gap-y-2">
              <p className="gap-x-5xs sub2 flex">
                제작 수량 <span className="text-conic-red-30">*</span>
              </p>
              <Input
                onChange={(e) => {
                  setPortfolioData(() => ({ ...portfolioData, quantity: parseInt(e.target.value) }))
                }}
                inputBoxStyle={'default'}
                placeholder={'제작 수량을 입력해주세요.'}
                type={'number'}
              />
            </section>
            <section className="flex flex-col gap-y-2">
              <p className="gap-x-5xs sub2 flex">
                완제품 설명 <span className="text-conic-red-30">*</span>
              </p>
              <textarea
                onChange={(e) => {
                  setPortfolioData(() => ({ ...portfolioData, description: e.target.value }))
                }}
                className="p-2xs border-gray-20 h-[180px] w-full rounded-[16px] border outline-none"
                placeholder="완제품 설명을 작성해주세요."
              />
            </section>

            <div className="gap-y-4xs flex flex-col">
              <div className="gap-x-5xs sub2 flex">
                완제품 사진 업로드 <span className="text-conic-red-30">*</span>
              </div>
              <div onClick={() => portfolioImageRef.current?.click()} className="relative">
                <div className="px-2xs py-3xs border-gray-20 flex w-fit gap-x-2 rounded-[12px] border">
                  <ImgUploadIcon width={24} height={24} />
                  <p className="button text-gray-50">사진 업로드</p>
                </div>
                <input
                  multiple={true}
                  type="file"
                  id={'input-file'}
                  ref={portfolioImageRef}
                  name="input-file"
                  onChange={handleImagePreview}
                  className="hidden"
                />
              </div>
              {portfolioImageFileList && portfolioImageFileList.length > 0 ? (
                <div className="gap-x-2xs flex">
                  {portfolioImageFileList.map((file) => (
                    <ImageUploadItem
                      key={file.id}
                      ImageUrl={file.url}
                      ImageUrlName={file.name}
                      onRemove={() => handleRemoveFile(file.id)}
                    />
                  ))}
                </div>
              ) : null}
              <p className="body1 text-gray-50">5MB이하 파일(jpg, jpeg, png)만 가능합니다.</p>
            </div>
            <Button1 onClick={handleCompletePortfolio} styleStatus={'default'} styleType={'secondary'}>
              완료하기
            </Button1>
          </div>
        ) : null}
      </div>

      <div className="mt-[40px] mb-[100px] flex justify-between">
        <Button1
          onClick={() => {
            setCurrentStep(2)
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
        >
          {isUploading ? '업로드 중...' : '공장 정보 등록'}
        </Button1>
      </div>
    </div>
  )
}
