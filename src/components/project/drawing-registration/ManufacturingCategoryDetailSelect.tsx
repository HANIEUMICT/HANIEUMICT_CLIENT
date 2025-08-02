import Button1 from '@/components/common/Button1'
import { manufacturingCategoryList } from '@/utils/project'
import { useProjectStore } from '@/store/projectStore'

interface ManufacturingCategoryDetailSelectProps {}

export default function ManufacturingCategoryDetailSelect({}: ManufacturingCategoryDetailSelectProps) {
  const projectData = useProjectStore((state) => state.projectData)
  const setState = useProjectStore((state) => state.setState)

  // 타입 안전성을 위한 체크
  const categoryKey = projectData?.category as keyof typeof manufacturingCategoryList
  const detailCategories =
    categoryKey && manufacturingCategoryList[categoryKey] ? manufacturingCategoryList[categoryKey] : []

  return detailCategories.length === 0 ? null : (
    <div className="gap-y-4xs flex flex-col">
      <p className="sub2">
        제조 분류 - 세부 항목 선택 <span className="text-conic-orange-30">*</span>
      </p>
      <div className="grid w-full grid-cols-4 gap-[12px]">
        {detailCategories.map((detailCategory) => {
          const isSelected = projectData?.categoryDetail === detailCategory

          return (
            <Button1
              key={detailCategory}
              onClick={() => {
                setState({
                  projectData: {
                    ...projectData,
                    categoryDetail: detailCategory === projectData.categoryDetail ? undefined : detailCategory,
                  },
                })
              }}
              styleType={isSelected ? 'outline2' : 'outline'}
              styleSize={'lg'}
              styleStatus={isSelected ? 'selected' : 'default'}
              customClassName={'w-full'}
            >
              {detailCategory}
            </Button1>
          )
        })}
      </div>
    </div>
  )
}
