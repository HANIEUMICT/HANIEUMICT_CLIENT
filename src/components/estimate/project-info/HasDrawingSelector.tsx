import Button1 from '@/components/common/Button1'

interface HasDrawingSelectorProps {}
export default function HasDrawingSelector({}: HasDrawingSelectorProps) {
  return (
    <div className="gap-y-4xs flex flex-col">
      <p className="sub2">도면을 가지고 계신가요?</p>
      <div className="gap-x-3xs flex">
        <Button1 onClick={() => {}} customClassName={'w-full h-[60px]'} styleType={'outline'} styleStatus={'default'}>
          네, 도면이 있습니다.
        </Button1>
        <Button1 onClick={() => {}} customClassName={'w-full h-[60px]'} styleType={'outline'} styleStatus={'default'}>
          아니요, 도면이 없습니다.
        </Button1>
      </div>
    </div>
  )
}
