import { postProjectImageUpload } from '@/lib/project'
import { FileInfoType } from '@/type/common'

export type UploadCallback = (objectUrl: string, fileInfo: FileInfoType) => Promise<boolean>

export const useProjectImageUpload = (projectId?: number) => {
  const handleProjectImageUpload: UploadCallback = async (objectUrl, fileInfo) => {
    try {
      // projectId가 없는 경우 조기 반환
      if (!projectId) {
        console.error('프로젝트 ID가 없습니다.')
        return false
      }

      const userDataString = localStorage.getItem('userData')
      if (!userDataString) {
        console.error('사용자 정보가 없습니다.')
        return false
      }

      const userData = JSON.parse(userDataString)
      const memberId = userData.memberId

      const projectImageResponse = await postProjectImageUpload(parseInt(memberId), {
        projectId,
        drawingUrl: objectUrl,
      })

      if (projectImageResponse.result !== 'SUCCESS') {
        console.error('프로젝트 이미지 등록 실패:', projectImageResponse.error)
        return false
      }

      console.log('프로젝트 이미지 등록 성공:', fileInfo.name)
      return true
    } catch (error) {
      console.error('프로젝트 이미지 등록 중 오류:', error)
      return false
    }
  }

  return {
    uploadCallback: handleProjectImageUpload,
  }
}
