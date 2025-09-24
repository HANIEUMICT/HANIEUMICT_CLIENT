import { useProjectStore } from '@/store/projectStore'

interface FinalShippingAndExtraInfoProps {}
export default function FinalShippingAndExtraInfo({}: FinalShippingAndExtraInfoProps) {
  const finalProjectData = useProjectStore((state) => state.finalProjectData)

  const convertProjectStatus = (projectStatus: string | undefined | null | 'PUBLIC' | 'PRIVATE' | 'PROTECTED') => {
    switch (projectStatus) {
      case 'PUBLIC':
        return '공개'
      case 'PRIVATE':
        return '비공개'
      case 'PROTECTED':
        return '일부 공개'
    }
  }

  return (
    <section className="border-gray-20 flex w-[1063px] flex-col gap-y-[16px] rounded-[24px] border bg-white p-6">
      <h1 className="sub1">배송 및 추가 정보입력</h1>
      <section className="flex flex-col gap-y-[16px]">
        <div className="flex justify-between">
          <div className="flex flex-col gap-y-[12px]">
            <p className="sub2">견적서 공개 여부</p>
            <p className="body1 text-gray-40">
              비공개
              {/*{convertProjectStatus(finalProjectData?.projectRegisterRequest.projectStatus)}*/}
            </p>
          </div>
          <div className="flex w-[300px] flex-col gap-y-[12px]">
            <p className="sub2">전화 상담 여부</p>
            <p className="body1 text-gray-40">
              가능 (담당자: 홍길동, 010-1234-5678)
              {/*{finalProjectData?.projectRegisterRequest.canPhoneConsult ? '가능' : '불가능'}*/}
            </p>
          </div>
        </div>
        <div className="flex w-full flex-col gap-y-[12px]">
          <p className="sub2">배송지</p>
          <div className="gap-y-2xs p-s border-gray-20 flex w-full flex-col rounded-[24px] border">
            <p className="sub1">(주)알파정밀</p>
            <div className="gap-x-4xs flex">
              <p className="text-gray-40 body1">주소</p>
              <p className="sub2 text-gray-50">
                경기도 평택시 포승읍 ***로 123-45
                {/*{finalProjectData?.projectRegisterRequest.deliveryAddress}*/}
              </p>
            </div>
          </div>
        </div>
      </section>
    </section>
  )
}
