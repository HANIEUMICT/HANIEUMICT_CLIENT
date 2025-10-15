import Input from '@/components/common/Input'
import { CalendarIcon, CheckboxFillIcon, UnCheckboxIcon } from '@/assets/svgComponents'
import { useProjectStore } from '@/store/projectStore'

export default function DueDatePicker() {
  const projectData = useProjectStore((state) => state.projectData)
  const setState = useProjectStore((state) => state.setState)
  return (
    <div className="gap-y-4xs flex flex-col">
      <p className="sub2 flex gap-x-1">
        납기일 선택<span className="text-conic-red-30">*</span>
      </p>
      <Input
        type={'date'}
        value={projectData?.deadline ?? ''}
        onChange={(e) => {
          setState({
            ...projectData,
            projectData: { ...projectData, deadline: e.target.value },
          })
        }}
        customClassName={'h-[52px]'}
        placeholder={'납기일 입력'}
        inputBoxStyle={'default'}
        leftIcon={<CalendarIcon width={24} height={24} />}
      />
      <div className="flex items-center gap-x-2">
        {projectData?.canDeadlineChange ? (
          <CheckboxFillIcon
            onClick={() => {
              setState({
                ...projectData,
                projectData: { ...projectData, canDeadlineChange: false },
              })
            }}
            width={24}
            height={24}
          />
        ) : (
          <UnCheckboxIcon
            onClick={() => {
              setState({
                ...projectData,
                projectData: { ...projectData, canDeadlineChange: true },
              })
            }}
            width={24}
            height={24}
          />
        )}
        <p className="button-lg text-gray-50">납기일 협의 가능</p>
      </div>
    </div>
  )
}
