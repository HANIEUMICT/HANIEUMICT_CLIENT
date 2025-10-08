import Image from 'next/image'
import { DeleteIcon } from '@/assets/svgComponents'

interface ImageUploadItemProps {
  ImageUrl: string | ArrayBuffer | null
  ImageUrlName: string
  onRemove?: () => void
}

export default function ImageUploadItem({ ImageUrl, ImageUrlName, onRemove }: ImageUploadItemProps) {
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
    <div className="relative flex h-[110px] w-[110px] items-center justify-center">
      <DeleteIcon onClick={onRemove} className="absolute top-0 right-0 z-10" width={24} height={24} />
      <div className="relative h-[96px] w-[96px]">
        <Image alt={ImageUrlName || '업로드된 이미지'} src={imageSrc} fill className="rounded-[12px] object-cover" />
      </div>
    </div>
  )
}
