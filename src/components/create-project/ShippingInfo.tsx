import { Dispatch, SetStateAction, useEffect, useState } from 'react'
import { useProjectStore } from '@/store/projectStore'
import Button1 from '@/components/common/Button1'
import VisibilitySelect from '@/components/create-project/shipping-info/VisibilitySelect'
import CanPhoneConsultSelector from '@/components/create-project/shipping-info/CanPhoneConsultSelector'
import DeliveryAddressField from '@/components/create-project/shipping-info/DeliveryAddressField'
import { postProjectDraft, postProjectFinal, postProjectInit } from '@/lib/project'
import { UserDataType } from '@/type/common'
import { useFileUpload } from '@/hooks/useFileUpload'

interface ShippingInfoProps {
  setCurrentStep: Dispatch<SetStateAction<number>>
}
export default function ShippingInfo({ setCurrentStep }: ShippingInfoProps) {
  const projectData = useProjectStore((state) => state.projectData)
  const finalProjectData = useProjectStore((state) => state.finalProjectData)
  const projectId = useProjectStore((state) => state.projectId)

  const setState = useProjectStore((state) => state.setState)

  const [userData, setUserData] = useState<UserDataType | null>(null)

  const { uploadFiles } = useFileUpload()

  useEffect(() => {
    console.log('projectId', projectId)
  }, [])

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

  const handleProjectSubmit = async () => {
    if (!userData?.memberId) {
      console.error('사용자 정보가 없습니다.')
      return
    }
    if (!projectId) {
      console.error('프로젝트 아이디가 없습니다.')
      return
    }

    try {
      // 2. 프로젝트 최종 생성 (finalProjectData가 없을 때만 요청)
      if (!finalProjectData) {
        const res = await postProjectFinal(projectId, {
          ...projectData,
          memberId: userData.memberId,
          projectBidStatus: 'PRE_BID',
        })
        console.log('완성된 견적서', res)
        setState({ finalProjectData: res.data })
        console.log('프로젝트(공고) 생성 완료', res)
      } else {
        console.log('이미 최종 프로젝트 데이터가 존재합니다. 다시 생성하지 않습니다.')
      }

      // 3. 파일 업로드 실행
      const uploadSuccess = await uploadFiles(projectId)

      if (uploadSuccess) {
        console.log('모든 파일 업로드 완료!')
      } else {
        console.log('일부 파일 업로드 실패')
        // 파일 업로드 실패해도 다음 단계로 진행할지 결정
      }

      // 4. 다음 단계로 이동
      setCurrentStep(6)
    } catch (error) {
      console.error('프로젝트 생성 및 파일 업로드 실패:', error)
    }
  }

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
            styleStatus={'disabled'}
            styleSize={'lg'}
            styleType={'outline'}
          >
            임시저장
          </Button1>
          <Button1
            onClick={handleProjectSubmit}
            customClassName={'h-[52px] w-[260px]'}
            styleStatus={'disabled'}
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
