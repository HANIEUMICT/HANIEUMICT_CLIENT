import Input from '@/components/common/Input'

export default function RepresentativeEmailField() {
  return (
    <div className="gap-y-4xs flex flex-col">
      <section className="gap-x-5xs sub2 flex">
        대표자 이메일 <span className="text-conic-red-30">*</span>
      </section>
      <Input
        value={''}
        inputBoxStyle={'default'}
        placeholder={'대표자 이메일을 입력해주세요.'}
        customClassName={'w-full'}
      ></Input>
    </div>
  )
}
