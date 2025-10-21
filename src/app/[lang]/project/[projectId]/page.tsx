import BidderList from '@/components/create-project/BidderList'
import FinalShippingAndExtraInfo from '@/components/create-project/detail/FinalShippingAndExtraInfo'
import FinalBasicInfo from '@/components/create-project/detail/FinalBasicInfo'
import FinalRequestCondition from '@/components/create-project/detail/FinalRequestCondition'
import { getProjectDetail } from '@/lib/api/server/project'
import { notFound } from 'next/navigation'
import type { ProjectDetailResponseType } from '@/type/project'
import { I18nParams } from '@/lib/i18n.types'
import { useTranslationServer } from '@/lib/i18n'

interface ProjectDetailPageProps {
  params: Promise<I18nParams & { projectId: string }>
}
export const dynamic = 'force-dynamic'

export default async function ProjectDetailPage({ params }: ProjectDetailPageProps) {
  const { lang, projectId } = await params
  const { t } = await useTranslationServer(lang, 'common')
  const id = parseInt(projectId, 10)

  // 유효하지 않은 ID는 404 처리
  if (isNaN(id) || id <= 0) {
    notFound()
  }

  let project: ProjectDetailResponseType | null = null
  let error: string | null = null

  try {
    // 서버에서 상세 데이터 가져오기
    const response = await getProjectDetail(projectId)

    // 응답 검증
    if (response?.result === 'SUCCESS' && response.data) {
      project = response.data
    } else {
      error = t('error.project.upload')
    }
  } catch (err) {
    error = t('error.project.upload')
  }

  // 에러 또는 프로젝트 없음
  if (error || !project) {
    notFound()
  }

  const projectData = project.projectDetailResponse.projectRegisterRequest

  return (
    <main className="flex flex-col items-center justify-center">
      <div className="gap-y-l mx-auto mt-[20px] flex h-[80px] flex-col">
        <div className="flex w-full items-center justify-between">
          <h2 className="h2">{t('project.detail.h1')}</h2>
        </div>

        <div className="flex gap-x-[24px]">
          {/* 왼쪽: 프로젝트 정보 */}
          <div className="flex flex-col gap-y-[16px]">
            <FinalBasicInfo
              lang={lang}
              projectTitle={projectData.projectTitle}
              categoryDetail={projectData.categoryDetail}
              category={projectData.category}
              categoryDetailEtc={projectData.categoryDetailEtc}
              purpose={projectData.purpose}
              purposeEtc={projectData.purposeEtc}
            />

            <FinalRequestCondition
              lang={lang}
              drawingUrls={project.projectDetailResponse.drawingUrls}
              requests={projectData.requests}
              requestEstimate={projectData.requestEstimate}
              projectQuantity={projectData.projectQuantity}
              deadline={projectData.deadline}
              canDeadlineChange={projectData.canDeadlineChange}
              publicUntil={projectData.publicUntil}
            />

            <FinalShippingAndExtraInfo
              lang={lang}
              canPhoneConsult={projectData.canPhoneConsult}
              deliveryAddress={projectData.deliveryAddress}
              projectStatus={projectData.projectStatus}
            />
          </div>

          {/* 오른쪽: 입찰자 목록 */}
          <BidderList
            projectId={projectId}
            memberId={projectData.memberId}
            proposalThumbnails={project.proposalThumbnails}
            publicUntil={projectData.publicUntil}
            ProjectResponseType={project.projectDetailResponse}
          />
        </div>
      </div>
    </main>
  )
}
