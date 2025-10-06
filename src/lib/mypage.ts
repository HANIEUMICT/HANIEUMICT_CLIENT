import { ApiResponse, PaginationResultType } from '@/type/common'
import { AddressResponseType } from '../type/mypage'
import { authorizedFetch } from '@/lib/common'

/**
 * 내 주소를 불러오는 api
 */
export const getAddressList = async (
  page: number,
  size: number
): Promise<ApiResponse<PaginationResultType<AddressResponseType>>> => {
  const response = await authorizedFetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/v1/member/me/addresses?page=${page}&size=${size}&sort=createdAt,DESC`,
    {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    }
  )
  return await response.json()
}

/**
 * 내 주소 삭제하는 api
 */
export const deleteAddress = async (
  addressId: number
): Promise<ApiResponse<PaginationResultType<AddressResponseType>>> => {
  const response = await authorizedFetch(`${process.env.NEXT_PUBLIC_BASE_URL}/v1/member/addresses/${addressId}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
  return await response.json()
}
