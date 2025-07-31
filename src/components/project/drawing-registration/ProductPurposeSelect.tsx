import Button1 from '@/components/common/Button1'
import { purposeList } from '@/utils/project'
import { useProjectStore } from '@/store/projectStore'

interface ProductPurposeSelectProps {}
export default function ProductPurposeSelect({}: ProductPurposeSelectProps) {
  const projectData = useProjectStore((state) => state.projectData)
  const setState = useProjectStore((state) => state.setState)
  return (
    <div className="flex flex-col gap-y-[8px]">
      <p className="sub2">제품 용도 선택</p>
      <p className="body1 text-gray-50">정확한 견적 및 상담을 위해 제품 용도를 선택해주세요.</p>
      <div className="grid w-full grid-cols-4 gap-[12px]">
        {purposeList.map((purpose) => {
          return (
            <Button1
              key={purpose}
              onClick={() => {
                setState({
                  ...projectData,
                  projectData: { ...projectData, purpose: purpose },
                })
              }}
              styleType={projectData?.purpose === purpose ? 'outline2' : 'outline'}
              styleSize={'lg'}
              styleStatus={projectData?.purpose === purpose ? 'selected' : 'default'}
              customClassName={'w-full'}
            >
              {purpose}
            </Button1>
          )
        })}
      </div>
    </div>
  )
}
