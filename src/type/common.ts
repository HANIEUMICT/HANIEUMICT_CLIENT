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
  memberRole: 'INDIVIDUAL' | 'OWNER'
}

export interface FileInfoType {
  name: string
  size: number
  url: string | ArrayBuffer | null
  id: string // 고유 식별자 추가
}

export interface PaginationResultType<T> {
  content: T[]
  pageable: {
    pageNumber: number
    pageSize: number
    sort: [
      {
        direction: string
        property: string
        ignoreCase: boolean
        nullHandling: string
        descending: boolean
        ascending: boolean
      },
    ]
    offset: number
    paged: boolean
    unpaged: boolean
  }
  totalElements: number
  totalPages: number
  last: boolean
  numberOfElements: number
  size: number
  number: number
  sort: [
    {
      direction: string
      property: string
      ignoreCase: boolean
      nullHandling: string
      descending: boolean
      ascending: boolean
    },
  ]
  first: boolean
  empty: boolean
}

export interface AddressRegisterRequestType {
  postalCode?: string
  streetAddress?: string
  detailAddress?: string
}
