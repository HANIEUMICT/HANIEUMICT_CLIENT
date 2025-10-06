import { Dispatch, SetStateAction } from 'react'
import Button1 from '@/components/common/Button1'
import SpecialNoteField from '@/components/create-proposal/additional-info/SpecialNoteField'
import AdditionalProposalInfoField from '@/components/create-proposal/additional-info/AdditionalProposalInfoField'
import FinalBusinessInfoPreview from '@/components/create-proposal/final-proposal-preview/FinalBusinessInfoPreview'
import FinalProposalContentPreview from '@/components/create-proposal/final-proposal-preview/FinalProposalContentPreview'
import FinalDrawingPreview from '@/components/create-proposal/final-proposal-preview/FinalDrawingPreview'
import FinalETCPreview from '@/components/create-proposal/final-proposal-preview/FinalETCPreview'

interface FinalProposalPreviewProps {
  setCurrentStep: Dispatch<SetStateAction<number>>
}
export default function FinalProposalPreview({ setCurrentStep }: FinalProposalPreviewProps) {
  return (
    <div className="flex flex-col gap-y-[40px]">
      <section className="flex flex-col gap-y-4">
        <FinalBusinessInfoPreview />
        <FinalProposalContentPreview />
        <FinalETCPreview />
        <FinalDrawingPreview />
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
        <Button1
          onClick={() => {}}
          customClassName={'h-[52px] w-[260px]'}
          styleStatus={'disabled'}
          styleType={'primary'}
          styleSize={'lg'}
        >
          견적서 보내기
        </Button1>
      </section>
    </div>
  )
}
