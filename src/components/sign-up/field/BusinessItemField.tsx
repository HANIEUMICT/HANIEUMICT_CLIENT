import Input from '@/components/common/Input'

export default function BusinessItemField() {
  return (
    <div className="gap-y-4xs flex flex-col">
      <section className="gap-x-5xs sub2 flex">
        종목 <span className="text-conic-red-30">*</span>
      </section>
      <Input inputBoxStyle={'default'} placeholder={'종목명을 입력해주세요.'} customClassName={'w-full'}></Input>
    </div>
  )
}
