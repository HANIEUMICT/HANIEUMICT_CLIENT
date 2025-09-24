interface FinalBasicInfoProps {}
export default function FinalBasicInfo({}: FinalBasicInfoProps) {
  return (
    <section className="border-gray-20 flex w-[1063px] flex-col gap-y-[16px] rounded-[24px] border bg-white p-6">
      <h1 className="sub1">기본 정보</h1>
      <section className="flex flex-col gap-y-[16px]">
        <div className="flex flex-col gap-y-[12px]">
          <p className="sub2">프로젝트명</p>
          <p className="body1 text-gray-40">{'고강도 합금강 육각 머리 볼트(M10) 제작'}</p>
        </div>
        <div className="flex">
          <div className="flex flex-col gap-y-[12px]">
            <p className="sub2">제조 분류 선택</p>
            <p className="body1 text-gray-40">{'절삭 가공'}</p>
          </div>
          <div className="flex flex-col gap-y-[12px]">
            <p className="sub2">제조 분류 - 세부 항목 선택</p>
            <p className="body1 text-gray-40">{'선반 가공 및 밀링'}</p>
          </div>
        </div>
        <div className="flex flex-col gap-y-[12px]">
          <p className="sub2">제조 사항 상세 입력</p>
          <div className="flex flex-col gap-y-1">
            <p className="body1 text-gray-40">{'재질: SCM435 (합금강)'}</p>
            <p className="body1 text-gray-40">{'규격: M10 x 1.5P x 40mm'}</p>
            <p className="body1 text-gray-40">{'표면 처리: 흑색 산화 피막 처리'}</p>
            <p className="body1 text-gray-40">{'열처리: 필수 (HRC 30-35)'}</p>
          </div>
        </div>

        <div className="flex">
          <div className="flex flex-col gap-y-[12px]">
            <p className="sub2">제품 용도 선택</p>
            <p className="body1 text-gray-40">{'산업 기계 부품'}</p>
          </div>
          <div className="flex flex-col gap-y-[12px]">
            <p className="sub2">상세 제품 용도 입력</p>
            <p className="body1 text-gray-40">{'반도체 제조 장비의 진동 흡수 모듈 고정용'}</p>
          </div>
        </div>
      </section>
    </section>
  )
}
