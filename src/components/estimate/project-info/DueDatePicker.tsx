import Input from '@/components/common/Input'
import { CalendarIcon, UnCheckboxIcon } from '@/assets/svgComponents'

export default function DueDatePicker() {
  return (
    <div className="gap-y-4xs flex flex-col">
      <p className="sub2">납기일 선택</p>
      <Input
        value={''}
        customClassName={'h-[52px]'}
        placeholder={'납기일 입력'}
        inputBoxStyle={'default'}
        leftIcon={<CalendarIcon width={24} height={24} />}
      />
      <div className="flex items-center gap-x-2">
        <UnCheckboxIcon width={24} height={24} />
        <p className="button-lg text-gray-50">납기일 협의 가능</p>
      </div>
    </div>
  )
}
