import Button1 from '@/components/common/Button1'
import Input from '@/components/common/Input'
import { CancelIcon, ImgUploadIcon, PlusIcon, UploadIcon } from '@/assets/svgComponents'
import { Dispatch, RefObject, SetStateAction, useEffect, useState } from 'react'
import { useRegisterFactoryStore } from '@/store/register-factory'
import { RegisterFactoryEquipmentType } from '@/type/register-factory'
import Image from 'next/image'
import { FileInfoType } from '@/type/common'
import AddEquipmentModal from '@/components/modal/AddEquipmentModal'

interface EquipmentInfoProps {
  setCurrentStep: Dispatch<SetStateAction<number>>
  equipmentImageRef: RefObject<HTMLInputElement | null>
}

export default function EquipmentInfo({ setCurrentStep, equipmentImageRef }: EquipmentInfoProps) {
  const setState = useRegisterFactoryStore((state) => state.setState)
  const registerFactoryData = useRegisterFactoryStore((state) => state.registerFactoryData)
  const [equipmentData, setEquipmentData] = useState<RegisterFactoryEquipmentType>({})
  const [isFormOpen, setIsFormOpen] = useState(false)
  const [editingIndex, setEditingIndex] = useState<number | null>(null) // 🔥 수정 중인 인덱스

  useEffect(() => {
    console.log('registerFactoryData', registerFactoryData)
  }, [registerFactoryData])

  /**
   * imageUrls에서 첫 번째 URL 추출 (대표 이미지)
   */
  const getImageUrl = (imageUrls: string | FileInfoType | FileInfoType[] | undefined): string => {
    if (!imageUrls) return ''
    if (typeof imageUrls === 'string') return imageUrls
    if (Array.isArray(imageUrls) && imageUrls.length > 0) {
      const firstImage = imageUrls[0]
      return typeof firstImage === 'string' ? firstImage : (firstImage.url as string)
    }
    if ('url' in imageUrls) return imageUrls.url as string
    return ''
  }

  /**
   * imageUrls에서 alt 텍스트 추출
   */
  const getImageAlt = (imageUrls: string | FileInfoType | FileInfoType[] | undefined): string => {
    if (!imageUrls) return 'equipment image'
    if (typeof imageUrls === 'string') return 'equipment image'
    if (Array.isArray(imageUrls) && imageUrls.length > 0) {
      const firstImage = imageUrls[0]
      return typeof firstImage === 'string' ? 'equipment image' : firstImage.name || firstImage.id || 'equipment image'
    }
    if ('name' in imageUrls) return imageUrls.name || imageUrls.id || 'equipment image'
    return 'equipment image'
  }

  /**
   * 장비 삭제
   */
  const handleRemoveEquipment = (indexToRemove: number) => {
    if (!confirm('이 장비를 삭제하시겠습니까?')) {
      return
    }

    const updatedEquipments = registerFactoryData?.equipments?.filter((_, index) => index !== indexToRemove)

    setState({
      registerFactoryData: {
        ...registerFactoryData,
        equipments: updatedEquipments,
      },
    })
  }

  /**
   * 장비 추가 모달 열기
   */
  const handleAddEquipment = () => {
    setEquipmentData({}) // 빈 데이터
    setEditingIndex(null) // 추가 모드
    setIsFormOpen(true)
  }

  /**
   * 장비 수정 모달 열기
   */
  const handleEditEquipment = (equipment: RegisterFactoryEquipmentType, index: number) => {
    setEquipmentData(equipment) // 기존 데이터
    setEditingIndex(index) // 수정 모드
    setIsFormOpen(true)
  }

  return (
    <div>
      {isFormOpen && (
        <AddEquipmentModal
          equipmentData={equipmentData}
          setEquipmentData={setEquipmentData}
          equipmentImageRef={equipmentImageRef}
          setIsFormOpen={setIsFormOpen}
          editingIndex={editingIndex} // 🔥 수정 중인 인덱스 전달
          setEditingIndex={setEditingIndex}
        />
      )}
      <div className="border-gray-20 flex flex-col gap-y-3 rounded-[24px] border bg-white p-6">
        <div className="flex items-center justify-between">
          <h2 className="sub1">보유 장비 추가</h2>
          <Button1
            onClick={handleAddEquipment}
            leftIcon={<PlusIcon width={16} height={16} />}
            styleSize={'md'}
            styleType={'secondary'}
          >
            장비 추가
          </Button1>
        </div>
        {registerFactoryData?.equipments?.map((equipment, index) => {
          return (
            <section
              onClick={() => handleEditEquipment(equipment, index)}
              key={`${equipment.name}-${index}`}
              className="border-gray-20 p-xs gap-x-xs hover:bg-gray-10 flex cursor-pointer rounded-[20px] border transition-colors"
            >
              {equipment.imageUrls && (
                <div className="relative h-[189px] w-[317px]">
                  <Image
                    src={getImageUrl(equipment.imageUrls[0])}
                    alt={getImageAlt(equipment.imageUrls[0])}
                    fill
                    className="rounded-[16px] object-cover"
                  />
                </div>
              )}

              <div className="flex w-full flex-col gap-y-5">
                <div className="flex items-center justify-between">
                  <h3 className="h3">{equipment.name}</h3>
                  <button
                    onClick={(e) => {
                      e.stopPropagation()
                      handleRemoveEquipment(index)
                    }}
                    className={
                      'border-gray-20 hover:border-gray-30 flex h-[36px] w-[100px] items-center justify-center rounded-[8px] border transition-colors'
                    }
                    type={'button'}
                  >
                    <CancelIcon width={12} height={12} />
                  </button>
                </div>

                <div className="flex flex-col gap-y-2">
                  <div className="gap-x-4xs flex">
                    <div className="sub2 text-gray-40">보유수</div>
                    <p className="body1">{equipment.quantity}</p>
                  </div>
                  <div className="flex flex-col gap-y-1">
                    <div className="sub2 text-gray-40">장비 설명</div>
                    <p className="body1">{equipment.description}</p>
                  </div>
                </div>
              </div>
            </section>
          )
        })}
      </div>

      <div className="mt-[40px] mb-[100px] flex justify-between">
        <Button1
          onClick={() => {
            setCurrentStep(1)
          }}
          customClassName={'w-[260px]'}
          styleType={'outline'}
        >
          이전
        </Button1>
        <Button1
          onClick={() => {
            setCurrentStep(3)
          }}
          customClassName={'w-[260px]'}
          styleType={'primary'}
        >
          다음
        </Button1>
      </div>
    </div>
  )
}
