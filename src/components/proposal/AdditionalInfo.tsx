import Button1 from '@/components/common/Button1'
import { Dispatch, SetStateAction } from 'react'
import SpecialNoteField from '@/components/proposal/additional-info/SpecialNoteField'
import AdditionalProposalInfoField from '@/components/proposal/additional-info/AdditionalProposalInfoField'

interface AdditionalInfoProps {
  setCurrentStep: Dispatch<SetStateAction<number>>
}

export default function AdditionalInfo({ setCurrentStep }: AdditionalInfoProps) {
  return (
    <div className="flex flex-col gap-y-[40px]">
      <section className="border-gray-20 flex flex-col gap-y-4 rounded-[24px] border bg-white p-6">
        <h1 className="sub1">기타 내용 입력</h1>
        <SpecialNoteField />
        <AdditionalProposalInfoField />
      </section>
      <section className="flex justify-between">
        <Button1
          onClick={() => {
            setCurrentStep(2)
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
            onClick={() => {}}
            customClassName={'h-[52px] w-[260px]'}
            styleStatus={'disabled'}
            styleSize={'lg'}
            styleType={'outline'}
          >
            임시저장
          </Button1>
          <Button1
            onClick={() => {
              setCurrentStep(4)
            }}
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
