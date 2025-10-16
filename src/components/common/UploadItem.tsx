'use client'

import Image from 'next/image'
import { useState, useEffect } from 'react'
import { AshbnIcon, DownloadIcon, ImgUploadIcon } from '@/assets/svgComponents'

interface UploadItemProps {
  ImageUrl: string | ArrayBuffer | null
  ImageUrlName: string
  imageSize?: string
  onRemove?: () => void
  customClassName?: string
}

export default function UploadItem({
  ImageUrl,
  ImageUrlName,
  imageSize,
  onRemove,
  customClassName = 'w-[624px]',
}: UploadItemProps) {
  const [imageError, setImageError] = useState(false)

  // ImageUrl이 변경될 때마다 에러 상태 초기화
  useEffect(() => {
    setImageError(false)
  }, [ImageUrl])

  const getImageSrc = (): string | null => {
    if (typeof ImageUrl === 'string') {
      return ImageUrl
    }
    if (ImageUrl instanceof ArrayBuffer) {
      // ArrayBuffer를 Data URL로 변환
      const blob = new Blob([ImageUrl])
      return URL.createObjectURL(blob)
    }
    return null
  }

  const imageSrc = getImageSrc()

  // 이미지가 없으면 렌더링하지 않음
  if (!imageSrc) {
    return null
  }

  const handleImageError = () => {
    setImageError(true)
  }

  return (
    <div
      className={`${customClassName} border-gray-20 flex h-[80px] items-center justify-between rounded-[16px] border px-5`}
    >
      <div className="flex min-w-0 flex-1 items-center gap-x-2">
        {/* 이미지 영역 */}
        {imageSrc && !imageError ? (
          <div className="relative h-[44px] w-[44px] flex-shrink-0">
            <Image
              alt={ImageUrlName}
              src={imageSrc}
              fill
              className="rounded-[3px] object-cover"
              onError={handleImageError}
              unoptimized={typeof ImageUrl === 'string'} // 👈 외부 URL일 경우 최적화 비활성화
            />
          </div>
        ) : (
          <div className="flex-shrink-0">
            <ImgUploadIcon width={44} height={44} />
          </div>
        )}

        {/* 텍스트 영역 - 말줄임 처리 */}
        <div className="flex min-w-0 flex-1 flex-col gap-y-2">
          <p className="body1 truncate" title={ImageUrlName}>
            {ImageUrlName}
          </p>
          {imageSize ? <p className="caption text-gray-50">{imageSize}</p> : null}
        </div>
      </div>

      {/* 삭제 버튼 */}
      {onRemove ? (
        <AshbnIcon onClick={onRemove} width={20} height={20} className="flex-shrink-0 cursor-pointer" />
      ) : null}
    </div>
  )
}
