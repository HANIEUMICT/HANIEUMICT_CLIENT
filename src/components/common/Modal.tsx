import { ReactNode } from 'react'

export default function Modal({children}: {children: ReactNode}) {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-[rgba(0,0,0,0.3)] z-50">
      <section className="flex flex-col gap-y-s bg-white rounded-[32px] p-l w-[600px]">
        {children}
      </section>
    </div>
  )
}

function Content({children}: {children: ReactNode}) {
  return (
    <>
      {children}
    </>
  )
}

function BottomButton({children}: {children: ReactNode}) {
  return (
    <>
      {children}
    </>
  )
}

Modal.BottomButton = BottomButton
Modal.Content = Content
