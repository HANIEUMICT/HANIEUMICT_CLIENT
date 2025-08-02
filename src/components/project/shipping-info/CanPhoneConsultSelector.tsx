import Button1 from '@/components/common/Button1'
import { useProjectStore } from '@/store/projectStore'

export default function CanPhoneConsultSelector() {
  const projectData = useProjectStore((state) => state.projectData)
  const setState = useProjectStore((state) => state.setState)
  return (
    <section className="flex flex-col gap-y-2">
      <p className="sub2">전화 상담 여부</p>
      <div className="gap-x-3xs flex">
        <Button1
          onClick={() => {
            setState({
              projectData: {
                ...projectData,
                canPhoneConsult: projectData?.canPhoneConsult === true ? undefined : true,
              },
            })
          }}
          styleType={projectData?.canPhoneConsult === true ? 'outline2' : 'outline'}
          styleSize={'lg'}
          styleStatus={projectData?.canPhoneConsult === true ? 'selected' : 'default'}
          customClassName={'w-full'}
        >
          가능
        </Button1>
        <Button1
          onClick={() => {
            setState({
              projectData: {
                ...projectData,
                canPhoneConsult: projectData?.canPhoneConsult === false ? undefined : false,
              },
            })
          }}
          styleType={projectData?.canPhoneConsult === false ? 'outline2' : 'outline'}
          styleSize={'lg'}
          styleStatus={projectData?.canPhoneConsult === false ? 'selected' : 'default'}
          customClassName={'w-full'}
        >
          불가능
        </Button1>
      </div>
    </section>
  )
}
