import Modal from '@/components/common/Modal'
import Button1 from '@/components/common/Button1'
import Input from '@/components/common/Input'
import { ImgUploadIcon } from '@/assets/svgComponents'
import ImageUploadItem from '@/components/common/ImageUploadItem'
import { useRegisterFactoryStore } from '@/store/register-factory'
import { Dispatch, RefObject, SetStateAction, useEffect, useState } from 'react'
import { RegisterFactoryEquipmentType } from '@/type/register-factory'
import { generateId } from '@/utils/upload'
import { FileInfoType } from '@/type/common'

interface AddEquipmentModalProps {
  equipmentData: RegisterFactoryEquipmentType
  setEquipmentData: Dispatch<SetStateAction<RegisterFactoryEquipmentType>>
  equipmentImageRef: RefObject<HTMLInputElement | null>
  setIsFormOpen: Dispatch<SetStateAction<boolean>>
  editingIndex: number | null
  setEditingIndex: Dispatch<SetStateAction<number | null>>
}

export default function AddEquipmentModal({
  equipmentData,
  setEquipmentData,
  equipmentImageRef,
  setIsFormOpen,
  editingIndex,
  setEditingIndex,
}: AddEquipmentModalProps) {
  const setState = useRegisterFactoryStore((state) => state.setState)
  const registerFactoryData = useRegisterFactoryStore((state) => state.registerFactoryData)
  const equipmentImageFileList = useRegisterFactoryStore((state) => state.equipmentImageFileList)

  // 🔥 모달이 열릴 때 모든 데이터 초기화
  useEffect(() => {
    if (editingIndex !== null) {
      const targetEquipment = registerFactoryData?.equipments?.[editingIndex]

      if (targetEquipment) {
        setEquipmentData({
          name: targetEquipment.name,
          quantity: targetEquipment.quantity,
          description: targetEquipment.description,
          imageUrls: targetEquipment.imageUrls,
        })

        // 🔥 imageUrls를 FileInfoType[]로 변환
        if (targetEquipment.imageUrls) {
          const fileList = Array.isArray(targetEquipment.imageUrls)
            ? targetEquipment.imageUrls.map((item, index) => {
                // 이미 FileInfoType 형태면 그대로 반환
                if (typeof item === 'object' && 'id' in item && 'url' in item) {
                  return item as FileInfoType
                }
                // string이면 FileInfoType으로 변환
                return {
                  id: `existing-${index}`,
                  name: `image-${index}`,
                  url: typeof item === 'string' ? item : (item as FileInfoType).url,
                  size: 0,
                } as FileInfoType
              })
            : []

          setState({
            equipmentImageFileList: fileList,
          })
        }
      }
    } else {
      setEquipmentData({})
      setState({
        equipmentImageFileList: [],
      })
    }

    return () => {
      setState({
        equipmentImageFileList: [],
      })
    }
  }, [editingIndex])

  /**
   * 이미지 미리보기 설정 (여러 파일)
   */
  const handleImagePreview = async () => {
    const files = equipmentImageRef.current?.files

    if (files && files.length > 0) {
      const fileArray = Array.from(files)

      const newFiles = await Promise.all(
        fileArray.map((file) => {
          return new Promise<{ id: string; name: string; size: number; url: string | ArrayBuffer | null }>(
            (resolve) => {
              const reader = new FileReader()

              reader.onloadend = () => {
                resolve({
                  id: generateId(),
                  name: file.name,
                  size: file.size,
                  url: reader.result,
                })
              }
              reader.readAsDataURL(file)
            }
          )
        })
      )

      setState({
        equipmentImageFileList: [...(equipmentImageFileList || []), ...newFiles],
      })
    }
  }

  /**
   * 특정 파일 삭제
   */
  const handleRemoveFile = (id: string) => {
    setState({
      equipmentImageFileList: equipmentImageFileList?.filter((file) => file.id !== id),
    })
  }

  /**
   * 장비 추가/수정 완료
   */
  const handleCompleteEquipment = () => {
    // 유효성 검사
    if (
      !equipmentData.name ||
      !equipmentData.quantity ||
      !equipmentData.description ||
      !equipmentImageFileList ||
      equipmentImageFileList.length === 0
    ) {
      alert('모든 필수 항목을 입력해주세요.')
      return
    }

    // 이미지 URL 배열 포함한 완성된 장비 데이터
    const completedEquipment: RegisterFactoryEquipmentType = {
      name: equipmentData.name,
      quantity: equipmentData.quantity,
      description: equipmentData.description,
      imageUrls: equipmentImageFileList,
    }

    let updatedEquipments

    if (editingIndex !== null) {
      // 수정 모드: 기존 장비 업데이트
      updatedEquipments = registerFactoryData?.equipments?.map((equipment, index) =>
        index === editingIndex ? completedEquipment : equipment
      )
    } else {
      // 추가 모드: 새 장비 추가
      updatedEquipments = [...(registerFactoryData?.equipments || []), completedEquipment]
    }

    // Zustand store 업데이트
    setState({
      registerFactoryData: {
        ...registerFactoryData,
        equipments: updatedEquipments,
      },
      equipmentImageFileList: [],
    })

    // 폼 초기화 및 닫기
    setEquipmentData({})
    setEditingIndex(null)
    setIsFormOpen(false)

    // file input 초기화
    if (equipmentImageRef.current) {
      equipmentImageRef.current.value = ''
    }
  }

  /**
   * 모달 닫기 핸들러
   */
  const handleClose = () => {
    setIsFormOpen(false)
    setEditingIndex(null)
    setEquipmentData({})
    setState({ equipmentImageFileList: [] })

    // file input 초기화
    if (equipmentImageRef.current) {
      equipmentImageRef.current.value = ''
    }
  }

  return (
    <Modal>
      <Modal.Content>
        <div className="gap-y-2xs flex flex-col">
          <h2 className="h2">{editingIndex !== null ? '장비 수정' : '장비 추가'}</h2>
          <section className="flex flex-col gap-y-2">
            <p className="gap-x-5xs sub2 flex">
              장비 이름 <span className="text-conic-red-30">*</span>
            </p>
            <Input
              value={equipmentData.name || ''}
              onChange={(e) => {
                setEquipmentData((prev) => ({ ...prev, name: e.target.value }))
              }}
              inputBoxStyle={'default'}
              placeholder={'장비 이름을 입력해주세요.'}
            />
          </section>
          <section className="flex flex-col gap-y-2">
            <p className="gap-x-5xs sub2 flex">
              보유 개수 <span className="text-conic-red-30">*</span>
            </p>
            <Input
              value={equipmentData.quantity?.toString() || ''}
              onChange={(e) => {
                const value = e.target.value
                setEquipmentData((prev) => ({
                  ...prev,
                  quantity: value ? parseInt(value) : undefined,
                }))
              }}
              inputBoxStyle={'default'}
              placeholder={'장비 보유 개수를 입력해주세요.'}
              type={'number'}
            />
          </section>
          <section className="flex flex-col gap-y-2">
            <p className="gap-x-5xs sub2 flex">
              장비 설명 <span className="text-conic-red-30">*</span>
            </p>
            <textarea
              value={equipmentData.description || ''}
              onChange={(e) => {
                setEquipmentData((prev) => ({ ...prev, description: e.target.value }))
              }}
              className="p-2xs border-gray-20 h-[180px] w-full rounded-[16px] border outline-none"
              placeholder="장비 설명을 작성해주세요."
            />
          </section>

          <div className="gap-y-4xs flex flex-col">
            <div className="gap-x-5xs sub2 flex">
              장비 사진 업로드 <span className="text-conic-red-30">*</span>
            </div>
            <div onClick={() => equipmentImageRef.current?.click()} className="relative cursor-pointer">
              <div className="px-2xs py-3xs border-gray-20 hover:bg-gray-10 flex w-fit gap-x-2 rounded-[12px] border transition-colors">
                <ImgUploadIcon width={24} height={24} />
                <p className="button text-gray-50">사진 업로드</p>
              </div>
              <input
                multiple={true}
                type="file"
                accept="image/jpg,image/jpeg,image/png"
                id={'input-file'}
                ref={equipmentImageRef}
                name="input-file"
                onChange={handleImagePreview}
                className="hidden"
              />
            </div>
            {equipmentImageFileList && equipmentImageFileList.length > 0 ? (
              <div className="gap-2xs flex flex-wrap">
                {equipmentImageFileList.map((file) => (
                  <ImageUploadItem
                    key={file.id}
                    ImageUrl={file.url}
                    ImageUrlName={file.name}
                    onRemove={() => handleRemoveFile(file.id)}
                  />
                ))}
              </div>
            ) : null}
            <p className="body1 text-gray-50">5MB이하 파일(jpg, jpeg, png)만 가능합니다.</p>
          </div>
        </div>
      </Modal.Content>
      <Modal.BottomButton>
        <div className="flex gap-x-3">
          <Button1
            onClick={handleClose}
            styleType={'outline'}
            styleSize={'lg'}
            styleStatus={'default'}
            customClassName={'w-full'}
          >
            닫기
          </Button1>
          <Button1
            customClassName={'w-full'}
            onClick={handleCompleteEquipment}
            styleStatus={'default'}
            styleType={'primary'}
          >
            {editingIndex !== null ? '수정하기' : '완료하기'}
          </Button1>
        </div>
      </Modal.BottomButton>
    </Modal>
  )
}
