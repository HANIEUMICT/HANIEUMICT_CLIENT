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
}
