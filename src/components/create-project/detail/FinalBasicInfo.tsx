import { useTranslationServer } from '@/lib/i18n'
import { Locale } from '@/lib/i18n.types'

interface FinalBasicInfoProps {
  lang: Locale
  projectTitle?: string | null
  category?: string | null
  categoryDetail?: string | null
  categoryDetailEtc?: string | null
  purpose?: string | null
  purposeEtc?: string | null
}
export default async function FinalBasicInfo({
  lang,
  projectTitle,
  category,
  categoryDetail,
  categoryDetailEtc,
  purpose,
  purposeEtc,
}: FinalBasicInfoProps) {
  const { t } = await useTranslationServer(lang, ['common'])
  return (
    <section className="border-gray-20 flex w-[1063px] flex-col gap-y-[16px] rounded-[24px] border bg-white p-6">
      <h1 className="sub1">{t('project.detail.basicInfo.title')}</h1>
      <section className="flex flex-col gap-y-[16px]">
        <div className="flex flex-col gap-y-[12px]">
          <p className="sub2">{t('project.detail.basicInfo.projectTitle')}</p>
          <p className="body1 text-gray-40">{projectTitle}</p>
        </div>
        <div className="flex">
          <div className="flex flex-col gap-y-[12px]">
            <p className="sub2">{t('project.detail.basicInfo.category')}</p>
            <p className="body1 text-gray-40">{category}</p>
          </div>
          <div className="flex flex-col gap-y-[12px]">
            <p className="sub2">{t('project.detail.basicInfo.categoryDetail')}</p>
            <p className="body1 text-gray-40">{categoryDetail}</p>
          </div>
        </div>
        <div className="flex flex-col gap-y-[12px]">
          <p className="sub2">{t('project.detail.basicInfo.categoryDetailEtc')}</p>
          <div className="flex flex-col gap-y-1">{categoryDetailEtc}</div>
        </div>

        <div className="flex">
          <div className="flex flex-col gap-y-[12px]">
            <p className="sub2">{t('project.detail.basicInfo.purpose')}</p>
            <p className="body1 text-gray-40">{purpose}</p>
          </div>
          <div className="flex flex-col gap-y-[12px]">
            <p className="sub2">{t('project.detail.basicInfo.purposeEtc')}</p>
            <p className="body1 text-gray-40">{purposeEtc}</p>
          </div>
        </div>
      </section>
    </section>
  )
}
