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
  return (
    <div
      className={`${customClassName} border-gray-20 flex h-[80px] items-center justify-between rounded-[16px] border px-5`}
    >
      <div className="flex items-center gap-x-2">
        <div className="relative h-[44px] w-[44px]">
          <Image alt={ImageUrl} src={ImageUrl} fill className="rounded-[3px] object-cover" />
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
