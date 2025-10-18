import ProjectCard from '@/components/project/ProjectCard'
import Pagination from '@/components/common/Pagination'
import Input from '@/components/common/Input'
import { SearchIcon } from '@/assets/svgComponents'
import { ProjectResponseType } from '@/type/project'
import ProjectPageClient from '@/components/project/ProjectPageClient'
import { getProject } from '@/lib/api/server/project'
import { I18nParams } from '@/lib/i18n.types'
import { useTranslationServer } from '@/lib/i18n'

type SearchParams = Promise<{ page?: string; status?: string }>

interface ProjectPageProps {
  searchParams: SearchParams
  params: Promise<I18nParams>
}

export const dynamic = 'force-dynamic'

export default async function ProjectPage({ searchParams, params }: ProjectPageProps) {
  // Promise 해결
  const resolvedSearchParams = await searchParams
  const { lang } = await params
  const { t } = await useTranslationServer(lang, 'common')

  // 서버에서 파라미터 추출
  const currentPage = resolvedSearchParams.page ? parseInt(resolvedSearchParams.page, 10) - 1 : 0
  const status = (resolvedSearchParams.status as any) || 'SUBMIT'

  let projectList: ProjectResponseType[] = []
  let totalPages = 0
  let error = null

  try {
    // 서버에서 데이터 미리 가져오기
    const response = await getProject(null, status, currentPage, 9)

    if (response?.result === 'SUCCESS' && response.data && Array.isArray(response.data.content)) {
      projectList = response.data.content
      totalPages = response.data.totalPages
    }
  } catch (err) {
    console.error('프로젝트 데이터 불러오기 실패:', err)
    error = '데이터를 불러올 수 없습니다'
  }

  return (
    <main className="flex flex-col items-center justify-center">
      <section className="flex w-[1218px] flex-col gap-y-[40px]">
        <Input
          leftIcon={<SearchIcon />}
          value={''}
          inputBoxStyle={'default'}
          placeholder={"'공급업체' 또는 '카테고리' 검색어를 입력해보세요."}
        />

        <section className="flex flex-col gap-y-4">
          <h1 className="h2">견적서 전체보기</h1>

          {error ? (
            <div className="py-8 text-center text-red-500">{error}</div>
          ) : (
            <>
              <section className="gap-s grid grid-cols-3">
                {projectList && projectList.length > 0 ? (
                  projectList.map((project) => <ProjectCard key={project.projectId} {...project} />)
                ) : (
                  <div className="text-gray-40 col-span-3 py-8 text-center">등록된 프로젝트가 없습니다</div>
                )}
              </section>

              <div className="my-[40px]">
                <Pagination
                  totalPages={totalPages}
                  currentPage={currentPage + 1}
                  showPages={5}
                  baseUrl={`/${lang}/project`}
                />
              </div>
            </>
          )}
        </section>
      </section>

      {/* 클라이언트 전용 기능 (모달 등) */}
      <ProjectPageClient />
    </main>
  )
}
