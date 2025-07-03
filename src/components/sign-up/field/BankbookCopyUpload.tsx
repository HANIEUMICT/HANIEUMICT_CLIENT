import Button1 from '@/components/common/Button1'
import { UploadIcon } from '@/assets/svgComponents'

export default function BankbookCopyUpload() {
  return (
    <div className="gap-y-4xs flex flex-col">
      <div className="gap-x-5xs sub2 flex">
        통장사본 <span className="text-conic-red-30">*</span>
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
      <p className="body1 text-gray-50">5MB이하 파일(jpg, jpeg, png)만 가능합니다.</p>
    </div>
  )
}
