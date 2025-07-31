import Button1 from '@/components/common/Button1'
import { UploadIcon } from '@/assets/svgComponents'
import UploadItem from '@/components/common/UploadItem'

export default function DrawingUploadField() {
  return (
    <section>
      <div className="gap-y-4xs flex flex-col">
        <p className="sub2">도면 업로드</p>
        <Button1
          onClick={() => {}}
          styleStatus={'default'}
          styleSize={'lg'}
          styleType={'outline'}
          customClassName={'w-fit'}
          leftIcon={<UploadIcon width={18} height={18} />}
        >
          파일 업로드
        </Button1>
        <p className="body1 text-conic-orange-40">
          도면 혹은 프로젝트를 제작하는 데 .도움이 되는 파일을 모두 업로드해주세요
        </p>
      </div>
    </section>
  )
}
