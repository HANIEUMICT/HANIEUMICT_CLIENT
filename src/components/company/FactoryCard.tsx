'use client'

import Image from 'next/image'
import { FavoriteIcon, ImgUploadIcon } from '@/assets/svgComponents'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { useTranslation } from 'react-i18next'

interface FactoryCardProps {
  imageUrl: string
  name: string
  avgProductionLeadHours: number
  totalOrderCount: number
  repeatOrderCount: number
  avgResponseMinutes: number
  likeCount: number
  companyId: number
}

export default function FactoryCard({
  companyId,
  imageUrl,
  name,
  avgProductionLeadHours,
  totalOrderCount,
  repeatOrderCount,
  avgResponseMinutes,
  likeCount,
}: FactoryCardProps) {
  const router = useRouter()
  const [isImageError, setIsImageError] = useState(false)
  const { t } = useTranslation()

  return (
    <div
      onClick={() => {
        router.push(`/${companyId}`)
      }}
      className="border-gray-20 w-[290px] cursor-pointer rounded-[16px] border"
    >
      <section className="relative h-[120px] w-[290px] rounded-[16px]">
        {isImageError || !imageUrl ? (
          <ImgUploadIcon width={290} height={120} />
        ) : (
          <Image
            src={imageUrl}
            alt="사진"
            fill
            className="rounded-t-[16px] object-cover"
            onError={() => setIsImageError(true)}
          />
        )}

        {/* 아이콘, 좋아요 갯수 */}
        <div className="gap-5xs absolute top-[10px] right-[15px] flex">
          <FavoriteIcon width={16} height={14}></FavoriteIcon>
          <p className="button-sm text-white">{likeCount}</p>
        </div>
      </section>

      <div className="gap-y-4xs p-2xs flex w-[289px] flex-col rounded-b-[16px] bg-white">
        {/* 카테고리 */}
        {/*<div className="border-gray-20 button-sm flex h-[24px] w-fit items-center rounded-full border px-[8px] text-gray-50">*/}
        {/*  {category}*/}
        {/*</div>*/}
        {/* 기업명 */}
        <div className="h3">{name}</div>
        {/* 상세정보 */}
        <div className="flex flex-col gap-y-[4px]">
          <div className="flex items-center justify-between">
            <p className="body2 text-gray-40">{t('company.card.avgProductionLeadHours')}</p>
            <p className="button-sm text-gray-50">{avgProductionLeadHours}</p>
          </div>
          <div className="flex items-center justify-between">
            <p className="body2 text-gray-40">{t('company.card.totalOrderCount')}</p>
            <p className="button-sm text-gray-50">{totalOrderCount}</p>
          </div>
          <div className="flex items-center justify-between">
            <p className="body2 text-gray-40">{t('company.card.repeatOrderCount')}</p>
            <p className="button-sm text-gray-50">{repeatOrderCount}</p>
          </div>
          <div className="flex items-center justify-between">
            <p className="body2 text-gray-40">{t('company.card.avgResponseMinutes')}</p>
            <p className="button-sm text-gray-50">{avgResponseMinutes}</p>
          </div>
        </div>
      </div>
    </div>
  )
}
