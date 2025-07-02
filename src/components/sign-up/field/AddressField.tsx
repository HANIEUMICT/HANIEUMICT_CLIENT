import Input from '@/components/common/Input'
import Button1 from '@/components/common/Button1'

export default function AddressField() {
  return (
    <div className="gap-y-4xs flex flex-col">
      <section className="gap-x-5xs sub2 flex">
        주소 <span className="text-conic-red-30">*</span>
      </section>
      <section className="gap-x-4xs flex">
        <Input inputBoxStyle={'default'} placeholder={'우편번호 입력'} customClassName={'w-full'}></Input>
        <Button1
          onClick={() => {}}
          styleSize={'lg'}
          styleStatus={'disabled'}
          styleType={'secondary'}
          customClassName={'whitespace-nowrap w-[120px]'}
        >
          주소찾기
        </Button1>
      </section>
      <Input inputBoxStyle={'default'} placeholder={'주소'} customClassName={'w-full'}></Input>
      <Input inputBoxStyle={'default'} placeholder={'상세주소를 입력해주세요.'} customClassName={'w-full'}></Input>
    </div>
  )
}
