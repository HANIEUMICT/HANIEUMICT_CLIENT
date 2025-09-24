export default function AdditionalProposalInfoField() {
  return (
    <div className="gap-y-4xs flex flex-col">
      <p className="sub2">기타 견적 정보</p>
      <textarea
        className="p-2xs placeholder:body1 border-gray-20 h-[180px] rounded-[16px] border outline-none placeholder:text-gray-50"
        placeholder="기타 견적 정보를 입력해주세요."
      />
    </div>
  )
}
