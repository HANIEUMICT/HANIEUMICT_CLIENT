import Modal from '@/components/common/Modal'
import Button1 from '@/components/common/Button1'
import { Dispatch, SetStateAction } from 'react'
import { RegisterFactoryPortfolioType } from '@/type/register-factory'
import { manufacturingCategoryList } from '@/utils/project'

interface ServiceCategoryModalProps {
  setIsServiceCategoryModalOpen: Dispatch<SetStateAction<boolean>>
  setPortfolioData: Dispatch<SetStateAction<RegisterFactoryPortfolioType>>
  portfolioData: RegisterFactoryPortfolioType
  setIsFormOpen: Dispatch<SetStateAction<boolean>>
  editingIndex: number | null
  setEditingIndex: Dispatch<SetStateAction<number | null>>
}

export default function ServiceCategoryModal({
  setIsServiceCategoryModalOpen,
  setPortfolioData,
  portfolioData,
  setIsFormOpen,
  editingIndex,
  setEditingIndex,
}: ServiceCategoryModalProps) {
  /**
   * 카테고리 선택/해제 핸들러
   * - 같은 카테고리를 누르면 선택 해제 (토글 방식)
   * - 다른 필드(quantity, description, imageUrls)는 유지
   */
  const handleCategorySelect = (selectedCategory: string) => {
    setPortfolioData((prev) => ({
      ...prev,
      category: selectedCategory === prev.category ? undefined : selectedCategory,
    }))
  }

  /**
   * 닫기 버튼 핸들러
   * - 카테고리 선택을 취소하고 AddProductModal로 돌아갑니다
   */
  const handleClose = () => {
    setIsServiceCategoryModalOpen(false)
    setIsFormOpen(true)
  }

  /**
   * 완료 버튼 핸들러
   * - 선택한 카테고리를 저장하고 AddProductModal로 돌아갑니다
   */
  const handleComplete = () => {
    if (!portfolioData.category) {
      alert('카테고리를 선택해주세요.')
      return
    }

    setIsServiceCategoryModalOpen(false)
    setIsFormOpen(true)
  }

  return (
    <Modal customClassName={'w-[1000px]'}>
      <Modal.Content>
        <h3 className="sub1">제조 서비스 카테고리 선택</h3>
        <div className="grid w-full grid-cols-4 gap-[12px]">
          {Object.keys(manufacturingCategoryList).map((manufacturingCategory) => {
            const isSelected = portfolioData?.category === manufacturingCategory

            return (
              <Button1
                key={manufacturingCategory}
                onClick={() => handleCategorySelect(manufacturingCategory)}
                styleType={isSelected ? 'outline2' : 'outline'}
                styleSize={'lg'}
                styleStatus={isSelected ? 'selected' : 'default'}
                customClassName={'w-full'}
              >
                {manufacturingCategory}
              </Button1>
            )
          })}
        </div>
      </Modal.Content>

      <Modal.BottomButton>
        <div className="flex gap-x-3">
          <Button1 onClick={handleClose} styleType={'outline'} customClassName={'w-full'}>
            닫기
          </Button1>
          <Button1 onClick={handleComplete} styleType={'primary'} customClassName={'w-full'}>
            완료
          </Button1>
        </div>
      </Modal.BottomButton>
    </Modal>
  )
}
