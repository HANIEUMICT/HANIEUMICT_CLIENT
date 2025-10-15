import Input from '@/components/common/Input'
import { useProjectStore } from '@/store/projectStore'
import { ChangeEvent } from 'react'

interface ProductionQuantityFieldProps {}
export default function ProductionQuantityField({}: ProductionQuantityFieldProps) {
  const projectData = useProjectStore((state) => state.projectData)
  const setState = useProjectStore((state) => state.setState)
  return (
    <div className="gap-y-4xs flex flex-col">
      <p className="sub2">
        제조 수량 <span className="text-conic-red-30">*</span>
      </p>
      <Input
        type="number"
        value={String(projectData?.projectQuantity) ?? ''}
        onChange={(e: ChangeEvent<HTMLInputElement>) => {
          setState({
            ...projectData,
            projectData: { ...projectData, projectQuantity: parseInt(e.target.value) },
          })
        }}
        placeholder={'제조 수량을 입력해주세요.'}
        customClassName={'h-[52px]'}
        inputBoxStyle={'default'}
      ></Input>
    </div>
  )
}
