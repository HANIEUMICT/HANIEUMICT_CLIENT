import Input from '@/components/common/Input'
import Button1 from '@/components/common/Button1'
import { useRegisterFactoryStore } from '@/store/register-factory'
import { Dispatch, RefObject, SetStateAction, useState } from 'react'
import { useRouter } from 'next/navigation'
import { formatFileSize, generateId } from '@/utils/upload'
import { ImgUploadIcon, UploadIcon } from '@/assets/svgComponents'
import UploadItem from '@/components/common/UploadItem'
import ImageUploadItem from '@/components/common/ImageUploadItem'

interface FactoryInfoProps {
  setCurrentStep: Dispatch<SetStateAction<number>>
  companyLogoImageRef: RefObject<HTMLInputElement | null>
}

export default function FactoryInfo({ setCurrentStep, companyLogoImageRef }: FactoryInfoProps) {
  const router = useRouter()
  const setState = useRegisterFactoryStore((state) => state.setState)
  const registerFactoryData = useRegisterFactoryStore((state) => state.registerFactoryData)
  const companyLogoFile = useRegisterFactoryStore((state) => state.companyLogoImageFile)
  const [startTime, setStartTime] = useState<string>('')
  const [endTime, setEndTime] = useState<string>('')

  /**
   * 이미지 미리보기 설정 (단일 파일)
   */
  const handleImagePreview = async () => {
    const files = companyLogoImageRef.current?.files

    if (files && files.length > 0) {
      const file = files[0] // 첫 번째 파일만 선택
      const reader = new FileReader()

      reader.onloadend = () => {
        // 기존 파일을 대체
        setState({
          companyLogoImageFile: {
            id: generateId(),
            name: file.name,
            size: file.size,
            url: reader.result,
          },
        })
      }
      reader.readAsDataURL(file)
    }
  }

  /**
   * 파일 삭제
   */
  const handleRemoveFile = () => {
    setState({
      companyLogoImageFile: undefined,
    })
  }

  /**
   * 다음 단계로 이동
   */
  const handleNext = () => {
    // contactAvailableTime 설정
    const contactAvailableTime = `${startTime}-${endTime}`

    setState({
      registerFactoryData: {
        ...registerFactoryData,
        detail: {
          ...registerFactoryData?.detail,
          contactAvailableTime,
        },
      },
    })

    setCurrentStep(2)
  }

  return (
    <div>
      <div className="border-gray-20 flex flex-col gap-y-3 rounded-[24px] border bg-white p-6">
        <h2 className="sub1">공장 정보</h2>
        <section className="gap-y-2xs flex flex-col">
          <div className="gap-y-4xs flex flex-col">
            <p className="gap-x-5xs sub2 flex">
              설립 연도 <span className="text-conic-red-30">*</span>
            </p>
            <Input
              value={registerFactoryData?.detail?.establishedAt ?? ''}
              onChange={(e) => {
                setState({
                  registerFactoryData: {
                    ...registerFactoryData,
                    detail: {
                      ...registerFactoryData?.detail,
                      establishedAt: e.target.value,
                    },
                  },
                })
              }}
              inputBoxStyle={'default'}
              placeholder={'설립연도를 입력해주세요.'}
              type={'date'}
            />
          </div>
          <div className="gap-y-4xs flex flex-col">
            <div className="gap-x-5xs sub2 flex">
              공장 로고 업로드 <span className="text-conic-red-30">*</span>
            </div>
            <div onClick={() => companyLogoImageRef.current?.click()} className="relative">
              <div className="py-3xs px-2xs border-gray-20 flex h-[48px] w-fit items-center gap-x-2 rounded-[12px] border">
                <UploadIcon width={24} height={24} />
                <p className="button text-gray-50">파일 업로드</p>
              </div>
              <input
                type="file"
                id={'input-file'}
                ref={companyLogoImageRef}
                name="input-file"
                onChange={handleImagePreview}
                className="hidden"
              />
            </div>
            {companyLogoFile ? (
              <div className="flex flex-col gap-y-2">
                <UploadItem
                  key={companyLogoFile.id}
                  ImageUrl={companyLogoFile.url}
                  ImageUrlName={companyLogoFile.name}
                  onRemove={() => handleRemoveFile()}
                />
              </div>
            ) : null}
            <p className="body1 text-gray-50">5MB이하 파일(jpg, jpeg, png)만 가능합니다.</p>
          </div>
          <div className="gap-y-4xs flex flex-col">
            <p className="gap-x-5xs sub2 flex">
              규모<span className="text-conic-red-30">*</span>
            </p>
            <Input
              onChange={(e) => {
                setState({
                  registerFactoryData: {
                    ...registerFactoryData,
                    detail: {
                      ...registerFactoryData?.detail,
                      employeeCount: parseInt(e.target.value),
                    },
                  },
                })
              }}
              inputBoxStyle={'default'}
              placeholder={'직원 수를 입력해주세요.'}
              type={'number'}
            />
          </div>
          <div className="gap-y-4xs flex flex-col">
            <p className="gap-x-5xs sub2 flex">
              홈페이지<span className="text-conic-red-30">*</span>
            </p>
            <Input
              onChange={(e) => {
                setState({
                  registerFactoryData: {
                    ...registerFactoryData,
                    detail: {
                      ...registerFactoryData?.detail,
                      websiteUrl: e.target.value,
                    },
                  },
                })
              }}
              inputBoxStyle={'default'}
              placeholder={'홈페이지 URL을 입력해주세요.'}
            />
          </div>
          <div className="gap-y-4xs flex flex-col">
            <p className="gap-x-5xs sub2 flex">
              연락 가능 날짜<span className="text-conic-red-30">*</span>
            </p>
            <div className="flex gap-x-2">
              <Input
                inputBoxStyle={'default'}
                value={startTime}
                onChange={(e) => setStartTime(e.target.value)}
                type={'time'}
              />
              <Input
                inputBoxStyle={'default'}
                value={endTime}
                onChange={(e) => setEndTime(e.target.value)}
                type={'time'}
              />
            </div>
          </div>
          <div className="gap-y-4xs flex flex-col">
            <p className="gap-x-5xs sub2 flex">
              공장 소개글<span className="text-conic-red-30">*</span>
            </p>
            <textarea
              onChange={(e) => {
                setState({
                  registerFactoryData: {
                    ...registerFactoryData,
                    detail: {
                      ...registerFactoryData?.detail,
                      description: e.target.value,
                    },
                  },
                })
              }}
              className="p-2xs border-gray-20 h-[180px] rounded-[16px] border outline-none"
              placeholder="공장 소개글을 입력해주세요."
            />
          </div>
        </section>
      </div>

      <div className="mt-[40px] mb-[100px] flex justify-between">
        <Button1
          onClick={() => {
            router.back()
          }}
          customClassName={'w-[260px]'}
          styleType={'outline'}
        >
          이전
        </Button1>
        <Button1 onClick={handleNext} customClassName={'w-[260px]'} styleType={'primary'}>
          다음
        </Button1>
      </div>
    </div>
  )
}
