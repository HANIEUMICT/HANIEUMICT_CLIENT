import { WhiteCheckIcon } from '@/assets/svgComponents'

const steps = ['로그인', '기본정보', '도면등록', '프로젝트 정보', '배송 정보 입력', '견적서 생성']

interface ProcessingBarProps {
  currentStep: number // 1부터 시작 ~ 6
}

export default function ProcessingBar({ currentStep = 2 }: ProcessingBarProps) {
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
            <div className="gap-x-4xs flex items-center justify-between">
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
                style={{ width: '80px' }} // ✅ 원하는 길이로 조절
              />
            )}
          </div>
        )
      })}
    </div>
  )
}
