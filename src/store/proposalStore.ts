import { create } from 'zustand'
import { ProjectResponseType, ProjectType } from '@/type/project'
import { FileInfoType } from '@/type/common'
import { ProposalType } from '@/type/proposal'

interface SetProposalStoreType {
  proposalData?: ProposalType | null
}

interface ProposalStoreType {
  proposalData: ProposalType | null
  setState: (params: SetProposalStoreType) => void
}

export const useProposalStore = create<ProposalStoreType>((set) => ({
  proposalData: null,
  setState: (params: SetProposalStoreType) => {
    set((state) => ({
      ...state,
      ...params,
    }))
  },
}))
