export interface ApiResponse<T> {
  result: string
  data?: T
  error: {
    code: string
    message: string
  }
}
export interface UserDataType {
  memberId: number
  memberName: string
}

export interface FileInfoType {
  name: string
  size: number
  url: string | ArrayBuffer | null
  id: string // 고유 식별자 추가
}
