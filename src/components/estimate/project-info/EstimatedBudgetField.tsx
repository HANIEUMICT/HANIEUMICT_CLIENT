import Input from '@/components/common/Input'
import { CalendarIcon, UnCheckboxIcon } from '@/assets/svgComponents'

interface EstimatedBudgetFieldProps {}
export default function EstimatedBudgetField({}: EstimatedBudgetFieldProps) {
  return (
    <div className="gap-y-4xs flex flex-col">
      <p className="sub2">입찰 마감일 선택</p>
      <section className="gap-x-xs flex">
        <div className="flex items-center justify-center gap-x-2">
          <div className="border-conic-red-30 flex h-[24px] w-[24px] items-center justify-center rounded-full border-[1.6px]">
            <div className="bg-conic-red-30 h-[12px] w-[12px] rounded-full"></div>
          </div>
          <p className="button-lg text-gray-50">직접 입력</p>
        </div>
        <div className="flex items-center justify-center gap-x-2">
          <div className="border-gray-30 flex h-[24px] w-[24px] items-center justify-center rounded-full border-[1.6px]"></div>
          <p className="button-lg text-gray-50">AI 예산 추정</p>
        </div>
      </section>
      <Input
        value={''}
        customClassName={'h-[52px]'}
        placeholder={'예산을 입력해주세요.(원 단위)'}
        inputBoxStyle={'default'}
      />
      <section className="flex items-center gap-x-2">
        <UnCheckboxIcon width={24} height={24} />
        <p className="button-lg text-gray-50">추정 예산을 공개하지 않고 협의합니다.</p>
      </section>
    </div>
  )
}
