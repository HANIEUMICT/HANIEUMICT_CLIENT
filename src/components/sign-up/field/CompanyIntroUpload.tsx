import Button1 from '@/components/common/Button1'
import { UploadIcon } from '@/assets/svgComponents'

export default function CompanyIntroUpload() {
  return (
    <div className="gap-y-4xs flex flex-col">
      <div className="gap-x-5xs sub2 flex">
        회사소개서 <span className="text-conic-red-30">*</span>
      </div>
      <Button1
        onClick={() => {}}
        styleSize={'lg'}
        styleType={'outline'}
        customClassName={'h-[52px]'}
        leftIcon={<UploadIcon width={18} height={19} />}
      >
        파일 업로드
      </Button1>
      <p className="body1 text-gray-50">
        사업자 등록증, 회사 소개서 정보를 통해 파트너 등록 심사가 진행됩니다. 원활한 심사를 위해 충분한 정보 제공을
        부탁드립니다.
      </p>
    </div>
  )
}
