import { ApiResponse, PaginationResultType } from '@/type/common'
import { AddressResponseType, AddressType, MemberInfoType } from '@/type/mypage'
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
 * 휴대폰 인증번호 전송 API
 */
export const postSMS = async (phoneNumber: string): Promise<ApiResponse<void>> => {
  const response = await authorizedFetch(`${process.env.NEXT_PUBLIC_BASE_URL}/v1/sms`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ phoneNumber: phoneNumber }),
  })
  return await response.json()
}

/**
 * 휴대폰 인증번호 검증 API
 */
export const postSMSCertificate = async (phoneNumber: string, authCode: string): Promise<ApiResponse<void>> => {
  const response = await authorizedFetch(`${process.env.NEXT_PUBLIC_BASE_URL}/v1/sms/certificate`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ phoneNumber: phoneNumber, authCode: authCode }),
  })
  return await response.json()
}

/**
 * 회원정보 조회
 */
export const getMemberInfo = async (): Promise<ApiResponse<MemberInfoType>> => {
  const response = await authorizedFetch(`${process.env.NEXT_PUBLIC_BASE_URL}/v1/member/me`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
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
 * 회원 정보 - 이메일 혜택/이벤트 정보 알림 수신 동의 여부 수정
 */
export const patchMemberMeEmailMarketingConsent = async (
  isEmailMarketingAgreed: boolean
): Promise<ApiResponse<string>> => {
  const response = await authorizedFetch(`${process.env.NEXT_PUBLIC_BASE_URL}/v1/member/profile`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ isEmailMarketingAgreed: isEmailMarketingAgreed }),
  })
  return await response.json()
}

/**
 * 회원 정보 - 전화번호 혜택/이벤트 정보 알림 수신 동의 여부 수정
 */
export const patchMemberMeSMSMarketingConsent = async (
  isEmailMarketingAgreed: boolean
): Promise<ApiResponse<string>> => {
  const response = await authorizedFetch(`${process.env.NEXT_PUBLIC_BASE_URL}/v1/member/profile`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ isEmailMarketingAgreed: isEmailMarketingAgreed }),
  })
  return await response.json()
}

/**
 * 회원 정보 - 이름 수정
 */
export const patchMemberMeName = async (name: string): Promise<ApiResponse<string>> => {
  const response = await authorizedFetch(`${process.env.NEXT_PUBLIC_BASE_URL}/v1/member/me/name`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ name: name }),
  })
  return await response.json()
}

/**
 * 회원 정보 - 전화번호 수정
 */
export const patchMemberMePhoneNumber = async (newPhoneNumber: string): Promise<ApiResponse<string>> => {
  const response = await authorizedFetch(`${process.env.NEXT_PUBLIC_BASE_URL}/v1/member/me/phone-number`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ newPhoneNumber: newPhoneNumber }),
  })
  return await response.json()
}

/**
 * 회원 정보 - 비밀번호 수정
 */
export const patchMemberMePassword = async (
  currentPassword: string,
  newPassword: string
): Promise<ApiResponse<string>> => {
  const response = await authorizedFetch(`${process.env.NEXT_PUBLIC_BASE_URL}/v1/member/me/password`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ currentPassword: currentPassword, newPassword: newPassword }),
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
