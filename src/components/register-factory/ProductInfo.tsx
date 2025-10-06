import Input from '@/components/common/Input'
import Button1 from '@/components/common/Button1'
import { useRegisterFactoryStore } from '@/store/register-factory'
import { Dispatch, RefObject, SetStateAction, useEffect, useState } from 'react'
import { RegisterFactoryPortfolioType } from '@/type/register-factory'
import { formatFileSize, generateId } from '@/utils/upload'
import { FileInfoType } from '@/type/common'
import { CancelIcon, PlusIcon, UploadIcon } from '@/assets/svgComponents'
import Image from 'next/image'
import UploadItem from '@/components/common/UploadItem'

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
  const portfolioImageFile = useRegisterFactoryStore((state) => state.portfolioImageFile)
  const [isFormOpen, setIsFormOpen] = useState(true)

  useEffect(() => {
    console.log('registerFactoryData', registerFactoryData)
  }, [registerFactoryData])

  /**
   * 이미지 미리보기 설정 (단일 파일)
   */
  const handleImagePreview = async () => {
    const files = portfolioImageRef.current?.files

    if (files && files.length > 0) {
      const file = files[0] // 첫 번째 파일만 선택
      const reader = new FileReader()

      reader.onloadend = () => {
        // 기존 파일을 대체
        setState({
          portfolioImageFile: {
            id: generateId(),
            name: file.name,
            size: file.size,
            url: reader.result,
          },
        })
      }
      reader.readAsDataURL(file)
    }
  }

  /**
   * 파일 삭제
   */
  const handleRemoveFile = () => {
    setState({
      portfolioImageFile: undefined,
    })
  }

  /**
   * 장비 추가 완료
   */
  const handleCompletePortfolio = () => {
    // 유효성 검사
    if (!portfolioData.quantity || !portfolioData.description || !portfolioImageFile || !portfolioImageFile.name) {
      alert('모든 필수 항목을 입력해주세요.')
      return
    }

    // 이미지 URL 포함한 완성된 장비 데이터
    const newPortfolio: RegisterFactoryPortfolioType = {
      ...portfolioData,
      imageUrl: portfolioImageFile,
    }

    // 기존 equipments 배열에 추가
    const updatedPortfolios = [...(registerFactoryData?.portfolios || []), newPortfolio]

    // Zustand store 업데이트
    setState({
      registerFactoryData: {
        ...registerFactoryData,
        portfolios: updatedPortfolios,
      },
      portfolioImageFile: undefined, // 이미지 파일 초기화
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
   * imageUrl에서 URL 추출
   */
  const getImageUrl = (imageUrl: string | FileInfoType | undefined): string => {
    if (!imageUrl) return ''
    if (typeof imageUrl === 'string') return imageUrl
    return imageUrl.url as string
  }

  /**
   * imageUrl에서 alt 텍스트 추출
   */
  const getImageAlt = (imageUrl: string | FileInfoType | undefined): string => {
    if (!imageUrl) return 'portfolio image'
    if (typeof imageUrl === 'string') return 'portfolio image'
    return imageUrl.name || imageUrl.id || 'portfolio image'
  }

  /**
   * 장비 삭제
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
              <div className="relative h-[189px] w-[317px]">
                <Image
                  src={getImageUrl(portfolio.imageUrl)}
                  alt={getImageAlt(portfolio.imageUrl)}
                  fill
                  className="rounded-[16px] object-cover"
                />
              </div>

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
                <div className="border-gray-20 pr-2xs flex h-[52px] w-fit items-center justify-center gap-x-2 rounded-[12px] border bg-white pl-3">
                  <UploadIcon width={20} height={20} />
                  <p className="button text-gray5">파일 업로드</p>
                </div>
                <input
                  type="file"
                  id={'input-file'}
                  ref={portfolioImageRef}
                  name="input-file"
                  onChange={handleImagePreview}
                  className="hidden"
                />
              </div>
              {portfolioImageFile ? (
                <div className="flex flex-col gap-y-2">
                  <UploadItem
                    customClassName={'bg-white'}
                    key={portfolioImageFile.id}
                    imageSize={formatFileSize(portfolioImageFile.size)}
                    ImageUrl={portfolioImageFile.url}
                    ImageUrlName={portfolioImageFile.name}
                    onRemove={() => handleRemoveFile()} // 삭제 기능 추가
                  />
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
          onClick={() => {
            // setCurrentStep(3)
          }}
          customClassName={'w-[260px]'}
          styleType={'primary'}
        >
          완료
        </Button1>
      </div>
    </div>
  )
}
