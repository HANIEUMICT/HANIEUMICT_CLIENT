import { create } from 'zustand'
import { ProjectResponseType, ProjectType } from '@/type/project'
import { FileInfoType } from '@/type/common'

interface SetProjectStoreType {
  projectData?: ProjectType
  finalProjectData?: ProjectResponseType | undefined
  projectId?: number | undefined
  fileInfoList?: FileInfoType[] | undefined
  responseDrawingUrls?: string[] | undefined
}

interface ProjectStoreType {
  projectData: ProjectType
  finalProjectData: ProjectResponseType | undefined
  projectId: number | undefined
  fileInfoList: FileInfoType[] | undefined
  responseDrawingUrls: string[] | undefined
  setState: (params: SetProjectStoreType) => void
}

export const useProjectStore = create<ProjectStoreType>((set) => ({
  projectData: {
    memberId: null,
    projectTitle: null,
    category: null,
    categoryDetail: null,
    categoryDetailEtc: null,
    purpose: null,
    purposeEtc: null,
    projectQuantity: null,
    requests: null,
    deadline: null,
    requestEstimate: null,
    publicUntil: null,
    projectStatus: null,
    canPhoneConsult: false,
    deliveryAddress: null,
    submitStatus: 'SUBMIT',
    projectBidStatus: 'PRE_BID',
    canDeadlineChange: false,
  },
  finalProjectData: undefined,
  projectId: undefined,
  fileInfoList: undefined,
  responseDrawingUrls: undefined,
  setState: (params: SetProjectStoreType) => {
    set((state) => ({
      ...state,
      ...params,
    }))
  },
}))
