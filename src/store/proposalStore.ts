import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { ProjectResponseType } from '@/type/project'
import { ProposalType } from '@/type/proposal'
import { FileInfoType } from '@/type/common'

interface SetProposalStoreType {
  selectedProjectId?: string | undefined
  resultProposalId?: number | undefined
  summaryProjectData?: ProjectResponseType | undefined
  fileInfoList?: FileInfoType[] | undefined
  uploadUrls?: FileInfoType[] | undefined
  proposalData?: ProposalType | null
}

interface ProposalStoreType {
  selectedProjectId: string | undefined
  resultProposalId: number | undefined
  proposalData: ProposalType | null
  summaryProjectData: ProjectResponseType | undefined
  fileInfoList?: FileInfoType[] | undefined
  uploadUrls: FileInfoType[] | undefined
  setState: (params: SetProposalStoreType) => void
}

export const useProposalStore = create<ProposalStoreType>()(
  persist(
    (set) => ({
      selectedProjectId: undefined,
      proposalData: null,
      summaryProjectData: undefined,
      fileInfoList: undefined,
      uploadUrls: undefined,
      resultProposalId: undefined,
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
        resultProposalId: state.resultProposalId,
        summaryProjectData: state.summaryProjectData,
      }), // selectedProjectId만 저장
    }
  )
)
