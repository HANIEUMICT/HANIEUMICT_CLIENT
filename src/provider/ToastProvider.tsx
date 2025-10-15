'use client'

import { createContext, useContext, useState, useEffect, ReactNode } from 'react'

// Toast 타입 정의
interface ToastData {
  id: number
  message: string
  type: 'success' | 'error'
}

interface ToastContextType {
  showToast: (message: string, type: 'success' | 'error') => void
}

// Context 생성
const ToastContext = createContext<ToastContextType | undefined>(undefined)

// Custom Hook
export function useToast() {
  const context = useContext(ToastContext)
  if (!context) {
    throw new Error('useToast must be used within ToastProvider')
  }
  return context
}

// Toast 컴포넌트 (내부용)
function Toast({
  message,
  type,
  onClose,
  duration = 3000,
}: {
  message: string
  type: 'success' | 'error'
  onClose: () => void
  duration?: number
}) {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    // 마운트 시 애니메이션
    const showTimer = setTimeout(() => {
      setIsVisible(true)
    }, 10)

    // duration 후 사라지는 애니메이션
    const hideTimer = setTimeout(() => {
      setIsVisible(false)
    }, duration)

    // 애니메이션 완료 후 완전히 제거
    const removeTimer = setTimeout(() => {
      onClose()
    }, duration + 300)

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
      icon: '✅',
    },
    error: {
      bg: 'bg-red-50',
      border: 'border-red-500',
      text: 'text-red-800',
      icon: '❌',
    },
  }

  const styles = typeStyles[type]

  return (
    <div
      className={`flex min-w-[300px] items-center gap-x-3 rounded-lg border-l-4 px-4 py-3 shadow-lg transition-all duration-300 ease-in-out ${styles.bg} ${styles.border} ${isVisible ? 'translate-x-0 opacity-100' : 'translate-x-full opacity-0'} `}
    >
      {/* 아이콘 */}
      <span className="flex-shrink-0 text-xl">{styles.icon}</span>

      {/* 메시지 */}
      <p className={`text-sm font-medium ${styles.text} flex-1`}>{message}</p>

      {/* 닫기 버튼 */}
      <button
        onClick={() => {
          setIsVisible(false)
          setTimeout(onClose, 300)
        }}
        className={`flex-shrink-0 ${styles.text} transition-opacity hover:opacity-70`}
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

// Provider 컴포넌트
export function ToastProvider({ children }: { children: ReactNode }) {
  const [toasts, setToasts] = useState<ToastData[]>([])

  const showToast = (message: string, type: 'success' | 'error') => {
    const id = Date.now()
    setToasts((prev) => [...prev, { id, message, type }])
  }

  const removeToast = (id: number) => {
    setToasts((prev) => prev.filter((toast) => toast.id !== id))
  }

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      {/* Toast 렌더링 영역 */}
      <div className="fixed top-5 right-5 z-50 flex flex-col gap-y-2">
        {toasts.map((toast) => (
          <Toast key={toast.id} message={toast.message} type={toast.type} onClose={() => removeToast(toast.id)} />
        ))}
      </div>
    </ToastContext.Provider>
  )
}
