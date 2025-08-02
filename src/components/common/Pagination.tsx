import React from 'react'
import {
  Gray2LeftArrowIcon,
  Gray2RightArrowIcon,
  Gray4LeftArrowIcon,
  Gray4RightArrowIcon,
  LeftIcon,
  RightIcon,
} from '@/assets/svgComponents'

interface PaginationProps {
  currentPage: number
  totalPages: number
  onPageChange: (page: number) => void
  showPages?: number // 한 번에 보여줄 페이지 수 (기본값: 5)
}

const Pagination: React.FC<PaginationProps> = ({ currentPage, totalPages, onPageChange, showPages = 5 }) => {
  // 현재 페이지 그룹의 시작 페이지 계산
  const getPageGroup = (page: number) => {
    return Math.floor((page - 1) / showPages) * showPages + 1
  }

  const startPage = getPageGroup(currentPage)
  const endPage = Math.min(startPage + showPages - 1, totalPages)

  // 페이지 번호 배열 생성
  const pageNumbers = Array.from({ length: endPage - startPage + 1 }, (_, i) => startPage + i)

  const handlePrevious = () => {
    if (currentPage > 1) {
      onPageChange(currentPage - 1)
    }
  }

  const handleNext = () => {
    if (currentPage < totalPages) {
      onPageChange(currentPage + 1)
    }
  }

  const handlePageClick = (page: number) => {
    onPageChange(page)
  }

  return (
    <nav className="flex items-center justify-center gap-1" aria-label="페이지네이션">
      {/* 이전 버튼 */}

      <button
        onClick={handlePrevious}
        disabled={currentPage === 1}
        className={`flex items-center justify-center ${currentPage === 1 ? 'cursor-not-allowed text-gray-400' : ''} h-[32px] w-[32px]`}
        aria-label="이전 페이지"
      >
        {currentPage === 1 ? (
          <Gray2LeftArrowIcon width={24} height={24} />
        ) : (
          <Gray4LeftArrowIcon width={24} height={24} />
        )}
      </button>

      {/* 페이지 번호 버튼들 */}
      {pageNumbers.map((page) => (
        <button
          key={page}
          onClick={() => handlePageClick(page)}
          className={`bg-conic-orange-30 flex h-[32px] min-w-[32px] items-center justify-center rounded-[12px] transition-colors duration-200 ${
            page === currentPage ? 'border-conic-orange-30 bg-conic-orange-30 text-white' : 'hover:bg-gray-20 bg-white'
          } `}
          aria-label={`페이지 ${page}`}
          aria-current={page === currentPage ? 'page' : undefined}
        >
          {page}
        </button>
      ))}

      {/* 다음 버튼 */}
      <button
        onClick={handleNext}
        disabled={currentPage === totalPages}
        className={`flex h-[32px] w-[32px] items-center justify-center ${currentPage === totalPages ? 'cursor-not-allowed' : ''}`}
        aria-label="다음 페이지"
      >
        {currentPage === totalPages ? (
          <Gray2RightArrowIcon width={24} height={24} />
        ) : (
          <Gray4RightArrowIcon width={7} height={16} />
        )}
      </button>
    </nav>
  )
}
export default Pagination
