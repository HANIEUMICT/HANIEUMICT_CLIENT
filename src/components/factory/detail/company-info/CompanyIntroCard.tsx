export default function CompanyIntroCard() {
  return (
    <div className="gap-y-2xs flex flex-col">
      <h2 className="h2">기업명</h2>
      <section className="gap-y-s border-gray-20 flex flex-col rounded-[24px] border bg-white p-6">
        <section className="flex flex-col gap-y-3">
          <p className="sub1">기업 소개글</p>
          <p className="body1">
            코스탈은 전기 및 전력용 비철금속 재료 및 가공 제품의 세계적인 선도 제조업체입니다. 당사는 1999년 설립된 이래
            전력 생산, 송전, 배전 및 전자 산업 분야의 최고 품질의 제품 생산을 목표로 하고 있습니다. 기술, 고객 중심 및
            품질에 대한 타협하지 않는 관심은 모두 우리 성공의 기본입니다. 코스탈은 회사로서 항상 기존 시장 리더의
            추종자로서 비즈니스를 추구하기 보다는 자체 의제를 설정하기 위해 노력합니다. 코스탈은 기계 및 전력산업의
            고용량 수요를 기반으로 비철금속 생산 및 가공기술 개발에서 경쟁력을 확보하고 있으며 초고압용 멀티로발 인발
            제품인 동 부스바를 생산하며 지속적인 성장을 거듭하고 있습니다. 부품의 정확한 사양과 신뢰성에 대한 설계,
            이해, 기술 및 연구 개발을 계속합니다. 날로 복잡해지고 다양해지는 고객의 요구사항에 적절히 대응하고 혁신을
            통해 우수한 부가가치 제품을 제공하기 위해 더욱 경쟁력 있고 역동적인 기업이 되도록 항상 노력하겠습니다.
          </p>
        </section>
        <section className="gap-x-xs flex">
          <section className="flex flex-col gap-y-3">
            <h3 className="sub1">기업 정보</h3>
            <div className="py-4xs px-2xs border-gray-20 flex h-full w-[325px] flex-col justify-between rounded-[16px] border">
              <div className="py-4xs flex items-center justify-between">
                <p className="body1 text-gray-50">설립연도</p>
                <p className="button-lg">2022.02.02</p>
              </div>
              <div className="border-gray-20 w-full border-b" />
              <div className="py-4xs flex items-center justify-between">
                <p className="body1 text-gray-50">규모</p>
                <p className="button-lg">2022.02.02</p>
              </div>
              <div className="border-gray-20 w-full border-b" />
              <div className="py-4xs flex items-center justify-between">
                <p className="body1 text-gray-50">연락처</p>
                <p className="button-lg">2022.02.02</p>
              </div>
              <div className="border-gray-20 w-full border-b" />
              <div className="py-4xs flex items-center justify-between">
                <p className="body1 text-gray-50">연락 가능 시간</p>
                <p className="button-lg">2022.02.02</p>
              </div>
              <div className="border-gray-20 w-full border-b" />
              <div className="py-4xs flex items-center justify-between">
                <p className="body1 text-gray-50">홈페이지</p>
                <p className="button-lg">2022.02.02</p>
              </div>
            </div>
          </section>
          <section className="flex w-full flex-col gap-y-3">
            <div className="flex gap-x-3">
              <h3 className="sub1 text-gray-50">공장위치</h3>
              <p className="sub2">충북 청주시 충대로1처럼 실제 주소</p>
            </div>
            <div className="bg-gray-10 h-[256px] w-full rounded-[16px]" />
          </section>
        </section>
      </section>
    </div>
  )
}
