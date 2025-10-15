import { Dispatch, SetStateAction, useEffect, useMemo, useState } from 'react'
import { useProjectStore } from '@/store/projectStore'
import Button1 from '@/components/common/Button1'
import VisibilitySelect from '@/components/create-project/shipping-info/VisibilitySelect'
import CanPhoneConsultSelector from '@/components/create-project/shipping-info/CanPhoneConsultSelector'
import DeliveryAddressField from '@/components/create-project/shipping-info/DeliveryAddressField'
import { postProjectDraft } from '@/lib/project'
import { UserDataType } from '@/type/common'

interface ShippingInfoProps {
  setCurrentStep: Dispatch<SetStateAction<number>>
}
export default function ShippingInfo({ setCurrentStep }: ShippingInfoProps) {
  const projectData = useProjectStore((state) => state.projectData)
  const projectId = useProjectStore((state) => state.projectId)
  const [userData, setUserData] = useState<UserDataType | null>(null)

  // localStorage에서 userData 가져오기 (클라이언트 사이드에서만)
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const storedUserData = localStorage.getItem('userData')
      if (storedUserData) {
        try {
          const parsedUserData: UserDataType = JSON.parse(storedUserData)
          setUserData(parsedUserData)
        } catch (error) {
          console.error('userData 파싱 실패:', error)
        }
      }
    }
  }, [])

  const isFormValid = useMemo(() => {
    return !!(
      projectData.projectStatus?.trim() &&
      projectData.deliveryAddress?.trim() &&
      projectData.canPhoneConsult !== undefined
    )
  }, [projectData.projectStatus, projectData.deliveryAddress, projectData.canPhoneConsult])

  return (
    <div className="gap-y-l flex flex-col">
      <div className="flex flex-col gap-y-[16px]">
        <section className="p-s border-gray-20 flex flex-col gap-y-[12px] rounded-[24px] border bg-white">
          <h1 className="sub1">프로젝트명</h1>
          <p className="body1 text-gray-40">{projectData?.projectTitle}</p>
        </section>
        <section className="border-gray-20 flex flex-col gap-y-[16px] rounded-[24px] border bg-white p-6">
          <p className="sub1">배송 및 추가 정보입력</p>
          <VisibilitySelect />
          <CanPhoneConsultSelector />
          <DeliveryAddressField />
        </section>
      </div>

      <section className="flex justify-between">
        <Button1
          onClick={() => {
            setCurrentStep(4)
          }}
          customClassName={'h-[52px] w-[260px]'}
          styleStatus={'default'}
          styleSize={'lg'}
          styleType={'outline'}
        >
          이전
        </Button1>
        <div className="gap-x-2xs flex">
          <Button1
            onClick={async () => {
              if (projectId) {
                const response = await postProjectDraft(projectId, {
                  ...projectData,
                  submitStatus: 'TEMPORARY_SAVE',
                  memberId: userData?.memberId,
                })
                console.log('임시저장 성공', response)
              }
            }}
            customClassName={'h-[52px] w-[260px]'}
            styleStatus={'default'}
            styleSize={'lg'}
            styleType={'outline'}
          >
            임시저장
          </Button1>
          <Button1
            onClick={() => {
              setCurrentStep(6)
            }}
            customClassName={'h-[52px] w-[260px]'}
            styleStatus={isFormValid ? 'default' : 'disabled'}
            disabled={!isFormValid}
            styleType={'primary'}
            styleSize={'lg'}
          >
            다음
          </Button1>
        </div>
      </section>
    </div>
  )
}
