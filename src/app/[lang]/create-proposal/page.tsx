import ProcessingBar from '@/components/create-project/ProcessingBar'
import BusinessInfo from '@/components/create-proposal/BusinessInfo'
import ProposalContent from '@/components/create-proposal/ProposalContent'
import AdditionalInfo from '@/components/create-proposal/AdditionalInfo'
import DrawingUploader from '@/components/create-proposal/DrawingUploader'
import FinalProposalPreview from '@/components/create-proposal/FinalProposalPreview'
import ProjectSummaryCard from '@/components/create-project/ProjectSummaryCard'
import ProposalPageClient from '@/components/create-proposal/ProposalPageClient'

const steps = ['사업자 정보', '견적 내용 입력', '기타 내용 입력', '도면 입력', '견적서 생성']
type StepType = '1' | '2' | '3' | '4' | '5'

type SearchParams = Promise<{ [key: string]: string | string[] | undefined }>
export const dynamic = 'force-dynamic'

export default async function ProposalPage({ searchParams }: { searchParams: SearchParams }) {
  const params = await searchParams
  const step = (params.step as StepType) || '1' // 기본값

  return (
    <main className="flex flex-col">
      <ProposalPageClient />
      <div className="gap-y-l mx-auto mt-[120px] flex h-[80px] flex-col">
        <div className="flex w-full items-center justify-between">
          <h2 className="h2">견적서 작성하기</h2>
        </div>

        <div className="flex gap-x-[24px]">
          <div className="flex flex-col gap-y-[16px]">
            <ProcessingBar steps={steps} currentStep={parseInt(step)} width={'65px'} />
            {step === '1' && <BusinessInfo />}
            {step === '2' && <ProposalContent />}
            {step === '3' && <AdditionalInfo />}
            {step === '4' && <DrawingUploader />}
            {step === '5' && <FinalProposalPreview />}
          </div>
          <div className="gap-y-s flex flex-col">
            <ProjectSummaryCard />
          </div>
        </div>
      </div>
    </main>
  )
}
