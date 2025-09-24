import Button1 from '@/components/common/Button1'
import { Dispatch, SetStateAction } from 'react'

interface HasDrawingSelectorProps {
  hasDrawingSelected: boolean | undefined
  setHasDrawingSelected: Dispatch<SetStateAction<boolean | undefined>>
}
export default function HasDrawingSelector({ hasDrawingSelected, setHasDrawingSelected }: HasDrawingSelectorProps) {
  return (
    <div className="gap-y-4xs flex flex-col">
      <p className="sub2">도면을 가지고 계신가요?</p>
      <div className="gap-x-3xs flex">
        <Button1
          onClick={() => {
            setHasDrawingSelected(hasDrawingSelected === true ? undefined : true)
          }}
          customClassName={'w-full h-[60px]'}
          styleType={hasDrawingSelected ? 'outline2' : 'outline'}
          styleStatus={hasDrawingSelected ? 'selected' : 'default'}
        >
          네, 도면이 있습니다.
        </Button1>
        <Button1
          onClick={() => {
            setHasDrawingSelected(hasDrawingSelected === false ? undefined : false)
          }}
          customClassName={'w-full h-[60px]'}
          styleType={hasDrawingSelected === false ? 'outline2' : 'outline'}
          styleStatus={hasDrawingSelected === false ? 'selected' : 'default'}
        >
          아니요, 도면이 없습니다.
        </Button1>
      </div>
    </div>
  )
}
