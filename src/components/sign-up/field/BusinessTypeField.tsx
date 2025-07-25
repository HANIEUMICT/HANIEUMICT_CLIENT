import Input from '@/components/common/Input'

export default function BusinessTypeField() {
  return (
    <div className="gap-y-4xs flex flex-col">
      <section className="gap-x-5xs sub2 flex">
        업태명 <span className="text-conic-red-30">*</span>
      </section>
      <Input
        value={''}
        inputBoxStyle={'default'}
        placeholder={'업태명을 입력해주세요.'}
        customClassName={'w-full'}
      ></Input>
    </div>
  )
}
