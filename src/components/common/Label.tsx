import { ReactNode } from 'react'
import { twMerge } from 'tailwind-merge'

interface LabelProps {
  type?: 'h2' | 'sub'
  className?: string
  isRequired?: boolean
  rightElement?: ReactNode
  label: string
  labelColor?: string // text-[]
}
const labelType = {
  h2: 'h2 text-black',
  sub: 'sub text-black',
}

export default function Label({
  className,
  rightElement,
  isRequired,
  label,
  type = 'h2',
  labelColor = 'text-black',
}: LabelProps) {
  return (
    <div className="flex items-center justify-between">
      <div className={`${className} flex gap-x-1`}>
        <h1 className={twMerge(labelType[type], labelColor)}>{label}</h1>
        {isRequired && <p className="text-conic-red-30 sub2">*</p>}
      </div>

      {rightElement && rightElement}
    </div>
  )
}
