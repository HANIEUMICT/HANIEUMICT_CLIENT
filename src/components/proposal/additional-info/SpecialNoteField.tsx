export default function SpecialNoteField() {
  return (
    <div className="gap-y-4xs flex flex-col">
      <p className="sub2">특이 사항 입력</p>
      <textarea
        className="p-2xs placeholder:body1 border-gray-20 h-[180px] rounded-[16px] border outline-none placeholder:text-gray-50"
        placeholder="특이사항을 입력해주세요."
      />
    </div>
  )
}
