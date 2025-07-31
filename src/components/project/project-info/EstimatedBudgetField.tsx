import Input from '@/components/common/Input'
import { CheckboxFillIcon, UnCheckboxIcon } from '@/assets/svgComponents'
import Button1 from '@/components/common/Button1'
import { useState } from 'react'
import { useProjectStore } from '@/store/projectStore'

interface EstimatedBudgetFieldProps {}
export default function EstimatedBudgetField({}: EstimatedBudgetFieldProps) {
  const [recommendAIEstimateBudget, setRecommendAIEstimateBudget] = useState(false)
  const projectData = useProjectStore((state) => state.projectData)
  const setState = useProjectStore((state) => state.setState)
  return (
    <div className="gap-y-4xs flex flex-col">
      <p className="sub2">추정 예산</p>
      <Button1
        onClick={() => {
          setRecommendAIEstimateBudget(!recommendAIEstimateBudget)
        }}
        leftIcon={
          recommendAIEstimateBudget ? (
            <CheckboxFillIcon
              onClick={() => {
                setRecommendAIEstimateBudget(false)
              }}
              width={24}
              height={24}
            />
          ) : (
            <UnCheckboxIcon
              onClick={() => {
                setRecommendAIEstimateBudget(false)
              }}
              width={24}
              height={24}
            />
          )
        }
        styleSize={'sm'}
        styleType={'outline2'}
        styleStatus={'default'}
        customClassName={'w-fit rounded-full'}
      >
        AI 예산 추천받기
      </Button1>
      <Input
        value={String(projectData?.requestEstimate) ?? ''}
        customClassName={'h-[52px]'}
        type={'number'}
        onChange={(e) => {
          setState({
            ...projectData,
            projectData: { ...projectData, requestEstimate: parseInt(e.target.value) },
          })
        }}
        placeholder={'예산을 입력해주세요.(원 단위)'}
        inputBoxStyle={'default'}
      />
    </div>
  )
}
