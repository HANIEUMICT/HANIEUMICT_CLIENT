import { UserDataType } from '@/type/common'
import { cookies } from 'next/headers'

export const getCookieUserData = async (): Promise<UserDataType | null> => {
  try {
    const cookieStore = await cookies()
    const userDataCookie = cookieStore.get('userData')

    if (!userDataCookie) return null

    const userDataString = userDataCookie.value
    return JSON.parse(userDataString) as UserDataType
  } catch (error) {
    console.error('userData 가져오기 실패:', error)
    return null
  }
}
