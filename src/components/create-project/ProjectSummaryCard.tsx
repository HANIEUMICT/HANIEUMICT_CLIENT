'use client'

import { useProposalStore } from '@/store/proposalStore'
import Image from 'next/image'

export default function ProjectSummaryCard() {
  const summaryProjectData = useProposalStore((state) => state.summaryProjectData)

  return (
    <div className="border-gray-20 p-s gap-y-xs flex h-fit w-[442px] flex-shrink-0 flex-col rounded-[24px] border bg-white whitespace-nowrap">
      <div className="flex flex-col gap-y-3">
        <p className="sub1">{summaryProjectData?.projectRegisterRequest.projectTitle}</p>
        {summaryProjectData && summaryProjectData.drawingUrls[0] ? (
          <div className="relative h-[200px] w-full">
            <Image src={summaryProjectData?.drawingUrls[0]} alt="도면" fill className="object-cover" />
          </div>
        ) : null}
      </div>
      <div className="gap-y-5xs flex flex-col">
        <div className="flex justify-between">
          <p className="body2 text-gray-40">제조 분류</p>
          <p className="button-sm text-gray-50">{summaryProjectData?.projectRegisterRequest.category}</p>
        </div>
        <div className="flex justify-between">
          <p className="body2 text-gray-40">제조 분류-세부 항목</p>
          <p className="button-sm text-gray-50">{summaryProjectData?.projectRegisterRequest.categoryDetail}</p>
        </div>
        <div className="flex justify-between">
          <p className="body2 text-gray-40">제조 사항 상세</p>
          <p className="button-sm text-gray-50">{summaryProjectData?.projectRegisterRequest.categoryDetailEtc}</p>
        </div>
        <div className="flex justify-between">
          <p className="body2 text-gray-40">제품 용도</p>
          <p className="button-sm text-gray-50">{summaryProjectData?.projectRegisterRequest.purpose}</p>
        </div>
        <div className="flex justify-between">
          <p className="body2 text-gray-40">상세 제품 용도 입력</p>
          <p className="button-sm text-gray-50">{summaryProjectData?.projectRegisterRequest.purposeEtc}</p>
        </div>
        <div className="flex justify-between">
          <p className="body2 text-gray-40">요청 제조 서비스</p>
          <p className="button-sm text-gray-50">{summaryProjectData?.projectRegisterRequest.requests}</p>
        </div>
      </div>
      <div className="border-gray-20 h-[1px] w-full border-b" />
      <div className="gap-y-5xs flex flex-col">
        <div className="flex justify-between">
          <p className="body2 text-gray-40">수량</p>
          <p className="button-sm text-gray-50">{summaryProjectData?.projectRegisterRequest.projectQuantity}개</p>
        </div>
        <div className="flex justify-between">
          <p className="body2 text-gray-40">예상 추정액</p>
          <p className="button-sm text-gray-50">
            {summaryProjectData?.projectRegisterRequest.requestEstimate?.toLocaleString()}원
          </p>
        </div>
        <div className="flex justify-between">
          <p className="body2 text-gray-40">납기일</p>
          <p className="button-sm text-gray-50">{summaryProjectData?.projectRegisterRequest.deadline}</p>
        </div>
      </div>
      <div className="border-gray-20 h-[1px] w-full border-b" />
      <div>
        <div className="flex justify-between">
          <p className="body2 text-gray-40">전화 상담 여부</p>
          <p className="button-sm text-gray-50">
            {summaryProjectData?.projectRegisterRequest.canPhoneConsult ? '가능' : '불가능'}
          </p>
        </div>
        <div className="flex justify-between">
          <p className="body2 text-gray-40">배송지</p>
          <p className="button-sm text-gray-50">{summaryProjectData?.projectRegisterRequest.deliveryAddress}</p>
        </div>
      </div>
    </div>
  )
}
