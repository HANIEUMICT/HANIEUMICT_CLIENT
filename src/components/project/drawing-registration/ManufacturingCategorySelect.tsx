import Button1 from '@/components/common/Button1'
import { manufacturingCategoryList } from '@/utils/project'
import { useProjectStore } from '@/store/projectStore'

interface ManufacturingCategorySelectProps {}

export default function ManufacturingCategorySelect({}: ManufacturingCategorySelectProps) {
  const projectData = useProjectStore((state) => state.projectData)
  const setState = useProjectStore((state) => state.setState)
  return (
    <div className="gap-y-4xs flex flex-col">
      <p className="sub2">제조 분류 선택</p>
      <div className="grid w-full grid-cols-4 gap-[12px]">
        {Object.keys(manufacturingCategoryList).map((manufacturingCategory) => {
          return (
            <Button1
              key={manufacturingCategory}
              onClick={() => {
                setState({
                  ...projectData,
                  projectData: { ...projectData, category: manufacturingCategory },
                })
              }}
              styleType={projectData?.category === manufacturingCategory ? 'outline2' : 'outline'}
              styleSize={'lg'}
              styleStatus={projectData?.category === manufacturingCategory ? 'selected' : 'default'}
              customClassName={'w-full'}
            >
              {manufacturingCategory}
            </Button1>
          )
        })}
      </div>
    </div>
  )
}
