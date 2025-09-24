import { Dispatch, SetStateAction } from 'react'

interface SideBarProps {
  sideBarType: '내 정보' | '배송 정보' | '견적서' | '주문정보' | '관심 공급업체'
  setSideBarType: Dispatch<SetStateAction<'내 정보' | '배송 정보' | '견적서' | '주문정보' | '관심 공급업체'>>
}
export default function SideBar({ sideBarType, setSideBarType }: SideBarProps) {
  return (
    <div className="fixed left-0 h-full w-[340px] bg-white p-8">
      <h3 className="h3">마이페이지</h3>
      <section className="mt-[20px] flex flex-col gap-y-[13px]">
        <div
          onClick={() => {
            setSideBarType('내 정보')
          }}
          className="gap-x-4xs px-4xs py-3xs flex cursor-pointer items-center"
        >
          <div className="h-[40px] w-[40px]" />
          <p className={`${sideBarType === '내 정보' ? '' : 'text-gray-40'} h3`}>내 정보</p>
        </div>
        <div
          onClick={() => {
            setSideBarType('배송 정보')
          }}
          className="gap-x-4xs px-4xs py-3xs flex cursor-pointer items-center"
        >
          <div className="h-[40px] w-[40px]" />
          <p className={`${sideBarType === '배송 정보' ? '' : 'text-gray-40'} h3`}>배송 정보</p>
        </div>
        <div
          onClick={() => {
            setSideBarType('견적서')
          }}
          className="gap-x-4xs px-4xs py-3xs flex cursor-pointer items-center"
        >
          <div className="h-[40px] w-[40px]" />
          <p className={`${sideBarType === '견적서' ? '' : 'text-gray-40'} h3`}>견적서</p>
        </div>
        <div
          onClick={() => {
            setSideBarType('주문정보')
          }}
          className="gap-x-4xs px-4xs py-3xs flex cursor-pointer items-center"
        >
          <div className="h-[40px] w-[40px]" />
          <p className={`${sideBarType === '주문정보' ? '' : 'text-gray-40'} h3`}>주문정보</p>
        </div>
        <div
          onClick={() => {
            setSideBarType('관심 공급업체')
          }}
          className="gap-x-4xs px-4xs py-3xs flex cursor-pointer items-center"
        >
          <div className="h-[40px] w-[40px]" />
          <p className={`${sideBarType === '관심 공급업체' ? '' : 'text-gray-40'} h3`}>관심 공급업체</p>
        </div>
      </section>
    </div>
  )
}
