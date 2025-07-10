import Input from '@/components/common/Input'
import { CalendarIcon, UnCheckboxIcon } from '@/assets/svgComponents'

interface BiddingDueDateSelectProps {}
export default function BiddingDueDateSelect({}: BiddingDueDateSelectProps) {
  return (
    <div className="gap-y-4xs flex flex-col">
      <p className="sub2">입찰 마감일 선택</p>
      <Input
        customClassName={'h-[52px]'}
        placeholder={'입찰 마감일 입력'}
        inputBoxStyle={'default'}
        leftIcon={<CalendarIcon width={24} height={24} />}
      />
      <div className="flex items-center gap-x-2">
        <UnCheckboxIcon width={24} height={24} />
        <p className="button-lg text-gray-50">마감일을 입력하지 않습니다.</p>
      </div>
    </div>
  )
}
