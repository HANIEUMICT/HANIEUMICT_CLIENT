import { Dispatch, SetStateAction, useState } from 'react'
import Image from 'next/image'
import Button1 from '@/components/common/Button1'

interface BasicInfoProps {
  setCurrentStep: Dispatch<SetStateAction<number>>
}
export default function BasicInfo({ setCurrentStep }: BasicInfoProps) {
  const [selectedType, setSelectedType] = useState<'new' | 'before' | undefined>(undefined)
  const basicInfoContents: { title: string; content: string; type: 'new' | 'before'; img: string }[] = [
    {
      title: '새 견적서 작성하기',
      content: '원하는 견적서를 작성해보세요.',
      type: 'new',
      img: '/person-graphic.svg',
    },
    {
      title: '견적서 불러오기',
      content: '임시 저장된 견적요청서나, 발송했던 견적요청서를 불러올 수 있습니다.',
      type: 'before',
      img: '/company-graphic.svg',
    },
  ]
  return (
    <section className="flex flex-col gap-y-[40px]">
      <section className="flex gap-x-[24px]">
        {basicInfoContents.map((content) => {
          return (
            <section
              key={content.title}
              onClick={() => {
                setSelectedType(selectedType === content.type ? undefined : content.type)
              }}
              className="flex w-full cursor-pointer flex-col items-center justify-center"
            >
              <button
                className={`border ${selectedType === content.type ? 'active:border-conic-red-30 border-conic-red-30' : 'border-gray-20'} hover:border-conic-red-20 gap-y-2xs p-m flex w-full flex-col items-center justify-center rounded-[24px] bg-white`}
              >
                <div className="gap-y-2xs flex w-full flex-col items-center justify-center">
                  <Image src={content.img} alt={content.title} width={220} height={220} />
                  <div className="gap-y-4xs flex w-full flex-col items-start">
                    <p className="h3">{content.title}</p>
                    <p className="body1 text-gray-50">{content.content}</p>
                  </div>
                </div>
              </button>
            </section>
          )
        })}
      </section>
      <div className="flex w-full justify-end">
        <Button1
          styleType={'primary'}
          styleStatus={selectedType === undefined ? 'disabled' : 'default'}
          onClick={() => {
            setCurrentStep(3)
          }}
          styleSize={'lg'}
          customClassName={'w-[260px]'}
        >
          다음
        </Button1>
      </div>
    </section>
  )
}
