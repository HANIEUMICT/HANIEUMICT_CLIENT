import { useProjectStore } from '@/store/projectStore'
import { postProjectImageUpload } from '@/lib/project'
import { FileInfoType } from '@/type/common'
import { postImageUrl } from '@/lib/common'

/**
 * base64 URL을 File 객체로 변환
 */
const dataURLToFile = (dataURL: string | ArrayBuffer | null, filename: string): File | null => {
  if (typeof dataURL !== 'string') return null

  const arr = dataURL.split(',')
  const mime = arr[0].match(/:(.*?);/)?.[1]
  const bstr = atob(arr[1])
  let n = bstr.length
  const u8arr = new Uint8Array(n)

  while (n--) {
    u8arr[n] = bstr.charCodeAt(n)
  }

  return new File([u8arr], filename, { type: mime })
}

/**
 * 단일 파일 업로드 처리
 */
const uploadSingleFile = async (fileInfo: FileInfoType, memberId: string, projectId: number): Promise<boolean> => {
  try {
    // 1. presigned URL 요청
    const presignedResponse = await postImageUrl({
      prefix: memberId,
      originalFilename: fileInfo.name,
    })

    if (presignedResponse.result !== 'SUCCESS' || !presignedResponse.data) {
      console.error('Presigned URL 생성 실패:', presignedResponse.error)
      return false
    }

    const { preSignedUrl, objectUrl } = presignedResponse.data
    console.log('preSignedUrl', preSignedUrl)
    console.log('objectUrl', objectUrl)

    // 2. 파일을 S3에 업로드
    const file = dataURLToFile(fileInfo.url, fileInfo.name)
    if (!file) {
      console.error('파일 변환 실패:', fileInfo.name)
      return false
    }

    const formData = new FormData()
    formData.append('file', file)

    const uploadResponse = await fetch(preSignedUrl, {
      method: 'PUT',
      body: file, // S3 presigned URL은 보통 파일을 직접 PUT
    })

    if (!uploadResponse.ok) {
      console.error('S3 파일 업로드 실패:', fileInfo.name)
      return false
    }

    // 3. 프로젝트 이미지 등록
    const projectImageResponse = await postProjectImageUpload(parseInt(memberId), {
      projectId,
      drawingUrl: objectUrl,
    })

    if (projectImageResponse.result !== 'SUCCESS') {
      console.error('프로젝트 이미지 등록 실패:', projectImageResponse.error)
      return false
    }

    console.log('파일 업로드 성공:', fileInfo.name)
    return true
  } catch (error) {
    console.error('파일 업로드 중 오류:', error)
    return false
  }
}

/**
 * 모든 파일 업로드 처리
 */
export const uploadAllFiles = async (projectId: number): Promise<boolean> => {
  try {
    // localStorage에서 사용자 정보 가져오기
    const userDataString = localStorage.getItem('userData')
    if (!userDataString) {
      console.error('사용자 정보가 없습니다.')
      return false
    }

    const userData = JSON.parse(userDataString)
    const memberId = userData.memberId

    // fileInfoList 가져오기
    const fileInfoList = useProjectStore.getState().fileInfoList
    if (!fileInfoList || fileInfoList.length === 0) {
      console.log('업로드할 파일이 없습니다.')
      return true
    }

    // 모든 파일을 병렬로 업로드
    const uploadPromises = fileInfoList.map((fileInfo) => uploadSingleFile(fileInfo, memberId, projectId))

    const results = await Promise.all(uploadPromises)
    const successCount = results.filter((result) => result).length

    console.log(`파일 업로드 완료: ${successCount}/${fileInfoList.length}`)
    return successCount === fileInfoList.length
  } catch (error) {
    console.error('파일 업로드 처리 중 오류:', error)
    return false
  }
}

/**
 * 컴포넌트에서 사용할 훅
 */
export const useFileUpload = () => {
  const fileInfoList = useProjectStore((state) => state.fileInfoList)

  const handleUploadFiles = async (projectId: number) => {
    const success = await uploadAllFiles(projectId)
    if (success) {
      // 업로드 성공 시 파일 목록 초기화 (선택사항)
      // useProjectStore.getState().setState({ fileInfoList: [] })
    }
    return success
  }

  return {
    fileInfoList,
    uploadFiles: handleUploadFiles,
  }
}
