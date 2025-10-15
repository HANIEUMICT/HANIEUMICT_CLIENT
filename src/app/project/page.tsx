'use client'

import Header from '@/components/common/Header'
import ProjectCard from '@/components/project/ProjectCard'
import Pagination from '@/components/common/Pagination'
import Input from '@/components/common/Input'
import { SearchIcon } from '@/assets/svgComponents'
import { useEffect, useState } from 'react'
import { getProject } from '@/lib/project'
import { ProjectResponseType } from '@/type/project'
import { ProposalStatusType } from '@/type/proposal'
import CopyrightAgreementModal from '../../components/modal/CopyrightAgreementModal'

export default function ProjectPage() {
  const [status, setStatus] = useState<ProposalStatusType>('SUBMIT')
  const [projectList, setProjectList] = useState<ProjectResponseType[] | undefined>()
  // 페이지네이션
  const [currentPage, setCurrentPage] = useState(0)
  const [totalPages, setTotalPages] = useState<number>(0)
  const [totalElements, setTotalElements] = useState<number>(0)
  //저작권 동의
  const [isCopyrightAgreementModalOpen, setIsCopyrightAgreementModalOpen] = useState(false)
  const [agreement, setAgreement] = useState(false)
  const [selectedProjectId, setSelectedProjectId] = useState<number>()

  // 페이지 변경 핸들러
  const handlePageChange = (page: number) => {
    setCurrentPage(page - 1) // Pagination은 1부터 시작하지만 API는 0부터 시작
  }

  // 데이터 로드
  useEffect(() => {
    const loadArchiveData = async () => {
      try {
        const response = await getProject(null, status, currentPage, 9)

        console.log('API 전체 응답:', response)

        if (response && response.result === 'SUCCESS' && response.data && Array.isArray(response.data.content)) {
          const content = response.data.content
          setProjectList(content)
          setTotalPages(response.data.totalPages)
          setTotalElements(response.data.totalElements || 0)
        } else {
          console.warn('예상하지 못한 응답 구조:', response)
          setProjectList([])
          setTotalPages(0)
          setTotalElements(0)
        }
      } catch (error: unknown) {
        console.error('아카이브 데이터 불러오기 실패:', error)
        setProjectList([])
        setTotalPages(0)
        setTotalElements(0)
      } finally {
      }
    }

    loadArchiveData()
  }, [currentPage, status]) // currentPage 변경 시 실행

  return (
    <main className="flex flex-col items-center justify-center">
      {isCopyrightAgreementModalOpen && (
        <CopyrightAgreementModal
          projectId={selectedProjectId}
          setIsModalOpen={setIsCopyrightAgreementModalOpen}
          setAgreement={setAgreement}
          agreement={agreement}
        />
      )}
      <Header headerType={'DEFAULT'} />
      <section className="mt-[100px] flex w-[1218px] flex-col gap-y-[40px]">
        <Input
          leftIcon={<SearchIcon />}
          value={''}
          inputBoxStyle={'default'}
          placeholder={"‘공급업체' 또는 ‘카테고리' 검색어를 입력해보세요."}
        />
        <section className="flex flex-col gap-y-4">
          <h1 className="h2">견적서 전체보기</h1>
          <section className="flex gap-x-2">
            {/*<Filter title={'카테고리'} />*/}
            {/*<Filter title={'제조 분류'} />*/}
            {/*<Filter title={'평균 응답 시간'} />*/}
            {/*<Filter title={'입찰 여부'} />*/}
          </section>
          <section className="gap-s grid grid-cols-3">
            {projectList
              ? projectList.map((project) => {
                  return (
                    <ProjectCard
                      key={project.projectId}
                      {...project}
                      setSelectedProjectId={setSelectedProjectId}
                      setIsCopyrightAgreementModalOpen={setIsCopyrightAgreementModalOpen}
                    />
                  )
                })
              : null}
          </section>
        </section>
      </section>

      <div className="my-[40px]">
        <Pagination
          totalPages={totalPages}
          onPageChange={handlePageChange}
          currentPage={currentPage + 1}
          showPages={5}
        />
      </div>
    </main>
  )
}
