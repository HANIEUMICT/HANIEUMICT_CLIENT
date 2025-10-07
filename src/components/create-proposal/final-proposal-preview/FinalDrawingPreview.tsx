import { useProposalStore } from '@/store/proposalStore'
import UploadItem from '@/components/common/UploadItem'
import Button1 from '@/components/common/Button1'
import { Dispatch, SetStateAction } from 'react'

interface FinalProposalPreviewProps {
  setCurrentStep: Dispatch<SetStateAction<number>>
}

export default function FinalDrawingPreview({ setCurrentStep }: FinalProposalPreviewProps) {
  const fileInfoList = useProposalStore((state) => state.fileInfoList)

  return (
    <div className="border-gray-20 flex flex-col gap-y-4 rounded-[24px] border bg-white p-6">
      <h1 className="sub1">도면</h1>
      <section className="flex flex-col gap-y-2">
        {fileInfoList?.map((file, index) => {
          return (
            <UploadItem
              key={file.id + index}
              ImageUrlName={file.name}
              ImageUrl={file.url}
              customClassName={'w-[624px]'}
            />
          )
        })}
      </section>
      <div className="flex w-full justify-end">
        <Button1
          onClick={() => {
            setCurrentStep(4)
          }}
          styleSize={'md'}
          styleStatus={'default'}
          styleType={'outline'}
          customClassName={'h-[48px] w-[160px]'}
        >
          수정
        </Button1>
      </div>
    </div>
  )
}
