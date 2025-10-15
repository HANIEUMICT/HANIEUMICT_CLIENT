import Image from 'next/image'
import { useEffect, useState } from 'react'
import { DownloadIcon, ImgUploadIcon } from '@/assets/svgComponents'

interface DownloadItemProps {
  ImageUrl: string | ArrayBuffer | null
  ImageUrlName: string
  customClassName?: string
}

export default function DownloadItem({ ImageUrl, ImageUrlName, customClassName }: DownloadItemProps) {
  // 이미지 로드 에러 상태 관리
  const [imageError, setImageError] = useState(false)

  // ImageUrl이 변경될 때마다 에러 상태 초기화
  useEffect(() => {
    setImageError(false)
  }, [ImageUrl])

  /**
   * 이미지 URL을 로컬에 다운로드
   * @param imageUrl - 다운로드할 이미지 URL
   * @param filename - 저장할 파일명 (선택사항)
   */
  const downloadImage = async (imageUrl: string, filename?: string): Promise<void> => {
    try {
      // 1. 이미지 데이터 가져오기
      const response = await fetch(imageUrl)

      if (!response.ok) {
        throw new Error(`다운로드 실패: ${response.status} ${response.statusText}`)
      }

      // 2. Blob으로 변환
      const blob = await response.blob()

      // 3. 파일명 설정 (제공되지 않으면 URL에서 추출)
      const finalFilename = filename || extractFileNameFromUrl(imageUrl)

      // 4. 다운로드 실행
      const url = window.URL.createObjectURL(blob)
      const link = document.createElement('a')
      link.href = url
      link.download = finalFilename

      // DOM에 추가하고 클릭 후 제거
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)

      // 메모리 해제
      window.URL.revokeObjectURL(url)

      console.log(`다운로드 완료: ${finalFilename}`)
    } catch (error) {
      console.error('다운로드 실패:', error)
      throw error
    }
  }

  /**
   * URL에서 파일명 추출
   */
  const extractFileNameFromUrl = (url: string): string => {
    try {
      const pathname = new URL(url).pathname
      const fileName = pathname.split('/').pop() || 'download.jpg'
      return decodeURIComponent(fileName)
    } catch {
      return 'download.jpg'
    }
  }

  const handleDownload = async () => {
    try {
      if (typeof ImageUrl === 'string') {
        await downloadImage(ImageUrl, ImageUrlName)
      }
    } catch (error) {
      alert('다운로드에 실패했습니다.')
    }
  }

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

  return (
    <div
      className={`${customClassName} border-gray-20 flex h-[80px] items-center justify-between rounded-[16px] border px-5`}
    >
      {/* 왼쪽 영역: 이미지 + 텍스트 */}
      <div className="flex min-w-0 flex-1 items-center gap-x-2">
        {/* 이미지 영역 */}
        {imageSrc && !imageError ? (
          <div className="relative h-[44px] w-[44px] flex-shrink-0">
            <Image
              alt={ImageUrlName}
              src={imageSrc}
              fill
              className="rounded-[3px] object-cover"
              onError={() => setImageError(true)}
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
        </div>
      </div>

      {/* 다운로드 버튼 */}
      <DownloadIcon className="ml-2 flex-shrink-0 cursor-pointer" onClick={handleDownload} width={20} height={20} />
    </div>
  )
}
