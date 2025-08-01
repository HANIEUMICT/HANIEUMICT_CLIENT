import Image from 'next/image'
import { AshbnIcon } from '@/assets/svgComponents'

interface UploadItemProps {
  ImageUrl: string | ArrayBuffer | null
  ImageUrlName: string
  imageSize: string
  onRemove: () => void
  customClassName?: string
}

export default function UploadItem({
  ImageUrl,
  ImageUrlName,
  imageSize,
  onRemove,
  customClassName = 'w-[624px]',
}: UploadItemProps) {
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

  // 이미지가 없으면 렌더링하지 않거나 placeholder 표시
  if (!imageSrc) {
    return null // 또는 placeholder 컴포넌트
  }

  return (
    <div
      className={`${customClassName} border-gray-20 flex h-[80px] items-center justify-between rounded-[16px] border px-5`}
    >
      <div className="flex items-center gap-x-2">
        <div className="relative h-[44px] w-[44px]">
          <Image alt={ImageUrlName || '업로드된 이미지'} src={imageSrc} fill className="rounded-[3px] object-cover" />
        </div>
        <div className="flex flex-col gap-y-2">
          <p className="body1">{ImageUrlName}</p>
          <p className="caption text-gray-50">{imageSize}</p>
        </div>
      </div>

      <AshbnIcon onClick={onRemove} width={20} height={20} />
    </div>
  )
}
