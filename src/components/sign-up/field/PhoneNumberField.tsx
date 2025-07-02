import Input from '@/components/common/Input'
import Button1 from '@/components/common/Button1'

export default function PhoneNumberField() {
  return (
    <div className="gap-y-4xs flex flex-col">
      <section className="gap-x-5xs sub2 flex">
        전화번호 <span className="text-conic-red-30">*</span>
      </section>
      <section className="gap-x-4xs flex">
        <Input inputBoxStyle={'default'} placeholder={'전화번호 입력'} customClassName={'w-full'}></Input>
        <Button1
          onClick={() => {}}
          styleSize={'lg'}
          styleStatus={'disabled'}
          styleType={'secondary'}
          customClassName={'whitespace-nowrap w-[120px]'}
        >
          인증번호 전송
        </Button1>
      </section>
      <section className="gap-x-4xs flex">
        <Input inputBoxStyle={'default'} placeholder={'인증번호 입력'} customClassName={'w-full'}></Input>
        <Button1
          onClick={() => {}}
          styleSize={'lg'}
          styleStatus={'disabled'}
          styleType={'secondary'}
          customClassName={'whitespace-nowrap w-[120px]'}
        >
          인증번호 확인
        </Button1>
      </section>
    </div>
  )
}
