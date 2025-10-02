import ProjectCard from '@/components/project/ProjectCard'
import Button1 from '@/components/common/Button1'

export default function MyProjectPage() {
  return (
    <div className="mt-[40px] flex w-[1218px] flex-col gap-y-[20px]">
      <div className="flex items-center justify-between">
        <h1 className="h2">내 견적서</h1>
        <Button1
          onClick={() => {}}
          styleStatus={'default'}
          styleSize={'sm'}
          styleType={'secondary'}
          customClassName={'w-[80px] rounded-full h-[36px]'}
        >
          추가
        </Button1>
      </div>

      <MyProjectMenu />
      <div className="gap-s grid grid-cols-3">
        <ProjectCard />
      </div>
    </div>
  )
}

function MyProjectMenu() {
  return (
    <div className="gap-x-3xs flex">
      <button className="gap-x-4xs border-conic-red-30 text-conic-red-30 h3 p-5xs flex border-b-[2px]">
        <p>전체</p>
        <p>(1)</p>
      </button>
      <button className="gap-x-4xs text-gray-30 h3 p-5xs flex">
        <p>진행전</p>
        <p>(0)</p>
      </button>
      <button className="gap-x-4xs text-gray-30 h3 p-5xs flex">
        <p>진행중</p>
        <p>(1)</p>
      </button>
      <button className="gap-x-4xs text-gray-30 h3 p-5xs flex">
        <p>진행완료</p>
        <p>(0)</p>
      </button>
    </div>
  )
}
