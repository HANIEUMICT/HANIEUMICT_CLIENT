'use client'

import Tag from '@/components/common/Tag'
import { useModalStore } from '@/store/modalStore'
import { useTranslation } from 'react-i18next'

export default function RecommendedTag() {
  const setModalState = useModalStore((state) => state.setState)
  const { t } = useTranslation()
  return (
    <div className="gap-x-4xs flex w-full">
      {/* TODO: 나중에 MAP */}
      <Tag tagContent={t('company.recommendTag.tag1')} tagColor={'bg-conic-orange-40'} tagNumber={1}></Tag>
      <Tag tagContent={t('company.recommendTag.tag2')} tagColor={'bg-conic-orange-30'} tagNumber={2}></Tag>
      <Tag tagContent={t('company.recommendTag.tag3')} tagColor={'bg-conic-orange-20'} tagNumber={3}></Tag>
      <button
        onClick={() => {
          setModalState({ isServicePreparingModalOpen: true })
        }}
        className="text-gray-40 button-sm"
      >
        {t('company.recommendTag.changeTagButton')}
      </button>
    </div>
  )
}
