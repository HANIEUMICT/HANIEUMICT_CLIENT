import { UnCheckboxIcon } from '@/assets/svgComponents'
import Button1 from '@/components/common/Button1'

interface ProductionServiceFieldProps {}
export default function ProductionServiceField({}: ProductionServiceFieldProps) {
  return (
    <div className="gap-y-xs p-xs flex flex-col rounded-[24px] bg-white">
      <div className="gap-y-3xs flex flex-col">
        <div className="gap-x-5xs sub2 flex">
          제조 서비스 제공 여부
          <span className="text-conic-red-30">*</span>
        </div>
        <div className="flex items-center gap-x-2">
          <UnCheckboxIcon width={24} height={24} />
          <p className="button-lg text-gray-50">제조 서비스를 제공하는 기업입니다.</p>
        </div>
        <div className="flex items-center gap-x-2">
          <UnCheckboxIcon width={24} height={24} />
          <p className="button-lg text-gray-50">제조 서비스를 제공받길 원합니다. (제조 서비스를 제공하지 않습니다.)</p>
        </div>
      </div>
      <div className="gap-y-4xs flex flex-col">
        <div className="gap-x-5xs sub2 flex">
          제조 서비스 유형 선택
          <span className="text-conic-red-30">*</span>
        </div>
        <Button1 onClick={() => {}} styleSize={'lg'} styleType={'outline'}>
          선택하기
        </Button1>
      </div>
    </div>
  )
}
