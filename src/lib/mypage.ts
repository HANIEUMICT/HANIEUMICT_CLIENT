import { ApiResponse, PaginationResultType } from '@/type/common'
import { AddressResponseType, AddressType } from '@/type/mypage'
import { authorizedFetch } from '@/lib/common'

/**
 * 비밀번호 확인
 */
export const postMemberPassword = async (currentPassword: string): Promise<ApiResponse<string>> => {
  const response = await authorizedFetch(`${process.env.NEXT_PUBLIC_BASE_URL}/v1/member/password`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ currentPassword: currentPassword }),
  })
  return await response.json()
}

/**
 * 회원정보 수정
 */
export const patchMemberProfile = async ({
  name,
  newPassword,
  newPhoneNumber,
}: {
  name?: string
  newPhoneNumber?: string
  newPassword?: string
}): Promise<ApiResponse<string>> => {
  const response = await authorizedFetch(`${process.env.NEXT_PUBLIC_BASE_URL}/v1/member/profile`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ name: name, newPassword: newPassword, newPhoneNumber: newPhoneNumber }),
  })
  return await response.json()
}

/**
 * 주소 추가
 */
export const patchMemberAddresses = async (data: AddressType): Promise<ApiResponse<string>> => {
  const response = await authorizedFetch(`${process.env.NEXT_PUBLIC_BASE_URL}/v1/member/addresses`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  })
  return await response.json()
}

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
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
  })
  return await response.json()
}
