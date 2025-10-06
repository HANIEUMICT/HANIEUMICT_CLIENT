import Input from '@/components/common/Input'
import { useProposalStore } from '@/store/proposalStore'

export default function OperateUntilField() {
  const setState = useProposalStore((state) => state.setState)
  const proposalData = useProposalStore((state) => state.proposalData)

  return (
    <div className="gap-y-4xs flex flex-col">
      <p className="sub2 flex gap-x-1">
        최대 제조 가능 날짜<span className="text-conic-red-30">*</span>
      </p>
      <Input
        inputBoxStyle={'default'}
        onChange={(e) => {
          setState({
            proposalData: {
              ...proposalData,
              operateUntil: e.target.value,
            },
          })
        }}
        type={'date'}
        placeholder={'최대 제조 가능 날짜를 입력해주세요.'}
        value={proposalData?.operateUntil ?? ''}
      ></Input>
    </div>
  )
}
