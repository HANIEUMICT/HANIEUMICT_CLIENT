import { Locale } from '@/lib/i18n.types'
import { useTranslationServer } from '@/lib/i18n'

interface FinalShippingAndExtraInfoProps {
  lang: Locale
  projectStatus?: string | null
  canPhoneConsult?: boolean
  deliveryAddress?: string | null
}
export default async function FinalShippingAndExtraInfo({
  lang,
  deliveryAddress,
  canPhoneConsult,
  projectStatus,
}: FinalShippingAndExtraInfoProps) {
  const { t } = await useTranslationServer(lang, ['common'])

  const convertProjectStatus = (projectStatus: string | undefined | null | 'PUBLIC' | 'PRIVATE' | 'PROTECTED') => {
    switch (projectStatus) {
      case 'PUBLIC':
        return t('project.detail.shippingAndExtraInfo.projectStatus.public')
      case 'PRIVATE':
        return t('project.detail.shippingAndExtraInfo.projectStatus.private')
      case 'PROTECTED':
        return t('project.detail.shippingAndExtraInfo.projectStatus.protected')
    }
  }

  return (
    <section className="border-gray-20 flex w-[1063px] flex-col gap-y-[16px] rounded-[24px] border bg-white p-6">
      <h1 className="sub1">{t('project.detail.shippingAndExtraInfo.title')}</h1>
      <section className="flex flex-col gap-y-[16px]">
        <div className="flex justify-between">
          <div className="flex flex-col gap-y-[12px]">
            <p className="sub2">{t('project.detail.shippingAndExtraInfo.projectStatus.title')}</p>
            <p className="body1 text-gray-40">{convertProjectStatus(projectStatus)}</p>
          </div>
          <div className="flex w-[300px] flex-col gap-y-[12px]">
            <p className="sub2">{t('project.detail.shippingAndExtraInfo.canPhoneConsult.title')}</p>
            <p className="body1 text-gray-40">
              {canPhoneConsult
                ? t('project.detail.shippingAndExtraInfo.canPhoneConsult.yes')
                : t('project.detail.shippingAndExtraInfo.canPhoneConsult.no')}
            </p>
          </div>
        </div>
        <div className="flex w-full flex-col gap-y-[12px]">
          <p className="sub2">{t('project.detail.shippingAndExtraInfo.deliveryAddress.title')}</p>
          <div className="gap-y-2xs p-s border-gray-20 flex w-full flex-col rounded-[24px] border">
            <div className="gap-x-4xs flex">
              <p className="text-gray-40 body1">
                {t('project.detail.shippingAndExtraInfo.deliveryAddress.deliveryAddress')}
              </p>
              <p className="sub2 text-gray-50">{deliveryAddress}</p>
            </div>
          </div>
        </div>
      </section>
    </section>
  )
}
