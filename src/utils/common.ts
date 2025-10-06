import { UserDataType } from '@/type/common'

export const getUserData = (): UserDataType | null => {
  try {
    const userDataString = localStorage.getItem('userData')
    if (!userDataString) return null

    return JSON.parse(userDataString)
  } catch (error) {
    console.error('userData 가져오기 실패:', error)
    return null
  }
}
