import { UploadIcon } from '@/assets/svgComponents'
import UploadItem from '@/components/common/UploadItem'
import { useProjectStore } from '@/store/projectStore'
import { FileInfoType } from '@/type/common'
import { RefObject } from 'react'
import { formatFileSize, generateId } from '@/utils/upload'
import { useAuthStore } from '@/store/authStore'
import DownloadItem from '@/components/common/DownloadItem'

interface CompanyLogoImageUploadProps {
  url?: string | undefined
  companyLogoImageRef: RefObject<HTMLInputElement | null>
}

export default function CompanyLogoImageUpload({ url, companyLogoImageRef }: CompanyLogoImageUploadProps) {
  const companyLogoFile = useAuthStore((state) => state.companyLogoFile)
  const setState = useAuthStore((state) => state.setState)

  /**
   * 이미지 미리보기 설정 (단일 파일)
   */
  const handleImagePreview = async () => {
    const files = companyLogoImageRef.current?.files

    if (files && files.length > 0) {
      const file = files[0] // 첫 번째 파일만 선택
      const reader = new FileReader()

      reader.onloadend = () => {
        // 기존 파일을 대체
        setState({
          companyLogoFile: {
            id: generateId(),
            name: file.name,
            size: file.size,
            url: reader.result,
          },
        })
      }
      reader.readAsDataURL(file)
    }
  }

  /**
   * 파일 삭제
   */
  const handleRemoveFile = () => {
    setState({
      companyLogoFile: undefined,
    })
  }

  return (
    <div className="gap-y-4xs flex flex-col">
      <div className="gap-x-5xs sub2 flex">
        회사 로고 업로드 <span className="text-conic-red-30">*</span>
      </div>
      <div onClick={() => companyLogoImageRef.current?.click()} className="relative">
        <div className="border-gray-20 pr-2xs flex h-[52px] w-full items-center justify-center gap-x-2 rounded-[12px] border bg-white pl-3">
          <UploadIcon width={20} height={20} />
          <p className="button text-gray5">파일 업로드</p>
        </div>
        <input
          type="file"
          id={'input-file'}
          ref={companyLogoImageRef}
          name="input-file"
          onChange={handleImagePreview}
          className="hidden"
        />
      </div>
      {companyLogoFile ? (
        <div className="flex flex-col gap-y-2">
          <UploadItem
            customClassName={'bg-white'}
            key={companyLogoFile.id}
            imageSize={formatFileSize(companyLogoFile.size)}
            ImageUrl={companyLogoFile.url}
            ImageUrlName={companyLogoFile.name}
            onRemove={() => handleRemoveFile()} // 삭제 기능 추가
          />
        </div>
      ) : url ? (
        <div className="flex flex-col gap-y-2">
          <DownloadItem customClassName={'bg-white'} key={url} ImageUrl={url} ImageUrlName={url} />
        </div>
      ) : null}
      <p className="body1 text-gray-50">5MB이하 파일(jpg, jpeg, png)만 가능합니다.</p>
    </div>
  )
}
