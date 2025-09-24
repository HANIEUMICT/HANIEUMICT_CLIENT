import Input from '@/components/common/Input'
import { ChangeEvent } from 'react'
import { useProposalStore } from '@/store/proposalStore'

export default function BusinessNumberField() {
  const setState = useProposalStore((state) => state.setState)
  const proposalData = useProposalStore((state) => state.proposalData)

  return (
    <div className="gap-y-4xs flex flex-col">
      <p className="sub2">사업자 번호</p>
      <Input
        onChange={(e: ChangeEvent<HTMLInputElement>) => {
          setState({
            ...proposalData,
            proposalData: { ...proposalData, proposalNote: e.target.value },
          })
        }}
        inputBoxStyle={'default'}
        value={''}
        placeholder={'사업자 번호를 입력해주세요.'}
      />
    </div>
  )
}
