const inputBoxStyles = {
  default: 'border-gray-20 placeholder:text-gray-50 text-black',
  hover: 'border-gray-20 hover:border-conic-orange-20 placeholder:text-gray-50 text-black',
  focus:
    'border-gray-20 hover:border-conic-orange-20 focus:border-conic-orange-30 placeholder:text-gray-50 text-black focus-within:border-conic-orange-30',
  error: 'border-conic-red-40 placeholder:text-gray-50 text-black',
  disabled: 'border-gray-20 text-gray-50 placeholder:text-gray-50 cursor-not-allowed',
}

interface InputProps {
  inputBoxStyle: 'default' | 'hover' | 'focus' | 'error' | 'disabled'
  textCount?: number
  totalCount?: number
  rightIcon?: React.ReactNode
  leftIcon?: React.ReactNode
  placeholder?: string
  type?: 'text' | 'password' | 'email' | 'tel'
  customClassName?: string
}

const Input = ({
  inputBoxStyle,
  textCount,
  totalCount,
  rightIcon,
  leftIcon,
  placeholder,
  type = 'text',
  customClassName,
}: InputProps) => {
  const inputBoxBase = 'border flex gap-x-5xs p-2xs rounded-[16px] items-center bg-white'
  const inputFieldBase = 'body1 w-full outline-none bg-white'

  const inputBoxStyleClassName = inputBoxStyles[inputBoxStyle]

  return (
    <div className={`${inputBoxBase} ${inputBoxStyleClassName} ${customClassName}`}>
      {leftIcon ? leftIcon : null}
      <div className="flex w-full justify-between">
        <input
          type={type}
          disabled={inputBoxStyle === 'disabled'}
          className={`${inputFieldBase} ${inputBoxStyle === 'disabled' ? 'cursor-not-allowed' : ''}`}
          placeholder={placeholder}
        />
        {textCount && totalCount && (
          <div className="body2 text-gray-50">
            {textCount}/{totalCount}
          </div>
        )}
      </div>
      {rightIcon ? rightIcon : null}
    </div>
  )
}
export default Input
