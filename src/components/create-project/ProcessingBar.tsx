import { WhiteCheckIcon } from '@/assets/svgComponents'

interface ProcessingBarProps {
  currentStep: number // 1부터 시작 ~ 6
  width?: string
  steps: string[]
  row?: boolean
}

export default function ProcessingBar({ currentStep = 2, width = '80px', steps, row = true }: ProcessingBarProps) {
  return (
    <div className="p-s border-gray-20 flex items-center rounded-[24px] border bg-white">
      {steps.map((label, index) => {
        const stepNumber = index + 1
        const isCompleted = stepNumber < currentStep
        const isCurrent = stepNumber === currentStep
        const isLast = stepNumber === steps.length

        return (
          <div key={stepNumber} className="flex items-center">
            {/* Step */}
            <div
              className={`${row ? '' : 'flex-col items-center justify-center gap-y-2'} gap-x-4xs flex items-center justify-between`}
            >
              {isCompleted ? (
                <div className="bg-conic-orange-30 flex h-[32px] w-[32px] items-center justify-center rounded-full">
                  <WhiteCheckIcon width={12} height={8} />
                </div>
              ) : isCurrent ? (
                <div className="bg-conic-orange-10 flex h-[32px] w-[32px] items-center justify-center rounded-full">
                  <p className="text-conic-orange-30 sub2">{stepNumber}</p>
                </div>
              ) : (
                <div className="border-gray-20 flex h-[32px] w-[32px] items-center justify-center rounded-full border">
                  <p className="text-gray-40 sub2">{stepNumber}</p>
                </div>
              )}
              <p className={`sub1 ml-1 whitespace-nowrap ${!isCompleted && !isCurrent ? 'text-gray-40' : ''}`}>
                {label}
              </p>
            </div>

            {/* Line to next step */}
            {!isLast && (
              <div
                className={`mx-[12px] h-[2px] rounded-full ${isCompleted ? 'bg-conic-orange-30' : 'bg-gray-20'}`}
                style={{ width: width }} // ✅ 원하는 길이로 조절
              />
            )}
          </div>
        )
      })}
    </div>
  )
}
