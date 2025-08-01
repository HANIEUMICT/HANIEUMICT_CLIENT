import Image from 'next/image'
import { RightIcon } from '@/assets/svgComponents'
import { LeftIcon } from '@/assets/svgComponents'

export default function EquipmentModal(){
    return(
        <div className=" flex w-[1220px] h-[760px] p-2xs bg-white rounded-[24px]">
            <div className="flex items-center relative h-[760px] w-[760px] rounded-l-[24px]">
                <Image src={'/test.png'} alt="사진" fill className="object-cover rounded-l-[24px]"></Image>
                {/* 슬라이드 화살표 왼쪽 오른쪽 구현 해야함 */}
                <div className='flex justify-between px-[20px]'>
                </div>
                {/* 밑에 동그라미 세개 표시*/}
                <div className='flex'>
                </div>
                
            </div>
            <div className="flex flex-col justify-between w-[460px] h-[760px] rounded-r-[24px] p-[20px]">
                <div className="flex flex-col gap-[20px] w-[420px] h-[530px]">
                    <p className="h3">수중드론</p>
                    <div className="flex items-center justify-between">
                        <p className="text-gray-40 sub2">보유수</p>
                        <p className="body2">2대</p>
                    </div>
                    <div className="flex flex-col">
                        <p className="sub2 text-gray-40">장비 설명</p>
                        <p className="body1">
                            수중 드론은 원격 조종(Remotely Operated Vehicle, ROV) 방식의 소형 수중 로봇으로, 해저 수십~수백 미터 심층 탐사와 정밀 영상 촬영이 가능합니다. 주요 특징은 다음과 같습니다. <br />
                            <br />
                            • 4K 또는 Full HD 카메라 내장, 안정된 영상 촬영과 실시간 스트리밍 기능 탑재<br />
                            • 다방향 추진(벡터 스러스터) 시스템이 있어 수평·수직·회전 등 360° 자유 이동 가능<br />
                            • LED 조명 및 레이저, 센서장비 부착 가능, 어두운 환경에서도 선명한 촬영과 정밀 거리 측정 가능 Drone U™+1Digital Camera World+1<br />
                            • 케이블(티더)로 연결되어 있어 저지연 제어 및 데이터 전송이 우수하며, 안정적인 원격 조작 환경 제공<br />
                            <br />
                            이 장비는 다음과 같은 용도에 최적화되어 있습니다<br />
                            • 해저 지형 및 구조물 정밀 조사 (예: 해안·교량·연구선 점검)<br />
                            • 해양 생태계 촬영 및 수중 동영상 콘텐츠 제작
                        </p>

                    </div>
                </div>
                <div className="flex justify-end">
                    <div className="flex items-center justify-center w-[160px] h-[52px] rounded-[12px] p-2xs border border-gray-20">
                        <p className="button_lg text-gray-50">닫기</p>
                    </div>
                </div>
                
            </div>

        </div>
    )
}