import Input from '@/components/common/Input'

export default function CompanyName() {
  return (
    <div className="gap-y-4xs flex flex-col">
      <section className="gap-x-5xs sub2 flex">
        회사명 <span className="text-conic-red-30">*</span>
      </section>
      <Input
        value={''}
        inputBoxStyle={'default'}
        placeholder={'회사명을 입력해주세요.'}
        customClassName={'w-full'}
      ></Input>
    </div>
  )
}
