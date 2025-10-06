import Modal from '@/components/common/Modal'
import Button1 from '@/components/common/Button1'
import { Dispatch, SetStateAction } from 'react'
import { RegisterFactoryPortfolioType } from '@/type/register-factory'
import { manufacturingCategoryList } from '@/utils/project'

interface ServiceCategoryModalProps {
  setIsServiceCategoryModalOpen: Dispatch<SetStateAction<boolean>>
  setPortfolioData: Dispatch<SetStateAction<RegisterFactoryPortfolioType>>
  portfolioData: RegisterFactoryPortfolioType
}

export default function ServiceCategoryModal({
  setIsServiceCategoryModalOpen,
  setPortfolioData,
  portfolioData,
}: ServiceCategoryModalProps) {
  return (
    <Modal customClassName={'w-[1000px]'}>
      <Modal.Content>
        <h3 className="sub1">제조 서비스 카테고리 선택</h3>
        <div className="grid w-full grid-cols-4 gap-[12px]">
          {Object.keys(manufacturingCategoryList).map((manufacturingCategory) => {
            return (
              <Button1
                key={manufacturingCategory}
                onClick={() => {
                  setPortfolioData(() => ({
                    ...portfolioData,
                    category: manufacturingCategory === portfolioData.category ? undefined : manufacturingCategory,
                  }))
                }}
                styleType={portfolioData?.category === manufacturingCategory ? 'outline2' : 'outline'}
                styleSize={'lg'}
                styleStatus={portfolioData?.category === manufacturingCategory ? 'selected' : 'default'}
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
          <Button1
            onClick={() => {
              setIsServiceCategoryModalOpen(false)
              setPortfolioData(() => ({
                ...portfolioData,
                category: undefined,
              }))
            }}
            styleType={'outline'}
            customClassName={'w-full'}
          >
            닫기
          </Button1>
          <Button1
            onClick={() => {
              setIsServiceCategoryModalOpen(false)
            }}
            styleType={'primary'}
            customClassName={'w-full'}
          >
            완료
          </Button1>
        </div>
      </Modal.BottomButton>
    </Modal>
  )
}
