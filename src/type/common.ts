export interface ApiResponse<T> {
  result: string
  data?: T
  error: {
    code: string
    message: string
  }
}
