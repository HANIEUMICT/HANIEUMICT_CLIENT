import Image from 'next/image'
import Button1 from '@/components/common/Button1'
import { Dispatch, SetStateAction } from 'react'

interface CompanyDetailCardModalProps {
  setIsCompanyDetailCardModalOpen: Dispatch<SetStateAction<boolean>>
}

export default function CompanyDetailCardModal({ setIsCompanyDetailCardModalOpen }: CompanyDetailCardModalProps) {
  return (
    <div className="fixed inset-0 z-60 flex items-center justify-center bg-[rgba(0,0,0,0.3)]">
      <div className="flex h-[760px] w-[1220px] rounded-[24px] bg-white">
        <div className="relative h-[760px] w-[760px] flex-shrink-0">
          <Image src="/company-graphic.svg" alt="사진" fill className="rounded-l-[24px] object-cover" />
        </div>

        <div className="relative flex w-fit flex-col gap-y-5 p-5">
          <p className="h3">수중드론</p>
          <div className="flex justify-between">
            <p className="sub2 text-gray-40">보유수</p>
            <p className="body1">3대</p>
          </div>

          <div className="flex flex-col gap-y-1">
            <p className="sub2 text-gray-40">수중드론</p>
            <p className="body1">
              수중 드론은 원격 조종(Remotely Operated Vehicle, ROV) 방식의 소형 수중 로봇으로, 해저 수십~수백 미터 심층
              탐사와 정밀 영상 촬영이 가능합니다. 주요 특징은 다음과 같습니다. 4K 또는 Full HD 카메라 내장, 안정된 영상
              촬영과 실시간 스트리밍 기능 탑재 다방향 추진(벡터 스러스터) 시스템이 있어 수평·수직·회전 등 360° 자유 이동
              가능 LED 조명 및 레이저, 센서장비 부착 가능, 어두운 환경에서도 선명한 촬영과 정밀 거리 측정 가능 Drone
              U™+1Digital Camera World+1 케이블(티더)로 연결되어 있어 저지연 제어 및 데이터 전송이 우수하며, 안정적인
              원격 조작 환경 제공 이 장비는 다음과 같은 용도에 최적화되어 있습니다 해저 지형 및 구조물 정밀 조사 (예:
              해안·교량·연구선 점검) 해양 생태계 촬영 및 수중 동영상 콘텐츠 제작
            </p>
          </div>
          <Button1
            customClassName={'absolute bottom-5 right-5 w-[160px]'}
            styleType={'outline'}
            onClick={() => {
              setIsCompanyDetailCardModalOpen(false)
            }}
            styleStatus={'default'}
            styleSize={'lg'}
          >
            닫기
          </Button1>
        </div>
      </div>
    </div>
  )
}
