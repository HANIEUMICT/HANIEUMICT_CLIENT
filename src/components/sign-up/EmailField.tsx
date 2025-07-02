import Input from '@/components/common/Input'
import Button1 from '@/components/common/Button1'

export default function EmailField() {
  return (
    <div className="gap-y-4xs flex flex-col">
      <section className="gap-x-5xs sub2 flex">
        이메일 <span className="text-conic-red-30">*</span>
      </section>
      <section className="gap-x-4xs flex">
        <Input inputBoxStyle={'default'} placeholder={'이메일을 입력해주세요.'} customClassName={'w-full'}></Input>
        <Button1
          onClick={() => {}}
          styleSize={'lg'}
          styleStatus={'disabled'}
          styleType={'secondary'}
          customClassName={'whitespace-nowrap w-[120px]'}
        >
          중복확인
        </Button1>
      </section>
    </div>
  )
}
