import Input from '@/components/common/Input'

export default function RepresentativePhoneNumberField() {
  return (
    <div className="gap-y-4xs flex flex-col">
      <section className="gap-x-5xs sub2 flex">
        대표자 전화번호 <span className="text-conic-red-30">*</span>
      </section>
      <Input
        value={''}
        inputBoxStyle={'default'}
        placeholder={'전화번호를 입력해주세요.'}
        customClassName={'w-full'}
      ></Input>
    </div>
  )
}
