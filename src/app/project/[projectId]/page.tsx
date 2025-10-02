'use client'

import BidderList from '@/components/create-project/BidderList'
import Header from '@/components/common/Header'
import FinalShippingAndExtraInfo from '@/components/create-project/detail/FinalShippingAndExtraInfo'
import FinalBasicInfo from '@/components/create-project/detail/FinalBasicInfo'
import FinalRequestCondition from '@/components/create-project/detail/FinalRequestCondition'
import Button1 from '@/components/common/Button1'
import { usePathname, useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { getProjectDetail } from '@/lib/project'
import { ProjectDetailResponseType } from '@/type/project'

export default function ProjectDetailPage() {
  const router = useRouter()
  const pathName = usePathname()
  const [projectDetailData, setProjectDetailData] = useState<ProjectDetailResponseType | undefined>()

  useEffect(() => {
    const projectId = pathName.split('/').pop()
    getProjectDetail(projectId).then((response) => {
      if (response.result === 'SUCCESS' && response.data) {
        setProjectDetailData(response.data)
      }
    })
  }, [pathName])

  return (
    <main className="flex flex-col items-center justify-center">
      <Header headerType={'DEFAULT'} />
      <div className="gap-y-l mx-auto mt-[120px] flex h-[80px] flex-col">
        <div className="flex w-full items-center justify-between">
          <h2 className="h2">견적서 상세보기</h2>
          <Button1
            onClick={() => {
              router.back()
            }}
            styleType={'outline'}
            styleStatus={'default'}
            styleSize={'sm'}
            customClassName={'rounded-full text-gray-40 h-[36px]'}
          >
            나가기
          </Button1>
        </div>

        <div className="flex gap-x-[24px]">
          <div className="flex flex-col gap-y-[16px]">
            <FinalBasicInfo />
            <FinalRequestCondition />
            <FinalShippingAndExtraInfo />
          </div>
          <BidderList />
        </div>
      </div>
    </main>
  )
}
