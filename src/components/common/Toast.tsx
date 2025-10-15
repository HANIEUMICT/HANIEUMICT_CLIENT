'use client'

import { useEffect, useState } from 'react'
import { CancelIcon } from '@/assets/svgComponents'

interface ToastProps {
  message: string
  type: 'success' | 'error'
  onClose: () => void
  duration?: number // 밀리초 단위 (기본값: 2000ms)
}

export default function Toast({ message, type, onClose, duration = 2000 }: ToastProps) {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    // 마운트 시 애니메이션을 위해 약간의 딜레이 후 표시
    const showTimer = setTimeout(() => {
      setIsVisible(true)
    }, 10)

    // duration 후 사라지는 애니메이션 시작
    const hideTimer = setTimeout(() => {
      setIsVisible(false)
    }, duration)

    // 애니메이션 완료 후 완전히 제거
    const removeTimer = setTimeout(() => {
      onClose()
    }, duration + 300) // 애니메이션 시간 300ms 추가

    return () => {
      clearTimeout(showTimer)
      clearTimeout(hideTimer)
      clearTimeout(removeTimer)
    }
  }, [duration, onClose])

  // 스타일 설정
  const typeStyles = {
    success: {
      bg: 'bg-green-50',
      border: 'border-green-500',
      text: 'text-green-800',
      icon: <CancelIcon className="h-5 w-5 text-green-500" />,
    },
    error: {
      bg: 'bg-red-50',
      border: 'border-red-500',
      text: 'text-red-800',
      icon: <CancelIcon className="h-5 w-5 text-red-500" />,
    },
  }

  const styles = typeStyles[type]

  return (
    <div
      className={`fixed top-5 right-5 z-50 flex items-center gap-x-3 rounded-lg border-l-4 px-4 py-3 shadow-lg transition-all duration-300 ease-in-out ${styles.bg} ${styles.border} ${isVisible ? 'translate-x-0 opacity-100' : 'translate-x-full opacity-0'} `}
    >
      {/* 아이콘 */}
      <div className="flex-shrink-0">{styles.icon}</div>

      {/* 메시지 */}
      <p className={`text-sm font-medium ${styles.text}`}>{message}</p>

      {/* 닫기 버튼 (선택사항) */}
      <button
        onClick={() => {
          setIsVisible(false)
          setTimeout(onClose, 300)
        }}
        className={`ml-2 flex-shrink-0 ${styles.text} transition-opacity hover:opacity-70`}
      >
        <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 20 20">
          <path
            fillRule="evenodd"
            d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
            clipRule="evenodd"
          />
        </svg>
      </button>
    </div>
  )
}
