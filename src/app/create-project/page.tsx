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
import Modal from '@/components/common/Modal'
import Input from '@/components/common/Input'
import { StarIcon, UploadIcon } from '@/assets/svgComponents'
import UploadItem from '@/components/common/UploadItem'
import { FileInfoType } from '@/type/common'
import Image from 'next/image'

const steps = ['로그인', '기본정보', '도면등록', '프로젝트 정보', '배송 정보 입력', '견적서 생성']

export default function CreateProjectPage() {
  const [currentStep, setCurrentStep] = useState<number>(2)

  const posterImgRef = useRef<HTMLInputElement | null>(null)

  const [hasDrawingSelected, setHasDrawingSelected] = useState<boolean | undefined>(undefined)
  const isSearchAddressModalOpen = useModalStore((state) => state.isSearchAddressModalOpen)
  const isEstimateModalOpen = useModalStore((state) => state.isEstimateModalOpen)

  const setModalState = useModalStore((state) => state.setState)
  const projectData = useProjectStore((state) => state.projectData)
  const setState = useProjectStore((state) => state.setState)

  //테스트용 modal
  const [step, setStep] = useState(undefined)
  const [testModal, setTestModal] = useState(true)
  const [list, setList] = useState<number[]>([])

  useEffect(() => {
    if (step === 3) {
      const timer = setTimeout(() => {
        setStep(4)
      }, 3000)
      return () => clearTimeout(timer)
    }
  }, [step])

  const fileInfoList = useProjectStore((state) => state.fileInfoList)

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
      {testModal && (
        <Modal>
          <div>
            <div className="flex flex-col gap-y-2">
              <div className="h2">중요 우선순위를 정해주세요.</div>
              <div className="text-gray-50">우선순위를 기반으로 CONIC이 공급업체를 추천해드릴께요.</div>
            </div>

            <div className="mt-5 flex flex-col gap-y-2">
              <div
                onClick={() => {
                  setList((prev) => [...prev, 1])
                }}
                className={`${list.includes(1) ? 'bg-gray-20 sub2 border-conic-red-30 flex h-[64px] items-center gap-x-3 rounded-[32px] border p-2' : 'bg-gray-20 sub2 flex h-[64px] items-center gap-x-3 rounded-[32px] p-2'}`}
              >
                <div className="sub2 flex h-[48px] w-[48px] items-center justify-center rounded-full bg-white">1</div>
                신뢰도 있는 기업이었으면 좋겠어요.
              </div>
              <div
                onClick={() => {
                  setList((prev) => [...prev, 2])
                }}
                className={`${list.includes(2) ? 'bg-gray-20 sub2 border-conic-red-30 flex h-[64px] items-center gap-x-3 rounded-[32px] border p-2' : 'bg-gray-20 sub2 flex h-[64px] items-center gap-x-3 rounded-[32px] p-2'}`}
              >
                <div className="sub2 flex h-[48px] w-[48px] items-center justify-center rounded-full bg-white">2</div>
                답변 속도가 빨랐으면 좋겠어요.
              </div>
              <div
                onClick={() => {
                  setList((prev) => [...prev, 3])
                }}
                className={`${list.includes(3) ? 'bg-gray-20 sub2 border-conic-red-30 flex h-[64px] items-center gap-x-3 rounded-[32px] border p-2' : 'bg-gray-20 sub2 flex h-[64px] items-center gap-x-3 rounded-[32px] p-2'}`}
              >
                <div className="sub2 flex h-[48px] w-[48px] items-center justify-center rounded-full bg-white">3</div>
                합리적 가격으로 거래했으면 좋겠어요.
              </div>
              <div
                onClick={() => {
                  setList((prev) => [...prev, 4])
                }}
                className={`${list.includes(4) ? 'bg-gray-20 sub2 border-conic-red-30 flex h-[64px] items-center gap-x-3 rounded-[32px] border p-2' : 'bg-gray-20 sub2 flex h-[64px] items-center gap-x-3 rounded-[32px] p-2'}`}
              >
                <div className="sub2 flex h-[48px] w-[48px] items-center justify-center rounded-full bg-white">4</div>
                퀄리티가 좋은 공급업체였으면 좋겠어요.
              </div>
              <div
                onClick={() => {
                  setList((prev) => [...prev, 5])
                }}
                className={`${list.includes(5) ? 'bg-gray-20 sub2 border-conic-red-30 flex h-[64px] items-center gap-x-3 rounded-[32px] border p-2' : 'bg-gray-20 sub2 flex h-[64px] items-center gap-x-3 rounded-[32px] p-2'}`}
              >
                <div className="sub2 flex h-[48px] w-[48px] items-center justify-center rounded-full bg-white">5</div>
                제작 기간이 빠른 공장이었으면 좋겠어요.
              </div>
            </div>

            <div className="mt-s flex gap-x-3">
              <Button1
                onClick={() => {}}
                styleSize={'lg'}
                styleStatus={'default'}
                styleType={'outline'}
                customClassName={'w-full'}
              >
                닫기
              </Button1>
              <Button1
                onClick={() => {
                  setTestModal(false)
                }}
                styleSize={'lg'}
                styleStatus={'default'}
                styleType={'primary'}
                customClassName={'w-full'}
              >
                완료
              </Button1>
            </div>
          </div>
        </Modal>
      )}
      {step !== undefined && (
        <Modal customClassName={''}>
          {step === 1 ? (
            <div>
              <div className="gap-y-4xs flex flex-col">
                <div className="h2">만들고자 하는 상품은 무엇인가요?</div>
                <div className="flex flex-col gap-y-2">
                  <div className="sub2">
                    상품명 <span className="text-conic-red-30">*</span>
                  </div>
                  <Input inputBoxStyle={'default'} placeholder={'ex) 티백이 플러내리지 않는 종이컵'} />
                </div>
                <div className="flex flex-col gap-y-2">
                  <div className="sub2">
                    상품에 대한 구체적인 설명 <span className="text-conic-red-30">*</span>
                  </div>
                  <textarea
                    placeholder={'상품에 대해 구체적으로 설명해주세요.'}
                    className={'border-gray-20 p-2xs h-[180px] rounded-[16px] border placeholder:text-gray-50'}
                  />
                </div>
              </div>
              <div className="mt-s flex gap-x-3">
                <Button1
                  onClick={() => {}}
                  styleSize={'lg'}
                  styleStatus={'default'}
                  styleType={'outline'}
                  customClassName={'w-full'}
                >
                  닫기
                </Button1>
                <Button1
                  onClick={() => {
                    setStep(2)
                  }}
                  styleSize={'lg'}
                  styleStatus={'default'}
                  styleType={'primary'}
                  customClassName={'w-full'}
                >
                  다음
                </Button1>
              </div>
            </div>
          ) : null}
          {step === 2 ? (
            <div className="flex flex-col gap-y-[12px]">
              <div className="h2">원하는 상품의 스케치를 업로드 해주세요.</div>
              <p className="body1 text-gray-50">원하는 상품의 스케치를 업로드하면 CONIC이 이미지를 만들어줍니다!</p>
              <div className="gap-y-4xs flex flex-col">
                <p className="sub2">
                  상품 스케치 업로드<span className="text-conic-red-30">*</span>
                </p>
                <div onClick={() => posterImgRef.current?.click()} className="relative">
                  <div className="border-gray-20 pr-2xs flex h-[52px] w-fit w-full items-center justify-center gap-x-2 rounded-[12px] border pl-3">
                    <UploadIcon width={20} height={20} />
                    <p className="button text-gray5">파일 업로드</p>
                  </div>
                  <input
                    type="file"
                    id={'input-file'}
                    ref={posterImgRef}
                    name="input-file"
                    onChange={handleImagePreview}
                    className="hidden"
                  />
                </div>
                {fileInfoList && fileInfoList.length > 0 ? (
                  <div className="flex flex-col gap-y-2">
                    {fileInfoList.map((fileInfo) => (
                      <UploadItem
                        customClassName={'w-full'}
                        key={fileInfo.id}
                        imageSize={formatFileSize(fileInfo.size)}
                        ImageUrl={fileInfo.url}
                        ImageUrlName={fileInfo.name}
                        onRemove={() => handleRemoveFile(fileInfo.id)} // 삭제 기능 추가
                      />
                    ))}
                  </div>
                ) : (
                  <p className="body1 text-conic-orange-40">
                    도면 혹은 프로젝트를 제작하는 데 도움이 되는 파일을 모두 업로드해주세요
                  </p>
                )}
              </div>
              <div className="mt-[76px] flex gap-x-3">
                <Button1
                  onClick={() => {
                    setStep(1)
                  }}
                  styleSize={'lg'}
                  styleStatus={'default'}
                  styleType={'outline'}
                  customClassName={'w-full'}
                >
                  이전
                </Button1>
                <Button1
                  onClick={() => {
                    setStep(3)
                  }}
                  styleSize={'lg'}
                  styleStatus={'default'}
                  styleType={'primary'}
                  customClassName={'w-full'}
                >
                  다음
                </Button1>
              </div>
            </div>
          ) : null}
          {step === 3 ? (
            <div className="flex h-[200px] flex-col items-center justify-center">
              <div className="h2">CONIC이 열심히 만들고 있어요!</div>
              <div className="text-gray-50">잠시만 기다려주세요</div>
            </div>
          ) : null}
          {step === 4 ? (
            <div>
              <div className="flex h-[300px] flex-col items-center justify-center gap-y-2">
                <div className="flex w-full justify-between">
                  <div className="h2">완료되었습니다!</div>
                  <Button1 onClick={() => {}} styleStatus={'default'} styleType={'primary'} styleSize={'sm'}>
                    다시 만들기
                  </Button1>
                </div>
                <div className="relative h-[292px] w-full">
                  <Image src={'/test/result.png'} alt={'sdf'} fill className={'object-cover'} />
                </div>
              </div>
              <div className="mt-s flex gap-x-3">
                <Button1
                  onClick={() => {
                    setStep(undefined)
                  }}
                  styleSize={'lg'}
                  styleStatus={'default'}
                  styleType={'outline'}
                  customClassName={'w-full'}
                >
                  닫기
                </Button1>
              </div>
            </div>
          ) : null}
        </Modal>
      )}
      {isSearchAddressModalOpen && <SearchAddressModal handleComplete={handleComplete} />}
      {isEstimateModalOpen && <ProjectLoadModal setCurrentStep={setCurrentStep} />}
      <Header headerType={'DEFAULT'} />
      <div className="mt-[180px] mb-[120px] flex w-[1280px] flex-col gap-y-[32px]">
        <div className="flex justify-between">
          <h2 className="h2">견적서 작성하기</h2>
          <Button1
            onClick={() => {
              setStep(1)
            }}
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
        {currentStep === 6 && <EstimateCreator setCurrentStep={setCurrentStep} />}
      </div>
    </main>
  )
}
