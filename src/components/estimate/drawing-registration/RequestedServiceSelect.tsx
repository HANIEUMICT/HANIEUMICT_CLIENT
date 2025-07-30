import { UnCheckboxIcon } from '@/assets/svgComponents'
import Button1 from '@/components/common/Button1'
import Input from '@/components/common/Input'

interface RequestedServiceSelectProps {}
export default function RequestedServiceSelect({}: RequestedServiceSelectProps) {
  return (
    <div className="flex flex-col gap-y-[8px]">
      <p className="sub2">요청할 제조 서비스 선택</p>
      <div className="flex flex-col gap-y-[16px]">
        {/* 직접 선택 */}
        <section className="gap-x-xs flex items-start">
          <div className="my-3xs flex items-center gap-x-2 whitespace-nowrap">
            <UnCheckboxIcon width={24} height={24} />
            <p className="button-lg text-gray-50">직접선택</p>
          </div>
          <div className="grid w-full grid-cols-3 gap-[12px]">
            <Button1
              onClick={() => {}}
              styleType={'outline'}
              styleSize={'lg'}
              styleStatus={'default'}
              customClassName={'w-full'}
            >
              종류1
            </Button1>
            <Button1
              onClick={() => {}}
              styleType={'outline'}
              styleSize={'lg'}
              styleStatus={'default'}
              customClassName={'w-full'}
            >
              종류1
            </Button1>
            <Button1
              onClick={() => {}}
              styleType={'outline'}
              styleSize={'lg'}
              styleStatus={'default'}
              customClassName={'w-full'}
            >
              종류1
            </Button1>
            <Button1
              onClick={() => {}}
              styleType={'outline'}
              styleSize={'lg'}
              styleStatus={'default'}
              customClassName={'w-full'}
            >
              종류1
            </Button1>
            <Button1
              onClick={() => {}}
              styleType={'outline'}
              styleSize={'lg'}
              styleStatus={'default'}
              customClassName={'w-full'}
            >
              종류1
            </Button1>
            <Button1
              onClick={() => {}}
              styleType={'outline'}
              styleSize={'lg'}
              styleStatus={'default'}
              customClassName={'w-full'}
            >
              종류1
            </Button1>
            <Button1
              onClick={() => {}}
              styleType={'outline'}
              styleSize={'lg'}
              styleStatus={'default'}
              customClassName={'w-full'}
            >
              종류1
            </Button1>
            <Button1
              onClick={() => {}}
              styleType={'outline'}
              styleSize={'lg'}
              styleStatus={'default'}
              customClassName={'w-full'}
            >
              종류1
            </Button1>
            <Button1
              onClick={() => {}}
              styleType={'outline'}
              styleSize={'lg'}
              styleStatus={'default'}
              customClassName={'w-full'}
            >
              종류1
            </Button1>
          </div>
        </section>
        {/* 기타 제조 */}
        <section className="gap-x-xs flex">
          <div className="flex items-center gap-x-2 whitespace-nowrap">
            <UnCheckboxIcon width={24} height={24} />
            <p className="button-lg text-gray-50">기타제조</p>
          </div>
          <Input
            value={''}
            placeholder={'요청할 제조 서비스를 작성해주세요.'}
            customClassName={'h-[52px] w-full'}
            inputBoxStyle={'default'}
          ></Input>
        </section>
      </div>
    </div>
  )
}
