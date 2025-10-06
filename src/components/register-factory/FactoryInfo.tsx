import Input from '@/components/common/Input'
import Button1 from '@/components/common/Button1'
import { useRegisterFactoryStore } from '@/store/register-factory'
import { Dispatch, RefObject, SetStateAction } from 'react'
import { useRouter } from 'next/navigation'
import { formatFileSize, generateId } from '@/utils/upload'
import { UploadIcon } from '@/assets/svgComponents'
import UploadItem from '@/components/common/UploadItem'

interface FactoryInfoProps {
  setCurrentStep: Dispatch<SetStateAction<number>>
  companyLogoImageRef: RefObject<HTMLInputElement | null>
}

export default function FactoryInfo({ setCurrentStep, companyLogoImageRef }: FactoryInfoProps) {
  const router = useRouter()
  const setState = useRegisterFactoryStore((state) => state.setState)
  const registerFactoryData = useRegisterFactoryStore((state) => state.registerFactoryData)
  const companyLogoFile = useRegisterFactoryStore((state) => state.companyLogoImageFile)

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
              <div className="border-gray-20 pr-2xs flex h-[52px] w-fit items-center justify-center gap-x-2 rounded-[12px] border bg-white pl-3">
                <UploadIcon width={20} height={20} />
                <p className="button text-gray5">파일 업로드</p>
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
                  customClassName={'bg-white'}
                  key={companyLogoFile.id}
                  imageSize={formatFileSize(companyLogoFile.size)}
                  ImageUrl={companyLogoFile.url}
                  ImageUrlName={companyLogoFile.name}
                  onRemove={() => handleRemoveFile()} // 삭제 기능 추가
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
        <Button1
          onClick={() => {
            setCurrentStep(2)
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
