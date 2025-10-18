// src/components/common/Pagination.tsx
'use client'

import React from 'react'
import Link from 'next/link'
import { useSearchParams } from 'next/navigation'
import {
  Gray2LeftArrowIcon,
  Gray2RightArrowIcon,
  Gray4LeftArrowIcon,
  Gray4RightArrowIcon,
} from '@/assets/svgComponents'

interface PaginationProps {
  currentPage: number
  totalPages: number
  showPages?: number
  baseUrl?: string // 페이지네이션이 적용될 기본 URL
}

const Pagination: React.FC<PaginationProps> = ({ currentPage, totalPages, showPages = 5, baseUrl = '/' }) => {
  const searchParams = useSearchParams()

  // 현재 페이지 그룹의 시작 페이지 계산
  const getPageGroup = (page: number) => {
    return Math.floor((page - 1) / showPages) * showPages + 1
  }

  const startPage = getPageGroup(currentPage)
  const endPage = Math.min(startPage + showPages - 1, totalPages)

  // 페이지 번호 배열 생성
  const pageNumbers = Array.from({ length: endPage - startPage + 1 }, (_, i) => startPage + i)

  // URL 생성 함수
  const createPageUrl = (page: number) => {
    const params = new URLSearchParams(searchParams)
    params.set('page', page.toString())
    return `${baseUrl}?${params.toString()}`
  }

  // 이전 페이지 버튼
  const PrevButton = () => {
    const isDisabled = currentPage === 1

    if (isDisabled) {
      return (
        <button
          disabled
          className="flex h-[32px] w-[32px] cursor-not-allowed items-center justify-center text-gray-400"
          aria-label="이전 페이지"
        >
          <Gray2LeftArrowIcon width={24} height={24} />
        </button>
      )
    }

    return (
      <Link
        href={createPageUrl(currentPage - 1)}
        className="flex h-[32px] w-[32px] items-center justify-center transition-opacity hover:opacity-70"
        aria-label="이전 페이지"
      >
        <Gray4LeftArrowIcon width={24} height={24} />
      </Link>
    )
  }

  // 다음 페이지 버튼
  const NextButton = () => {
    const isDisabled = currentPage === totalPages

    if (isDisabled) {
      return (
        <button
          disabled
          className="flex h-[32px] w-[32px] cursor-not-allowed items-center justify-center text-gray-400"
          aria-label="다음 페이지"
        >
          <Gray2RightArrowIcon width={24} height={24} />
        </button>
      )
    }

    return (
      <Link
        href={createPageUrl(currentPage + 1)}
        className="flex h-[32px] w-[32px] items-center justify-center transition-opacity hover:opacity-70"
        aria-label="다음 페이지"
      >
        <Gray4RightArrowIcon width={7} height={16} />
      </Link>
    )
  }

  if (totalPages <= 1) return null

  return (
    <nav className="flex items-center justify-center gap-1" aria-label="페이지네이션">
      {/* 이전 버튼 */}
      <PrevButton />

      {/* 페이지 번호 버튼들 */}
      {pageNumbers.map((page) => {
        const isCurrentPage = page === currentPage

        return (
          <Link
            key={page}
            href={createPageUrl(page)}
            className={`flex h-[32px] min-w-[32px] items-center justify-center rounded-[12px] transition-colors duration-200 ${
              isCurrentPage
                ? 'bg-conic-orange-30 border-conic-orange-30 border text-white'
                : 'text-gray-40 hover:bg-gray-20 border-gray-10 border bg-white'
            }`}
            aria-label={`페이지 ${page}`}
            aria-current={isCurrentPage ? 'page' : undefined}
          >
            {page}
          </Link>
        )
      })}

      {/* 다음 버튼 */}
      <NextButton />
    </nav>
  )
}

export default Pagination
