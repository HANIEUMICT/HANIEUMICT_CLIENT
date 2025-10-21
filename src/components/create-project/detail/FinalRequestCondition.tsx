import DownloadItem from '@/components/common/DownloadItem'
import { extractImageInfo } from '@/utils/project'
import { Locale } from '@/lib/i18n.types'
import { useTranslationServer } from '@/lib/i18n'

interface FinalRequestConditionProps {
  lang: Locale
  drawingUrls: string[] | undefined
  projectQuantity?: number | null
  requests?: string | null
  deadline?: string | null
  canDeadlineChange?: boolean
  requestEstimate?: number | null
  publicUntil?: string | null
}
export default async function FinalRequestCondition({
  lang,
  drawingUrls,
  projectQuantity,
  requestEstimate,
  requests,
  publicUntil,
  deadline,
  canDeadlineChange,
}: FinalRequestConditionProps) {
  const { t } = await useTranslationServer(lang, ['common'])
  return (
    <section className="border-gray-20 flex w-[1063px] flex-col gap-y-[16px] rounded-[24px] border bg-white p-6">
      <h1 className="sub1">{t('project.detail.requestCondition.title')}</h1>
      <section className="flex flex-col gap-y-[16px]">
        <div className="flex flex-col gap-y-3">
          <div className="flex w-[577px] flex-col gap-y-[12px]">
            <p className="sub2">{t('project.detail.requestCondition.drawingTitle')}</p>
            <p className="body1 text-gray-40">{t('project.detail.requestCondition.drawingDescription')}</p>
          </div>
          <div className="flex flex-col gap-y-2">
            {drawingUrls
              ? drawingUrls.map((drawingUrl, index) => {
                  return (
                    <DownloadItem
                      key={index + drawingUrl}
                      ImageUrlName={extractImageInfo(drawingUrl).imageName}
                      ImageUrl={drawingUrl}
                    />
                  )
                })
              : null}
          </div>
          <div className="flex flex-col gap-y-[12px]">
            <p className="sub2">{t('project.detail.requestCondition.projectQuantity')}</p>
            <p className="body1 text-gray-40">{projectQuantity}</p>
          </div>
          <div className="flex flex-col gap-y-[12px]">
            <p className="sub2">{t('project.detail.requestCondition.requests')}</p>
            <p className="body1 text-gray-40">{requests}</p>
          </div>
          <div className="flex justify-between">
            <div className="flex flex-col gap-y-[12px]">
              <p className="sub2">{t('project.detail.requestCondition.deadline')}</p>
              <div className="flex flex-col gap-y-1">
                <p className="body1 text-gray-40">{deadline}</p>
                <p className="body1 text-gray-40">
                  {canDeadlineChange ? t('project.detail.requestCondition.canDeadlineChange') : null}
                </p>
              </div>
            </div>
            <div className="flex flex-col gap-y-[12px]">
              <p className="sub2">{t('project.detail.requestCondition.requestEstimate')}</p>
              <p className="body1 text-gray-40">{requestEstimate?.toLocaleString()}원</p>
            </div>
            <div className="flex w-[200px] flex-col gap-y-[12px]">
              <p className="sub2">{t('project.detail.requestCondition.publicUntil')}</p>
              <p className="body1 text-gray-40">{publicUntil}</p>
            </div>
          </div>
        </div>
      </section>
    </section>
  )
}
