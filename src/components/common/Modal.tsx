'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { ReactNode } from 'react'

interface ModalProps {
  children: ReactNode
  customClassName?: string
  isOpen?: boolean // 애니메이션 제어용 (선택사항)
}

export default function Modal({ children, customClassName, isOpen = true }: ModalProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="fixed inset-0 z-60 flex items-center justify-center bg-[rgba(0,0,0,0.3)]"
        >
          <motion.section
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 100, opacity: 0 }}
            transition={{
              type: 'spring',
              damping: 25,
              stiffness: 300,
            }}
            className={`${customClassName} gap-y-s p-l flex w-[600px] flex-col rounded-[32px] bg-white`}
          >
            {children}
          </motion.section>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

function Content({ children }: { children: ReactNode }) {
  return <>{children}</>
}

function BottomButton({ children }: { children: ReactNode }) {
  return <>{children}</>
}

Modal.BottomButton = BottomButton
Modal.Content = Content
