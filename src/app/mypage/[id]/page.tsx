'use client'

import Header from '@/components/common/Header'
import Button1 from '@/components/common/Button1'
import Image from 'next/image'

export default function ProjectDetailMyPage() {
  return (
    <main className="flex flex-col items-center justify-center">
      <Header headerType={'DEFAULT'} />
      <div className="gap-y-2xs mt-[120px] mb-[120px] flex w-[1220px] flex-col">
        <section className="h2">'고강도 합금강 육각 머리 볼트(M10) 제작'</section>

        <section className="p-s border-gray-20 flex justify-between rounded-[24px] border bg-white">
          <div className="flex flex-col gap-y-4">
            <h1 className="sub1">‘고강도 합금강 육각 머리 볼트(M10) 제작'의 검수 샘플 확인 상태를 변경해주세요!</h1>
            <p className="text-gray-40 body1">검수 샘플 상태를 승인으로 변경해야 견적서 제작이 가능합니다.</p>
          </div>

          <Button1
            onClick={() => {}}
            styleType={'outline'}
            styleSize={'sm'}
            styleStatus={'default'}
            customClassName={'w-[80px] rounded-full h-[36px] text-gray-40'}
          >
            변경
          </Button1>
        </section>

        <section className="border-gray-20 flex flex-col gap-y-4 rounded-[24px] border bg-white p-6">
          <div className="flex items-center gap-x-2">
            <div className="badge text-conic-blue-30 bg-conic-blue-10 p-5xs flex h-fit items-center justify-center rounded-[4px]">
              승인완료
            </div>
            <div className="sub1">1. 거래 승인</div>
          </div>
          <div className="gap-x-2xs flex items-center">
            <div className={'body2 w-[92px] text-gray-50'}>거래 승인 날짜</div>
            <div className="button-sm">2025.08.30 오후 3:00</div>
          </div>
        </section>

        <section className="border-gray-20 flex flex-col gap-y-4 rounded-[24px] border bg-white p-6">
          <div className="flex items-center gap-x-2">
            <div className="badge text-conic-blue-30 bg-conic-blue-10 p-5xs flex h-fit items-center justify-center rounded-[4px]">
              검수완료
            </div>
            <div className="sub1">2. 검수</div>
          </div>
          <div className="gap-x-2xs flex items-center">
            <div className={'body2 w-[92px] text-gray-50'}>검수 완료 날짜</div>
            <div className="button-sm">2025.08.31 오후 3:00</div>
          </div>
        </section>

        <section className="border-gray-20 flex flex-col gap-y-4 rounded-[24px] border bg-white p-6">
          <div className="flex items-center gap-x-2">
            <div className="badge text-conic-orange-30 bg-conic-orange-10 p-5xs flex h-fit items-center justify-center rounded-[4px]">
              제작중
            </div>
            <div className="sub1">3. 검수 샘플 제작</div>
          </div>
          <div className="gap-y-3xs flex flex-col">
            <div className="gap-x-2xs flex items-center">
              <div className={'body2 w-[92px] text-gray-50'}>시작 날짜</div>
              <div className="button-sm">2025.08.31 오후 3:00</div>
            </div>
            <div className="gap-x-2xs flex items-center">
              <div className={'body2 w-[92px] text-gray-50'}>진행 사진</div>
              <div className="flex gap-x-4">
                <div className="relative h-[131px] w-[131px]">
                  <Image src={'/test/practice.png'} alt={'sf'} fill className="rounded-[16px] object-cover"></Image>
                </div>
                <div className="relative h-[131px] w-[131px]">
                  <Image src={'/test/practice2.png'} alt={'sf'} fill className="rounded-[16px] object-cover"></Image>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="border-gray-20 flex flex-col gap-y-4 rounded-[24px] border bg-white p-6">
          <div className="flex items-center gap-x-2">
            <div className="badge text-gray-40 bg-gray-20 p-5xs flex h-fit items-center justify-center rounded-[4px]">
              전달 전
            </div>
            <div className="sub1">4. 검수 샘플 전달</div>
          </div>
        </section>

        <section className="border-gray-20 flex flex-col gap-y-4 rounded-[24px] border bg-white p-6">
          <div className="flex items-center gap-x-2">
            <div className="badge text-gray-40 bg-gray-20 p-5xs flex h-fit items-center justify-center rounded-[4px]">
              확인 전
            </div>
            <div className="sub1">5. 검수 샘플 확인</div>
          </div>
        </section>

        <section className="border-gray-20 flex flex-col gap-y-4 rounded-[24px] border bg-white p-6">
          <div className="flex items-center gap-x-2">
            <div className="badge text-gray-40 bg-gray-20 p-5xs flex h-fit items-center justify-center rounded-[4px]">
              제작 전
            </div>
            <div className="sub1">6. 제작</div>
          </div>
        </section>
        <section className="border-gray-20 flex flex-col gap-y-4 rounded-[24px] border bg-white p-6">
          <div className="flex items-center gap-x-2">
            <div className="badge text-gray-40 bg-gray-20 p-5xs flex h-fit items-center justify-center rounded-[4px]">
              배송 전
            </div>
            <div className="sub1">7. 배송</div>
          </div>
        </section>
      </div>
    </main>
  )
}
