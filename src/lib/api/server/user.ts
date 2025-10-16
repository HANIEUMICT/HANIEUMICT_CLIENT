import { ApiResponse } from '@/type/common'
import { MemberInfoType } from '@/type/mypage'
import { serverAuthorizedFetch } from '@/lib/utils/http'

export const getMemberInfo = async (): Promise<ApiResponse<MemberInfoType>> => {
  const response = await serverAuthorizedFetch(`${process.env.NEXT_PUBLIC_BASE_URL}/v1/member/me`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
  return await response.json()
}
