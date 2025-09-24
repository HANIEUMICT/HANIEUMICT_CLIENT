import { useProjectStore } from '@/store/projectStore'
import Input from '@/components/common/Input'
import { ChangeEvent } from 'react'

export default function ManufacturingCategoryDetailEtcField() {
  const projectData = useProjectStore((state) => state.projectData)
  const setState = useProjectStore((state) => state.setState)

  return (
    <div className="gap-y-4xs flex flex-col">
      <p className="sub2">제조 사항 상세 입력</p>
      <Input
        value={projectData?.categoryDetailEtc ?? ''}
        onChange={(e: ChangeEvent<HTMLInputElement>) => {
          setState({
            ...projectData,
            projectData: { ...projectData, categoryDetailEtc: e.target.value },
          })
        }}
        placeholder={'상세 제품 내용을 입력해주세요.'}
        inputBoxStyle={'default'}
        customClassName={'h-[52px]'}
      />
    </div>
  )
}
