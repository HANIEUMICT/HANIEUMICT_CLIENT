import Header from '@/components/common/Header'
import FactoryCard from '@/components/factory/FactoryCard'
import Tag from '@/components/common/Tag'
import { I18nParams } from '@/lib/i18n.types'
import { useTranslationServer } from '@/lib/i18n'
// import { useModalStore } from '@/store/modalStore'

export const dynamic = 'force-dynamic'

interface HomePageProps {
  params: Promise<I18nParams>
}

export default async function Home({ params }: HomePageProps) {
  const { lang } = await params
  const { t } = await useTranslationServer(lang, ['common'])
  return (
    <main>
      {/*<div className="flex flex-col items-center gap-[40px]">*/}
      {/*  <section className="flex flex-col gap-[16px]">*/}
      {/*    <div className="flex items-end justify-between">*/}
      {/*      <div className="h2 flex w-full flex-col gap-[8px]">*/}
      {/*        <h2>‘황유림’님의 추천 공급업체</h2>*/}
      {/*        <RecommendedTag />*/}
      {/*      </div>*/}
      {/*    </div>*/}
      {/*    <div className="gap-x-xs flex items-center">*/}
      {/*      <FactoryCard*/}
      {/*        people={'41건'}*/}
      {/*        responseTime={'2시간 이내'}*/}
      {/*        time={'1달 이내'}*/}
      {/*        deal={'12회'}*/}
      {/*        category={'3D프린팅 ･ 판금 ･ 절삭(CNC)'}*/}
      {/*        likeCount={30}*/}
      {/*        name={'유일'}*/}
      {/*        imageUrl={'/test/유일.webp'}*/}
      {/*      />*/}
      {/*      <FactoryCard*/}
      {/*        people={'25건'}*/}
      {/*        responseTime={'1시간 이내'}*/}
      {/*        time={'1달 이내'}*/}
      {/*        deal={'10회'}*/}
      {/*        likeCount={16}*/}
      {/*        name={'(주)마움코스메틱'}*/}
      {/*        imageUrl={'/test/패션_뷰티.jpg'}*/}
      {/*        category={'패션 / 뷰티 ･ 기타제조'}*/}
      {/*      />*/}
      {/*      <FactoryCard*/}
      {/*        category={'로봇 / 드론 ･ 기계 / 장비'}*/}
      {/*        people={'38건'}*/}
      {/*        responseTime={'3시간 이내'}*/}
      {/*        time={'3주 이내'}*/}
      {/*        deal={'27회'}*/}
      {/*        likeCount={24}*/}
      {/*        name={'팩업'}*/}
      {/*        imageUrl={'/test/팩업.webp'}*/}
      {/*      ></FactoryCard>*/}
      {/*      <FactoryCard*/}
      {/*        category={'판금, 제관, 용접, 기타제조'}*/}
      {/*        people={'11건'}*/}
      {/*        responseTime={'1시간 이내'}*/}
      {/*        time={'50일 이내'}*/}
      {/*        deal={'15회'}*/}
      {/*        likeCount={29}*/}
      {/*        name={'금마스틸(주)'}*/}
      {/*        imageUrl={'/test/금마스틸.webp'}*/}
      {/*      />*/}
      {/*    </div>*/}
      {/*  </section>*/}

      {/*  <section className="flex flex-col gap-[16px]">*/}
      {/*    <div className="h2 flex justify-between">*/}
      {/*      <h2>거래가 많은 공급업체</h2>*/}
      {/*    </div>*/}
      {/*    <div className="gap-x-xs flex items-center">*/}
      {/*      <FactoryCard*/}
      {/*        category={'판금, 제관, 용접, 기타제조'}*/}
      {/*        people={'52건'}*/}
      {/*        responseTime={'30분 이내'}*/}
      {/*        time={'1달 이내'}*/}
      {/*        deal={'64회'}*/}
      {/*        likeCount={5}*/}
      {/*        name={'AID[에이드]'}*/}
      {/*        imageUrl={'/test/factory1.png'}*/}
      {/*      />*/}
      {/*      <FactoryCard*/}
      {/*        category={'전기장비 / 부품 ･ 검사 / 시험'}*/}
      {/*        people={'47건'}*/}
      {/*        responseTime={'1시간 이내'}*/}
      {/*        time={'2달 이내'}*/}
      {/*        deal={'15회'}*/}
      {/*        likeCount={16}*/}
      {/*        name={'닥터스랩'}*/}
      {/*        imageUrl={'/test/factory2.png'}*/}
      {/*      />*/}
      {/*      <FactoryCard*/}
      {/*        category={'3D프린팅 ･ 판금 ･ 절삭(CNC)'}*/}
      {/*        people={'36건'}*/}
      {/*        responseTime={'1시간 이내'}*/}
      {/*        time={'1달 이내'}*/}
      {/*        deal={'19회'}*/}
      {/*        likeCount={18}*/}
      {/*        name={'이퀄'}*/}
      {/*        imageUrl={'/test/factory3.png'}*/}
      {/*      />*/}
      {/*      <FactoryCard*/}
      {/*        category={'3D프린팅'}*/}
      {/*        people={'25건'}*/}
      {/*        responseTime={'2시간 이내'}*/}
      {/*        time={'1달 이내'}*/}
      {/*        deal={'30회'}*/}
      {/*        likeCount={7}*/}
      {/*        name={'3D MAKERS'}*/}
      {/*        imageUrl={'/test/factory4.png'}*/}
      {/*      />*/}
      {/*    </div>*/}
      {/*  </section>*/}

      {/*  <section className="flex flex-col gap-[16px]">*/}
      {/*    <div className="h2 flex flex-col gap-[16px]">*/}
      {/*      <h2>CONIC 공급업체</h2>*/}
      {/*    </div>*/}
      {/*    <div className="gap-x-xs flex items-center">*/}
      {/*      <FactoryCard*/}
      {/*        category={'전기장비 / 부품'}*/}
      {/*        people={'23건'}*/}
      {/*        responseTime={'4시간 이내'}*/}
      {/*        time={'1달 이내'}*/}
      {/*        deal={'12회'}*/}
      {/*        likeCount={34}*/}
      {/*        name={'프레스토라이트아시아(주)'}*/}
      {/*        imageUrl={'/test/factory5.png'}*/}
      {/*      />*/}
      {/*      <FactoryCard*/}
      {/*        category={'자동차 / 운송 ･ 해양 / 선박'}*/}
      {/*        people={'11건'}*/}
      {/*        responseTime={'1시간 이내'}*/}
      {/*        time={'2달 이내'}*/}
      {/*        deal={'23회'}*/}
      {/*        likeCount={9}*/}
      {/*        name={'세미테크'}*/}
      {/*        imageUrl={'/test/factory6.png'}*/}
      {/*      />*/}
      {/*      <FactoryCard*/}
      {/*        category={'로봇 / 드론 ･ 기계'}*/}
      {/*        people={'15건'}*/}
      {/*        responseTime={'30분 이내'}*/}
      {/*        time={'3달 이내'}*/}
      {/*        likeCount={16}*/}
      {/*        name={'로젬(LOSEM)'}*/}
      {/*        deal={'7회'}*/}
      {/*        imageUrl={'/test/factory7.png'}*/}
      {/*      />*/}
      {/*      <FactoryCard*/}
      {/*        category={'자동차 / 운송 ･ 해양 / 선박'}*/}
      {/*        people={'17건'}*/}
      {/*        responseTime={'1시간 이내'}*/}
      {/*        time={'1달 이내'}*/}
      {/*        deal={'7회'}*/}
      {/*        likeCount={6}*/}
      {/*        name={'씨에스레이저'}*/}
      {/*        imageUrl={'/test/factory8.png'}*/}
      {/*      />*/}
      {/*    </div>*/}
      {/*    <div className="gap-x-xs flex items-center">*/}
      {/*      <FactoryCard*/}
      {/*        category={'자동차 / 운송 ･ 해양 / 선박'}*/}
      {/*        people={'11건'}*/}
      {/*        responseTime={'1시간 이내'}*/}
      {/*        time={'1달 이내'}*/}
      {/*        deal={'8회'}*/}
      {/*        likeCount={4}*/}
      {/*        name={'선라인테크'}*/}
      {/*        imageUrl={'/test/factory9.png'}*/}
      {/*      />*/}
      {/*      <FactoryCard*/}
      {/*        category={'자동차 / 운송 ･ 해양 / 선박'}*/}
      {/*        people={'12건'}*/}
      {/*        responseTime={'1시간 이내'}*/}
      {/*        time={'1달 이내'}*/}
      {/*        deal={'14회'}*/}
      {/*        likeCount={25}*/}
      {/*        name={'지엔피'}*/}
      {/*        imageUrl={'/test/factory10.png'}*/}
      {/*      />*/}
      {/*      <FactoryCard*/}
      {/*        category={'자동차 / 운송 ･ 해양 / 선박 ･ 로봇 / 드론'}*/}
      {/*        people={'15건'}*/}
      {/*        responseTime={'30분 이내'}*/}
      {/*        time={'1달 이내'}*/}
      {/*        deal={'12회'}*/}
      {/*        likeCount={17}*/}
      {/*        name={'주식회사 텝스'}*/}
      {/*        imageUrl={'/test/factory11.png'}*/}
      {/*      />*/}
      {/*      <FactoryCard*/}
      {/*        category={'절삭(CNC) ･ 기구설계'}*/}
      {/*        people={'15건'}*/}
      {/*        responseTime={'30분 이내'}*/}
      {/*        time={'1달 이내'}*/}
      {/*        deal={'16회'}*/}
      {/*        likeCount={6}*/}
      {/*        name={'경기FA'}*/}
      {/*        imageUrl={'/test/factory12.png'}*/}
      {/*      />*/}
      {/*    </div>*/}
      {/*  </section>*/}
      {/*</div>*/}
    </main>
  )
}

function RecommendedTag({}: {}) {
  // const setModalState = useModalStore((state) => state.setState)
  return (
    <div className="gap-x-4xs flex w-full">
      {/* TODO: 나중에 MAP */}
      <Tag tagContent={'신뢰도 있는 기업'} tagColor={'bg-conic-orange-40'} tagNumber={1}></Tag>
      <Tag tagContent={'빠른 답변 속도'} tagColor={'bg-conic-orange-30'} tagNumber={2}></Tag>
      <Tag tagContent={'합리적인 가격 거래'} tagColor={'bg-conic-orange-20'} tagNumber={3}></Tag>
      {/*<button*/}
      {/*  onClick={() => {*/}
      {/*    setModalState({ isServicePreparingModalOpen: true })*/}
      {/*  }}*/}
      {/*  className="text-gray-40 button-sm"*/}
      {/*>*/}
      {/*  추천 우선순위 변경*/}
      {/*</button>*/}
    </div>
  )
}
