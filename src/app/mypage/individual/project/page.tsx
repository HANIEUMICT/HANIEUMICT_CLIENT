'use client'

import ProjectCard from '@/components/project/ProjectCard'
import Button1 from '@/components/common/Button1'
import { Dispatch, SetStateAction, useEffect, useState } from 'react'
import { ProposalStatusType } from '@/type/proposal'
import { getUserData } from '@/utils/common'
import { getProject } from '@/lib/project'
import Pagination from '@/components/common/Pagination'
import { ProjectResponseType } from '@/type/project'
import { useRouter } from 'next/navigation'

interface MyProjectPageProps {}

export default function IndividualMyProjectPage({}: MyProjectPageProps) {
  const router = useRouter()
  const [status, setStatus] = useState<ProposalStatusType>('SUBMIT')
  const [memberId, setMemberId] = useState<number | undefined>()
  const [myProjectList, setMyProjectList] = useState<ProjectResponseType[]>()

  // 페이지네이션
  const [currentPage, setCurrentPage] = useState(0)
  const [totalPages, setTotalPages] = useState<number>(0)
  const [totalElements, setTotalElements] = useState<number>(0)

  useEffect(() => {
    setMemberId(getUserData()?.memberId)
  }, [])

  // 페이지 변경 핸들러
  const handlePageChange = (page: number) => {
    setCurrentPage(page - 1) // Pagination은 1부터 시작하지만 API는 0부터 시작
  }

  // 데이터 로드
  useEffect(() => {
    const loadArchiveData = async () => {
      try {
        if (memberId) {
          const response = await getProject(memberId, status, currentPage, 10)

          console.log('API 전체 응답:', response)

          if (response && response.result === 'SUCCESS' && response.data && Array.isArray(response.data.content)) {
            const content = response.data.content
            setMyProjectList(content)
            setTotalPages(response.data.totalPages)
            setTotalElements(response.data.totalElements || 0)
          } else {
            console.warn('예상하지 못한 응답 구조:', response)
            setMyProjectList([])
            setTotalPages(0)
            setTotalElements(0)
          }
        }
      } catch (error: unknown) {
        console.error('아카이브 데이터 불러오기 실패:', error)
        setMyProjectList([])
        setTotalPages(0)
        setTotalElements(0)
      } finally {
      }
    }

    loadArchiveData()
  }, [currentPage, memberId, status]) // currentPage 변경 시 실행

  return (
    <div className="mt-[40px] flex w-[1218px] flex-col gap-y-[20px]">
      <div className="flex items-center justify-between">
        <h1 className="h2">내 견적서</h1>
        <Button1
          onClick={() => {
            router.push('/create-project')
          }}
          styleStatus={'default'}
          styleSize={'sm'}
          styleType={'secondary'}
          customClassName={'w-[80px] rounded-full h-[36px]'}
        >
          추가
        </Button1>
      </div>

      <MyProjectMenu status={status} setStatus={setStatus} />
      <div className="gap-s grid grid-cols-3">
        {myProjectList?.map((myProject) => {
          return <ProjectCard key={myProject.projectId} {...myProject} />
        })}
      </div>
      <div className="my-[40px]">
        <Pagination
          totalPages={totalPages}
          onPageChange={handlePageChange}
          currentPage={currentPage + 1} // API는 0부터, UI는 1부터
          showPages={5}
        />
      </div>
    </div>
  )
}

function MyProjectMenu({
  status,
  setStatus,
}: {
  status: ProposalStatusType
  setStatus: Dispatch<SetStateAction<ProposalStatusType>>
}) {
  const menuList: { status: ProposalStatusType; content: string }[] = [
    { status: 'SUBMIT', content: '제출 완료' },
    { status: 'TEMPORARY_SAVE', content: '임시저장' },
  ]
  return (
    <div className="gap-x-3xs flex">
      {menuList.map((menu) => {
        return (
          <button
            key={menu.status}
            onClick={() => {
              setStatus(menu.status)
            }}
            type={'button'}
            className={
              status === menu.status
                ? 'gap-x-4xs border-conic-red-30 text-conic-red-30 h3 p-5xs flex border-b-[2px]'
                : 'gap-x-4xs text-gray-30 h3 p-5xs flex'
            }
          >
            <p>{menu.content}</p>
            <p>(1)</p>
          </button>
        )
      })}
    </div>
  )
}
