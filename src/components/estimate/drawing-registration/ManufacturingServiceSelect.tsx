import Input from '@/components/common/Input'
import { SearchIcon } from '@/assets/svgComponents'

interface ManufacturingServiceSelectProps {}
export default function ManufacturingServiceSelect({}: ManufacturingServiceSelectProps) {
  return (
    <div className="gap-y-4xs flex flex-col">
      <p className="sub2">제조 서비스 카테고리 선택</p>
      <Input
        rightIcon={<SearchIcon width={24} height={24} />}
        placeholder={'프로젝트 카테고리를 선택해주세요.'}
        inputBoxStyle={'default'}
        customClassName={'h-[52px]'}
      />
    </div>
  )
}
