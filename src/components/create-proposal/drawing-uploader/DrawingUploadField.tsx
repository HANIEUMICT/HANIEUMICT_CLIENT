import { FileInfoType } from '@/type/common'
import { UploadIcon } from '@/assets/svgComponents'
import UploadItem from '@/components/common/UploadItem'
import { useProposalStore } from '@/store/proposalStore'
import { formatFileSize, generateId } from '@/utils/upload'
import { RefObject, useRef } from 'react'

interface DrawingUploadFieldProps {
  imgRef: RefObject<HTMLInputElement | null>
}

export default function DrawingUploadField({ imgRef }: DrawingUploadFieldProps) {
  const fileInfoList = useProposalStore((state) => state.fileInfoList)
  const setState = useProposalStore((state) => state.setState)

  /**
   * 이미지 미리보기 설정 (다중 파일)
   */
  const handleImagePreview = async () => {
    const files = imgRef.current?.files

    if (files && files.length > 0) {
      const newFileInfoList: FileInfoType[] = []

      // 각 파일에 대해 처리
      for (let i = 0; i < files.length; i++) {
        const file = files[i]
        const reader = new FileReader()

        await new Promise<void>((resolve) => {
          reader.onloadend = () => {
            newFileInfoList.push({
              id: generateId(),
              name: file.name,
              size: file.size,
              url: reader.result,
            })
            resolve()
          }
          reader.readAsDataURL(file)
        })
      }

      // 기존 파일 목록에 추가
      setState({
        fileInfoList: [...(fileInfoList || []), ...newFileInfoList],
      })
    }
  }

  /**
   * 파일 삭제
   */
  const handleRemoveFile = (fileId: string) => {
    setState({
      fileInfoList: (fileInfoList || []).filter((file) => file.id !== fileId),
    })
  }

  return (
    <section>
      <div className="gap-y-4xs flex flex-col">
        <p className="sub2">도면 업로드</p>
        <div onClick={() => imgRef.current?.click()} className="relative">
          <div className="border-gray-20 pr-2xs flex h-[52px] w-fit items-center gap-x-2 rounded-[12px] border pl-3">
            <UploadIcon width={20} height={20} />
            <p className="button text-gray5">파일 업로드</p>
          </div>
          <input
            type="file"
            id={'input-file'}
            ref={imgRef}
            name="input-file"
            onChange={handleImagePreview}
            className="hidden"
          />
        </div>
        {fileInfoList && fileInfoList.length > 0 ? (
          <div className="flex flex-col gap-y-2">
            {fileInfoList.map((fileInfo) => (
              <UploadItem
                key={fileInfo.id}
                imageSize={formatFileSize(fileInfo.size)}
                ImageUrl={fileInfo.url}
                ImageUrlName={fileInfo.name}
                onRemove={() => handleRemoveFile(fileInfo.id)} // 삭제 기능 추가
              />
            ))}
          </div>
        ) : (
          <p className="body1 text-conic-orange-40">
            도면 혹은 프로젝트를 제작하는 데 도움이 되는 파일을 모두 업로드해주세요
          </p>
        )}
      </div>
    </section>
  )
}
