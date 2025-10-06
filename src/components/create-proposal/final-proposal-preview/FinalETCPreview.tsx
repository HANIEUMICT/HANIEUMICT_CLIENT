import Button1 from '@/components/common/Button1'

export default function FinalETCPreview() {
  return (
    <div className="border-gray-20 flex flex-col gap-y-4 rounded-[24px] border bg-white p-6">
      <h1 className="sub1">기타 내용</h1>
      <section className="flex flex-col gap-y-4">
        <div className="flex flex-col gap-y-3">
          <p className="sub2">특이사항</p>
          <p className="body1 text-gray-40">공개</p>
        </div>
        <div className="flex flex-col gap-y-3">
          <p className="sub2">기타 견적 정보</p>
          <p className="body1 text-gray-40">모든 공장에 상담 가능</p>
        </div>
      </section>
      <div className="flex w-full justify-end">
        <Button1 styleSize={'md'} styleStatus={'disabled'} styleType={'outline'} customClassName={'h-[48px] w-[160px]'}>
          수정
        </Button1>
      </div>
    </div>
  )
}
