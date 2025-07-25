import Input from '@/components/common/Input'

interface ProjectNameFieldProps {}
export default function ProjectNameField({}: ProjectNameFieldProps) {
  return (
    <div className="gap-y-4xs flex flex-col">
      <p className="sub2">프로젝트 이름</p>
      <Input
        value={''}
        placeholder={'프로젝트 이름을 입력해주세요.'}
        inputBoxStyle={'default'}
        customClassName={'h-[52px]'}
      />
    </div>
  )
}
