import Input from '@/components/common/Input'
import { CalendarIcon, CheckboxFillIcon, UnCheckboxIcon } from '@/assets/svgComponents'
import { useProjectStore } from '@/store/projectStore'
import { useState } from 'react'

interface BiddingDueDateSelectProps {}
export default function BiddingDueDateSelect({}: BiddingDueDateSelectProps) {
  const projectData = useProjectStore((state) => state.projectData)
  const setState = useProjectStore((state) => state.setState)
  const [noPublicUntil, setNoPublicUntil] = useState(false)
  return (
    <div className="gap-y-4xs flex flex-col">
      <p className="sub2">입찰 마감일 선택</p>
      {!noPublicUntil && (
        <Input
          value={projectData?.publicUntil ?? ''}
          type={'date'}
          onChange={(e) => {
            setState({
              ...projectData,
              projectData: { ...projectData, publicUntil: e.target.value },
            })
          }}
          customClassName={'h-[52px]'}
          placeholder={'입찰 마감일 입력'}
          inputBoxStyle={'default'}
          leftIcon={<CalendarIcon width={24} height={24} />}
        />
      )}
    </div>
  )
}
