/**
 * 파일 크기를 읽기 쉬운 형태로 변환
 */
export const formatFileSize = (bytes: number | undefined): string => {
  if (bytes === 0 || bytes === undefined) return '0 Bytes'

  const k = 1024
  const sizes = ['Bytes', 'KB', 'MB', 'GB']
  const i = Math.floor(Math.log(bytes) / Math.log(k))

  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i]
}

/**
 * 고유 ID 생성
 */
export const generateId = (): string => {
  return Date.now().toString() + Math.random().toString(36).substr(2, 9)
}
