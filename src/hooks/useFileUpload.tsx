import { FileInfoType } from '@/type/common'
import { postImageUrl } from '@/lib/common'

/**
 * 사용자 prefix 가져오기
 * - 로그인한 경우: memberId
 * - 비로그인한 경우: 'guest' + sessionId 또는 UUID
 */
const getUserPrefix = (): string => {
  // 로그인한 사용자
  const userDataString = localStorage.getItem('userData')
  if (userDataString) {
    try {
      const userData = JSON.parse(userDataString)
      return userData.memberId
    } catch (error) {
      console.error('사용자 데이터 파싱 실패:', error)
    }
  }

  // 비로그인 사용자 - sessionStorage에서 세션 ID 가져오기
  let sessionId = sessionStorage.getItem('guestSessionId')

  if (!sessionId) {
    // 세션 ID가 없으면 생성 (UUID 또는 타임스탬프 기반)
    sessionId = `guest_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`
    sessionStorage.setItem('guestSessionId', sessionId)
  }

  return sessionId
}

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
 * 업로드 후 처리 콜백 타입
 */
export type UploadCallback = (objectUrl: string, fileInfo: FileInfoType) => Promise<boolean>

/**
 * 단일 파일 업로드 처리
 */
const uploadSingleFile = async (
  fileInfo: FileInfoType,
  onUploadComplete?: UploadCallback
): Promise<{ success: boolean; objectUrl?: string }> => {
  try {
    const prefix = getUserPrefix()

    // 1. presigned URL 요청
    const presignedResponse = await postImageUrl({
      prefix,
      originalFilename: fileInfo.name,
    })

    if (presignedResponse.result !== 'SUCCESS' || !presignedResponse.data) {
      console.error('Presigned URL 생성 실패:', presignedResponse.error)
      return { success: false }
    }

    const { preSignedUrl, objectUrl } = presignedResponse.data
    console.log('preSignedUrl', preSignedUrl)
    console.log('objectUrl', objectUrl)

    // 2. 파일을 S3에 업로드
    const file = dataURLToFile(fileInfo.url, fileInfo.name)
    if (!file) {
      console.error('파일 변환 실패:', fileInfo.name)
      return { success: false }
    }

    const uploadResponse = await fetch(preSignedUrl, {
      method: 'PUT',
      body: file,
    })

    if (!uploadResponse.ok) {
      console.error('S3 파일 업로드 실패:', fileInfo.name)
      return { success: false }
    }

    // 3. 업로드 완료 후 콜백 실행 (옵셔널)
    if (onUploadComplete) {
      const callbackSuccess = await onUploadComplete(objectUrl, fileInfo)
      if (!callbackSuccess) {
        return { success: false, objectUrl }
      }
    }

    console.log('파일 업로드 성공:', fileInfo.name)
    return { success: true, objectUrl }
  } catch (error) {
    console.error('파일 업로드 중 오류:', error)
    return { success: false }
  }
}

/**
 * 파일 업로드 처리 (단일 파일 또는 파일 리스트)
 */
export const uploadFiles = async (
  files?: FileInfoType | FileInfoType[],
  onUploadComplete?: UploadCallback
): Promise<{ success: boolean; uploadedUrls: string[] }> => {
  try {
    // files가 undefined인 경우 조기 반환
    if (!files) {
      console.log('업로드할 파일이 없습니다.')
      return { success: true, uploadedUrls: [] }
    }

    // 단일 파일을 배열로 변환
    const fileList = Array.isArray(files) ? files : [files]

    // 빈 배열 체크
    if (fileList.length === 0) {
      console.log('업로드할 파일이 없습니다.')
      return { success: true, uploadedUrls: [] }
    }

    // undefined 필터링
    const validFileList = fileList.filter((file): file is FileInfoType => file !== undefined)

    if (validFileList.length === 0) {
      console.log('유효한 파일이 없습니다.')
      return { success: true, uploadedUrls: [] }
    }

    // 모든 파일을 병렬로 업로드
    const uploadPromises = validFileList.map((fileInfo) => uploadSingleFile(fileInfo, onUploadComplete))

    const results = await Promise.all(uploadPromises)
    const successResults = results.filter((result) => result.success)
    const uploadedUrls = successResults.map((result) => result.objectUrl).filter((url): url is string => !!url)

    console.log(`파일 업로드 완료: ${successResults.length}/${validFileList.length}`)
    return {
      success: successResults.length === validFileList.length,
      uploadedUrls,
    }
  } catch (error) {
    console.error('파일 업로드 처리 중 오류:', error)
    return { success: false, uploadedUrls: [] }
  }
}

/**
 * 컴포넌트에서 사용할 훅
 */
export const useFileUpload = () => {
  const handleUploadFiles = async (files?: FileInfoType | FileInfoType[], onUploadComplete?: UploadCallback) => {
    return await uploadFiles(files, onUploadComplete)
  }

  return {
    uploadFiles: handleUploadFiles,
  }
}
