import { ReactNode } from 'react'

const variantStyles = {
  primary: {
    default: 'bg-conic-red-30 text-white',
    hover: 'bg-conic-red-30 hover:bg-conic-red-40 text-white',
    click: 'bg-conic-red-30 hover:bg-conic-red-40 active:bg-conic-red-50 text-white',
    disabled: 'bg-gray-20 text-gray-40 cursor-not-allowed',
  },
  secondary: {
    default: 'bg-conic-orange-30 text-white',
    hover: 'bg-conic-orange-30 hover:bg-conic-orange-40 text-white',
    click: 'bg-conic-orange-30 hover:bg-conic-orange-40 active:bg-conic-orange-50 text-white',
    disabled: 'bg-gray-20 text-gray-40 cursor-not-allowed',
  },
  outline: {
    default: 'bg-white border border-gray-20 text-gray-50',
    hover: 'bg-white border border-gray-20 hover:border-gray-40 text-gray-50',
    click: 'bg-white border border-gray-50 hover:border-gray-40 hover:border-gray-50 text-gray-50',
    disabled: 'bg-white border border-gray-20 text-gray-30 cursor-not-allowed',
  },
  outline2: {
    default: 'bg-white border border-gray-20 text-conic-orange-30',
    hover: 'bg-white border border-gray-20 hover:border-gray-30 hover:text-conic-orange-40 text-conic-orange-30',
    click:
      'bg-white border border-gray-20 hover:border-gray-30 hover:text-conic-orange-40 active:text-conic-orange-50 active:border-gray-40 text-conic-orange-30',
    disabled: 'bg-gray-20 border border-gray-40 text-gray-40 cursor-not-allowed',
  },
  ghost: {
    default: 'bg-transparent text-gray-50',
    hover: 'hover:bg-gray-20 text-gray-50',
    click: 'hover:bg-gray-20 active:bg-gray-40 text-gray-50',
    disabled: 'bg-transparent text-gray-30 cursor-not-allowed',
  },
}
const sizeStyles = {
  lg: 'button-lg p-2xs rounded-[16px]',
  md: 'button-lg py-3xs px-2xs rounded-[12px]',
  sm: 'button-sm py-3xs px-2xs rounded-[12px]',
}

export interface Button1Props {
  styleType?: 'primary' | 'secondary' | 'outline' | 'outline2' | 'ghost'
  styleStatus?: 'default' | 'hover' | 'click' | 'disabled'
  styleSize?: 'lg' | 'md' | 'sm'
  children: ReactNode
  customClassName?: string
  onClick: () => void
  buttonType?: 'button' | 'submit'
  disabled?: boolean
  rightIcon?: ReactNode
  leftIcon?: ReactNode
}

const Button1 = ({
  styleType = 'outline2',
  styleStatus = 'default',
  styleSize = 'md',
  children,
  customClassName,
  onClick,
  buttonType = 'button',
  disabled = false,
  rightIcon,
  leftIcon,
}: Button1Props) => {
  const base = 'flex gap-x-2 items-center justify-center rounded cursor-pointer'
  const variantClass = variantStyles[styleType][styleStatus]
  const sizeClass = sizeStyles[styleSize]
  const className = [base, variantClass, sizeClass].join(' ')

  return (
    <button disabled={disabled} type={buttonType} onClick={onClick} className={`${className} ${customClassName}`}>
      {leftIcon ? leftIcon : null}
      {children}
      {rightIcon ? rightIcon : null}
    </button>
  )
}

export default Button1
