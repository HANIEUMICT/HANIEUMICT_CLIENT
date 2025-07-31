import Input from '@/components/common/Input'
import { useProjectStore } from '@/store/projectStore'
import { ChangeEvent } from 'react'

interface ProductUsageDetailFieldProps {}
export default function ProductUsageDetailField({}: ProductUsageDetailFieldProps) {
  const projectData = useProjectStore((state) => state.projectData)
  const setState = useProjectStore((state) => state.setState)
  return (
    <div className="gap-y-4xs flex flex-col">
      <p className="sub2">상세 제품 용도 입력</p>
      <Input
        value={projectData?.purposeEtc ?? ''}
        onChange={(e: ChangeEvent<HTMLInputElement>) => {
          setState({
            ...projectData,
            projectData: { ...projectData, purposeEtc: e.target.value },
          })
        }}
        placeholder={'상세 제품 용도를 입력해주세요.'}
        customClassName={'h-[52px]'}
        inputBoxStyle={'default'}
      />
    </div>
  )
}
