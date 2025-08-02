import Image from 'next/image'
import { DownloadIcon } from '@/assets/svgComponents'

interface DownloadItemProps {
  ImageUrl: string
  ImageUrlName: string
  customClassName?: string
}
export default function DownloadItem({ ImageUrl, ImageUrlName, customClassName }: DownloadItemProps) {
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
   * URL에서 파일명 추출 (이전에 만든 함수 활용)
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
      await downloadImage(ImageUrl, ImageUrlName)
    } catch (error) {
      alert('다운로드에 실패했습니다.')
    }
  }
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
        </div>
      </div>
      <DownloadIcon onClick={handleDownload} width={20} height={20} />
    </div>
  )
}
