'use client'

import { useEffect, useRef, useState } from 'react'
import ProcessingBar from '@/components/create-project/ProcessingBar'
import Header from '@/components/common/Header'
import BasicInfo from '@/components/create-project/BasicInfo'
import DrawingRegistration from '@/components/create-project/DrawingRegistration'
import ProjectInfo from '@/components/create-project/ProjectInfo'
import ShippingInfo from '@/components/create-project/ShippingInfo'
import EstimateCreator from '@/components/create-project/EstimateCreator'
import { useModalStore } from '@/store/modalStore'
import { useProjectStore } from '@/store/projectStore'
import SearchAddressModal from '@/components/common/SearchAddressModal'
import ProjectLoadModal from '@/components/modal/ProjectLoadModal'
import Button1 from '@/components/common/Button1'
import { FileInfoType } from '@/type/common'
import PriorityModal from '@/components/modal/PriorityModal'

const steps = ['로그인', '기본정보', '도면등록', '프로젝트 정보', '배송 정보 입력', '견적서 생성']

export default function CreateProjectPage() {
  const [currentStep, setCurrentStep] = useState<number>(2)

  const posterImgRef = useRef<HTMLInputElement | null>(null)

  const [hasDrawingSelected, setHasDrawingSelected] = useState<boolean | undefined>(undefined)
  const isSearchAddressModalOpen = useModalStore((state) => state.isSearchAddressModalOpen)
  const isEstimateModalOpen = useModalStore((state) => state.isEstimateModalOpen)

  const setModalState = useModalStore((state) => state.setState)
  const projectData = useProjectStore((state) => state.projectData)
  const responseDrawingUrls = useProjectStore((state) => state.responseDrawingUrls)

  const setState = useProjectStore((state) => state.setState)

  const [isPriorityModalOpen, setIsPriorityModalOpen] = useState<boolean>(false)

  const fileInfoList = useProjectStore((state) => state.fileInfoList)

  useEffect(() => {
    if (responseDrawingUrls) {
      setHasDrawingSelected(true)
    }
  }, [responseDrawingUrls])

  useEffect(() => {
    return () => {
      setState({ projectData: undefined, fileInfoList: undefined, responseDrawingUrls: undefined })
    }
  }, [])

  /**
   * 파일 크기를 읽기 쉬운 형태로 변환
   */
  const formatFileSize = (bytes: number | undefined): string => {
    if (bytes === 0 || bytes === undefined) return '0 Bytes'

    const k = 1024
    const sizes = ['Bytes', 'KB', 'MB', 'GB']
    const i = Math.floor(Math.log(bytes) / Math.log(k))

    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i]
  }

  /**
   * 고유 ID 생성
   */
  const generateId = (): string => {
    return Date.now().toString() + Math.random().toString(36).substr(2, 9)
  }

  /**
   * 이미지 미리보기 설정 (다중 파일)
   */
  const handleImagePreview = async () => {
    const files = posterImgRef.current?.files

    if (files && files.length > 0) {
      const newFileInfoList: FileInfoType[] = []

      // 각 파일에 대해 처리
      for (let i = 0; i < files.length; i++) {
        const file = files[i]
        const reader = new FileReader()

        await new Promise<void>((resolve) => {
          reader.onloadend = () => {
            newFileInfoList.push({
              id: generateId(),
              name: file.name,
              size: file.size,
              url: reader.result,
            })
            resolve()
          }
          reader.readAsDataURL(file)
        })
      }

      // 기존 파일 목록에 추가
      setState({
        fileInfoList: [...(fileInfoList || []), ...newFileInfoList],
      })
    }
  }

  /**
   * 파일 삭제
   */
  const handleRemoveFile = (fileId: string) => {
    setState({
      fileInfoList: (fileInfoList || []).filter((file) => file.id !== fileId),
    })
  }

  /**
   * 카카오 주소 데이터 불러오기
   * @param data
   */
  const handleComplete = async (data: any) => {
    let fullAddress = data.address
    let extraAddress = ''

    const { addressType, bname, buildingName, zonecode } = data
    console.log('data', data)

    if (addressType === 'R') {
      if (bname !== '') {
        extraAddress += bname
      }
      if (buildingName !== '') {
        extraAddress += `${extraAddress !== '' && ', '}${buildingName}`
      }
      fullAddress += `${extraAddress !== '' ? ` ${extraAddress}` : ''}`
    }
    setState({
      ...projectData,
      projectData: { ...projectData, deliveryAddress: zonecode },
    })

    setModalState({ isSearchAddressModalOpen: false })
  }

  return (
    <main className="flex flex-col items-center justify-center">
      {isPriorityModalOpen && <PriorityModal />}
      {isSearchAddressModalOpen && <SearchAddressModal handleComplete={handleComplete} />}
      {isEstimateModalOpen && <ProjectLoadModal setCurrentStep={setCurrentStep} />}
      <Header headerType={'DEFAULT'} />
      <div className="mt-[180px] mb-[120px] flex w-[1280px] flex-col gap-y-[32px]">
        <div className="flex justify-between">
          <h2 className="h2">견적서 작성하기</h2>
          <Button1
            onClick={() => {}}
            styleType="primary"
            styleStatus={'default'}
            styleSize={'sm'}
            customClassName={'rounded-full h-[36px]'}
          >
            AI 자동 견적서 생성
          </Button1>
        </div>
        <ProcessingBar steps={steps} currentStep={currentStep} />
        {currentStep === 2 && <BasicInfo setCurrentStep={setCurrentStep} />}
        {currentStep === 3 && <DrawingRegistration setCurrentStep={setCurrentStep} />}
        {currentStep === 4 && (
          <ProjectInfo
            hasDrawingSelected={hasDrawingSelected}
            setHasDrawingSelected={setHasDrawingSelected}
            posterImgRef={posterImgRef}
            setCurrentStep={setCurrentStep}
          />
        )}
        {currentStep === 5 && <ShippingInfo setCurrentStep={setCurrentStep} />}
        {currentStep === 6 && (
          <EstimateCreator setCurrentStep={setCurrentStep} setIsPriorityModalOpen={setIsPriorityModalOpen} />
        )}
      </div>
    </main>
  )
}
