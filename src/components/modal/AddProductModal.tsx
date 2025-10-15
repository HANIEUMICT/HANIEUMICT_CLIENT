import Modal from '@/components/common/Modal'
import Input from '@/components/common/Input'
import { ImgUploadIcon } from '@/assets/svgComponents'
import ImageUploadItem from '@/components/common/ImageUploadItem'
import Button1 from '@/components/common/Button1'
import { generateId } from '@/utils/upload'
import { Dispatch, RefObject, SetStateAction, useEffect, useRef } from 'react'
import { useRegisterFactoryStore } from '@/store/register-factory'
import { RegisterFactoryPortfolioType } from '@/type/register-factory'
import { FileInfoType } from '@/type/common'

interface AddProductModalProps {
  portfolioImageRef: RefObject<HTMLInputElement | null>
  setPortfolioData: Dispatch<SetStateAction<RegisterFactoryPortfolioType>>
  portfolioData: RegisterFactoryPortfolioType
  setIsFormOpen: Dispatch<SetStateAction<boolean>>
  setIsServiceCategoryModalOpen: Dispatch<SetStateAction<boolean>>
  editingIndex: number | null
  setEditingIndex: Dispatch<SetStateAction<number | null>>
}

export default function AddProductModal({
  portfolioImageRef,
  setPortfolioData,
  portfolioData,
  setIsFormOpen,
  setIsServiceCategoryModalOpen,
  editingIndex,
  setEditingIndex,
}: AddProductModalProps) {
  const setState = useRegisterFactoryStore((state) => state.setState)
  const portfolioImageFileList = useRegisterFactoryStore((state) => state.portfolioImageFileList)
  const registerFactoryData = useRegisterFactoryStore((state) => state.registerFactoryData)

  /**
   * 이미지 미리보기 설정 (여러 파일)
   */
  const handleImagePreview = async () => {
    const files = portfolioImageRef.current?.files

    if (files && files.length > 0) {
      const fileArray = Array.from(files)

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
   * 포트폴리오 추가/수정 완료
   */
  const handleCompletePortfolio = () => {
    // 유효성 검사
    if (!portfolioData.category || !portfolioData.quantity || !portfolioData.description) {
      alert('모든 필수 항목을 입력해주세요.')
      return
    }

    // 완성된 포트폴리오 데이터
    const completedPortfolio: RegisterFactoryPortfolioType = {
      category: portfolioData.category,
      quantity: portfolioData.quantity,
      description: portfolioData.description,
      imageUrls: portfolioImageFileList && portfolioImageFileList.length > 0 ? portfolioImageFileList : undefined,
    }

    let updatedPortfolios

    if (editingIndex !== null) {
      // 수정 모드: 기존 포트폴리오 업데이트
      updatedPortfolios = registerFactoryData?.portfolios?.map((portfolio, index) =>
        index === editingIndex ? completedPortfolio : portfolio
      )
    } else {
      // 추가 모드: 새 포트폴리오 추가
      updatedPortfolios = [...(registerFactoryData?.portfolios || []), completedPortfolio]
    }

    // Zustand store 업데이트
    setState({
      registerFactoryData: {
        ...registerFactoryData,
        portfolios: updatedPortfolios,
      },
      portfolioImageFileList: [],
    })

    // 폼 초기화 및 닫기
    setPortfolioData({})
    setEditingIndex(null)
    setIsFormOpen(false)

    // file input 초기화
    if (portfolioImageRef.current) {
      portfolioImageRef.current.value = ''
    }
  }

  /**
   * 모달 닫기 핸들러
   */
  const handleClose = () => {
    setIsFormOpen(false)
    setEditingIndex(null)
    setPortfolioData({})
    setState({ portfolioImageFileList: [] })

    if (portfolioImageRef.current) {
      portfolioImageRef.current.value = ''
    }
  }

  return (
    <Modal>
      <Modal.Content>
        <div className="gap-y-2xs flex flex-col">
          <h2 className="h2">{editingIndex !== null ? '포트폴리오 수정' : '포트폴리오 추가'}</h2>

          <section className="flex flex-col gap-y-2">
            <p className="gap-x-5xs sub2 flex">
              제조 서비스 카테고리 선택 <span className="text-conic-red-30">*</span>
            </p>
            <Input
              value={portfolioData.category ?? ''}
              onClick={() => {
                setIsServiceCategoryModalOpen(true)
                setIsFormOpen(false)
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
              value={portfolioData.quantity?.toString() || ''}
              onChange={(e) => {
                const value = e.target.value
                setPortfolioData((prev) => ({
                  ...prev,
                  quantity: value ? parseInt(value) : undefined,
                }))
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
              value={portfolioData.description || ''}
              onChange={(e) => {
                setPortfolioData((prev) => ({ ...prev, description: e.target.value }))
              }}
              className="p-2xs border-gray-20 h-[180px] w-full rounded-[16px] border outline-none"
              placeholder="완제품 설명을 작성해주세요."
            />
          </section>

          <div className="gap-y-4xs flex flex-col">
            <div className="gap-x-5xs sub2 flex">
              완제품 사진 업로드 <span className="body1 text-gray-50">(선택사항)</span>
            </div>
            <div onClick={() => portfolioImageRef.current?.click()} className="relative cursor-pointer">
              <div className="px-2xs py-3xs border-gray-20 flex w-fit gap-x-2 rounded-[12px] border transition-colors hover:bg-gray-50">
                <ImgUploadIcon width={24} height={24} />
                <p className="button text-gray-50">사진 업로드</p>
              </div>
              <input
                multiple={true}
                type="file"
                accept="image/jpg,image/jpeg,image/png"
                id={'input-file'}
                ref={portfolioImageRef}
                name="input-file"
                onChange={handleImagePreview}
                className="hidden"
              />
            </div>
            {portfolioImageFileList && portfolioImageFileList.length > 0 ? (
              <div className="gap-x-2xs flex flex-wrap">
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
        </div>
      </Modal.Content>
      <Modal.BottomButton>
        <div className="flex gap-x-3">
          <Button1
            onClick={handleClose}
            styleType={'outline'}
            styleSize={'lg'}
            styleStatus={'default'}
            customClassName={'w-full'}
          >
            취소
          </Button1>
          <Button1
            customClassName={'w-full'}
            onClick={handleCompletePortfolio}
            styleStatus={'default'}
            styleType={'primary'}
          >
            {editingIndex !== null ? '수정하기' : '완료하기'}
          </Button1>
        </div>
      </Modal.BottomButton>
    </Modal>
  )
}
