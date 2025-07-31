import Input from '@/components/common/Input'
import { useProjectStore } from '@/store/projectStore'
import { ChangeEvent } from 'react'

interface ProjectNameFieldProps {}
export default function ProjectNameField({}: ProjectNameFieldProps) {
  const projectData = useProjectStore((state) => state.projectData)
  const setState = useProjectStore((state) => state.setState)

  return (
    <div className="gap-y-4xs flex flex-col">
      <p className="sub2">프로젝트 이름</p>
      <Input
        value={projectData?.projectTitle ?? ''}
        onChange={(e: ChangeEvent<HTMLInputElement>) => {
          setState({
            ...projectData,
            projectData: { ...projectData, projectTitle: e.target.value },
          })
        }}
        placeholder={'프로젝트 이름을 입력해주세요.'}
        inputBoxStyle={'default'}
        customClassName={'h-[52px]'}
      />
    </div>
  )
}
