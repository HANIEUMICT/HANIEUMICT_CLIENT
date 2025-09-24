import { useProjectStore } from '@/store/projectStore'

interface RequestDetailFieldProps {}
export default function RequestDetailField({}: RequestDetailFieldProps) {
  const projectData = useProjectStore((state) => state.projectData)
  const setState = useProjectStore((state) => state.setState)
  return (
    <div className="gap-y-4xs flex flex-col">
      <p className="sub2">세부 요청사항 입력</p>
      <textarea
        value={projectData?.requests ?? ''}
        onChange={(e) => {
          setState({
            ...projectData,
            projectData: { ...projectData, requests: e.target.value },
          })
        }}
        className={
          'p-2xs placeholder:body1 border-gray-20 h-[148px] rounded-[16px] border outline-none placeholder:text-gray-50'
        }
        placeholder={'세부 요청 사항을 입력해주세요.'}
      />
      <p className="body1 text-conic-orange-40">
        제작 목적 및 동작 시나리오를 서술해주세요. 최대한 자세하게 작성할수록 파트너에게 도움이 됩니다.{' '}
      </p>
    </div>
  )
}
