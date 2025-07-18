import Input from '@/components/common/Input'

export default function BusinessNumber() {
  return (
    <div className="gap-y-4xs flex flex-col">
      <section className="gap-x-5xs sub2 flex">
        사업자번호
        <span className="text-conic-red-30">*</span>
      </section>
      <Input inputBoxStyle={'default'} placeholder={'회사명을 입력해주세요.'} customClassName={'w-full'}></Input>
    </div>
  )
}
