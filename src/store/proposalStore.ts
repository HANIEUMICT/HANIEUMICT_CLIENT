import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { ProjectResponseType } from '@/type/project'
import { ProposalType } from '@/type/proposal'

interface SetProposalStoreType {
  selectedProjectId?: string | undefined
  summaryProjectData?: ProjectResponseType | undefined
  proposalData?: ProposalType | null
}

interface ProposalStoreType {
  selectedProjectId: string | undefined
  proposalData: ProposalType | null
  summaryProjectData: ProjectResponseType | undefined
  setState: (params: SetProposalStoreType) => void
}

export const useProposalStore = create<ProposalStoreType>()(
  persist(
    (set) => ({
      selectedProjectId: undefined,
      proposalData: null,
      summaryProjectData: undefined,
      setState: (params: SetProposalStoreType) => {
        set((state) => ({
          ...state,
          ...params,
        }))
      },
    }),
    {
      name: 'proposal-storage', // localStorage key 이름
      partialize: (state) => ({
        selectedProjectId: state.selectedProjectId,
        summaryProjectData: state.summaryProjectData,
      }), // selectedProjectId만 저장
    }
  )
)
