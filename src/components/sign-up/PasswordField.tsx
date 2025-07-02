import Input from '@/components/common/Input'

export default function PasswordField() {
  return (
    <div className="gap-y-4xs flex flex-col">
      <section className="gap-x-5xs sub2 flex">
        비밀번호 <span className="text-conic-red-30">*</span>
      </section>
      <section className="gap-y-4xs flex flex-col">
        <Input
          inputBoxStyle={'default'}
          placeholder={'영문, 숫자, 특수문자 조합하여 8-20자.'}
          customClassName={'w-full'}
        ></Input>
        <Input inputBoxStyle={'default'} placeholder={'비밀번호 확인'} customClassName={'w-full'}></Input>
      </section>
    </div>
  )
}
