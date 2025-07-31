import { create } from 'zustand'
import { ProjectType } from '@/type/project'

interface SetProjectStoreType {
  projectData: ProjectType
}

interface ProjectStoreType {
  projectData: ProjectType | undefined
  setState: (params: SetProjectStoreType) => void
}

export const useProjectStore = create<ProjectStoreType>((set) => ({
  projectData: undefined,
  setState: (params: SetProjectStoreType) => {
    set((state) => ({
      ...state,
      ...params,
    }))
  },
}))
