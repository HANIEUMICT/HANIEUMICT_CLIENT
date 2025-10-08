import { create } from 'zustand'
import { RegisterFactoryDataType } from '@/type/register-factory'
import { FileInfoType } from '@/type/common'

interface SetRegisterFactoryStoreType {
  registerFactoryData?: RegisterFactoryDataType | undefined
  companyLogoImageFile?: FileInfoType | undefined
  equipmentImageFileList?: FileInfoType[] | undefined
  portfolioImageFileList?: FileInfoType[] | undefined
}

interface RegisterFactoryStoreType {
  registerFactoryData: RegisterFactoryDataType | undefined
  companyLogoImageFile: FileInfoType | undefined
  equipmentImageFileList: FileInfoType[] | undefined
  portfolioImageFileList: FileInfoType[] | undefined
  setState: (params: SetRegisterFactoryStoreType) => void
}

export const useRegisterFactoryStore = create<RegisterFactoryStoreType>((set) => ({
  registerFactoryData: undefined,
  companyLogoImageFile: undefined,
  equipmentImageFileList: undefined,
  portfolioImageFileList: undefined,
  setState: (params: SetRegisterFactoryStoreType) => {
    set((state) => ({
      ...state,
      ...params,
    }))
  },
}))
