import Modal from '@/components/common/Modal'
import UploadItem from '@/components/common/UploadItem'
import Pagination from '@/components/common/Pagination'
import Button1 from '@/components/common/Button1'
import { Dispatch, SetStateAction, useEffect, useMemo, useState } from 'react'
import { UserDataType } from '@/type/common'
import { getProject } from '@/lib/project'
import { ProjectResponseType } from '@/type/project'
import { useProjectStore } from '@/store/projectStore'
import { useModalStore } from '@/store/modalStore'

interface ProjectLoadModalProps {
  setCurrentStep: Dispatch<SetStateAction<number>>
}

export default function ProjectLoadModal({ setCurrentStep }: ProjectLoadModalProps) {
  const [userData, setUserData] = useState<UserDataType | null>(null)
  const [projectData, setProjectData] = useState<ProjectResponseType[]>()
  const [selectedProjectId, setSelectedProjectId] = useState<number | null>(null) // 선택된 프로젝트 ID
  const setModalState = useModalStore((state) => state.setState)

  // zustand store 사용
  const { setState } = useProjectStore()

  // localStorage에서 userData 가져오기 (클라이언트 사이드에서만)
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const storedUserData = localStorage.getItem('userData')
      if (storedUserData) {
        try {
          const parsedUserData: UserDataType = JSON.parse(storedUserData)
          setUserData(parsedUserData)
        } catch (error) {
          console.error('userData 파싱 실패:', error)
        }
      }
    }
  }, [])
  // 기존에 저장된 견적서 불러오기
  const [status, setStatus] = useState<'TEMPORARY_SAVE' | 'INITIALIZE' | 'SUBMIT' | null>('TEMPORARY_SAVE')
  const [currentPage, setCurrentPage] = useState(1)
  const totalPages = 20 // 예시로 총 20페이지

  const handlePageChange = (page: number) => {
    setCurrentPage(page)
    console.log(`페이지 ${page}로 이동`)
    // 실제로는 여기서 API 호출이나 라우팅 처리
  }

  useEffect(() => {
    if (userData?.memberId && status) {
      getProject(userData.memberId, status)
        .then((response: any) => {
          // 일단 any로 받아서 구조 파악
          console.log('API 전체 응답:', response)

          // 안전한 타입 체크
          if (response && response.data && Array.isArray(response.data)) {
            const projectList: ProjectResponseType[] = response.data
            setProjectData(projectList)

            if (projectList.length > 0 && selectedProjectId === null) {
              setSelectedProjectId(projectList[0].projectId)
            }
          } else {
            console.warn('예상하지 못한 응답 구조:', response)
            setProjectData([])
          }
        })
        .catch((error: unknown) => {
          console.error('프로젝트 불러오기 실패:', error)
          setProjectData([])
        })
    }
  }, [userData, status])

  // 선택된 프로젝트 데이터 계산
  const selectedProject = useMemo(() => {
    if (!selectedProjectId || !projectData) return null
    return projectData.find((project) => project.projectId === selectedProjectId) || null
  }, [selectedProjectId, projectData])

  // 프로젝트 선택 핸들러 - setState 제거
  const handleProjectSelect = (project: ProjectResponseType) => {
    setSelectedProjectId(project.projectId)
    // setState 제거하여 선택만 하고 store에는 저장하지 않음
  }

  // 견적서 불러오기 버튼 핸들러 (실제 store 업데이트)
  const handleLoadProject = () => {
    if (!selectedProject) return

    // zustand store에 선택된 프로젝트 데이터 저장
    setState({
      projectData: selectedProject.projectRegisterRequest,
      finalProjectData: selectedProject,
      projectId: selectedProject.projectId,
    })

    console.log('견적서 불러오기:', selectedProject)
    setModalState({ isEstimateModalOpen: false })
    setCurrentStep(3)
  }

  return (
    <Modal customClassName={'w-[908px]'}>
      <Modal.Content>
        <div className="gap-y-xs flex flex-col">
          <section className="gap-y-s flex flex-col">
            <h2 className="h2">견적서 불러오기</h2>
            <section className="gap-x-3xs flex">
              <button
                onClick={() => {
                  setStatus('TEMPORARY_SAVE')
                  setSelectedProjectId(null)
                }}
                className={`${status === 'TEMPORARY_SAVE' ? 'gap-x-4xs h3 text-conic-red-30 p-5xs border-red-30 flex border-b-[2px]' : 'gap-x-4xs h3 text-gray-30 p-5xs flex'}`}
              >
                임시 저장된 견적 요청서<span>({projectData?.length || 0})</span>
              </button>
              <button
                onClick={() => {
                  setStatus('SUBMIT')
                  setSelectedProjectId(null)
                }}
                className={`${status === 'SUBMIT' ? 'gap-x-4xs h3 text-conic-red-30 p-5xs border-red-30 flex border-b-[2px]' : 'gap-x-4xs h3 text-gray-30 p-5xs flex'}`}
              >
                작성 완료된 견적 요청서
                <span>({projectData?.length || 0})</span>
              </button>
            </section>
          </section>
          <section className="gap-x-s flex">
            <section className="gap-y-3xs flex w-full flex-col">
              {projectData
                ? projectData.map((project) => {
                    const isSelected = selectedProjectId === project.projectId
                    return (
                      <section
                        key={project.projectId}
                        onClick={() => handleProjectSelect(project)}
                        className={`${isSelected ? 'border-conic-red-30 border-[2px]' : 'border-gray-20 border'} p-xs gap-y-4xs flex flex-col rounded-[20px] whitespace-nowrap`}
                      >
                        <p className="sub1">{project.projectRegisterRequest.projectTitle}</p>
                        <div className="gap-x-4xs flex text-gray-50">
                          <p className="body1">최종 작성일</p>
                          <p className="sub2">2025.04.19</p>
                        </div>
                      </section>
                    )
                  })
                : null}
            </section>
            <section className="p-xs bg-gray-10 flex h-fit flex-col gap-y-[19px] rounded-[20px]">
              {selectedProject ? (
                <>
                  <p className="sub1">{selectedProject.projectRegisterRequest.projectTitle}</p>
                  <div className="flex w-full justify-between">
                    <p className="body1 text-gray-50">제조 서비스 카테고리</p>
                    <p className="sub2">{selectedProject.projectRegisterRequest.category}</p>
                  </div>
                  <div className="flex w-full justify-between">
                    <p className="body1 text-gray-50">제조 분류</p>
                    <p className="sub2">{selectedProject.projectRegisterRequest.categoryDetail}</p>
                  </div>
                  <div className="flex w-full justify-between">
                    <p className="body1 text-gray-50">제조 용도</p>
                    <p className="sub2">{selectedProject.projectRegisterRequest.purpose}</p>
                  </div>
                  <div className="flex flex-col gap-y-2">
                    <p className="body1 text-gray-50">도면</p>
                    <UploadItem
                      customClassName={'w-[440px]'}
                      ImageUrlName={'/test.png'}
                      ImageUrl={'/test.png'}
                      imageSize={'123KB'}
                      onRemove={() => {}}
                    />
                  </div>
                </>
              ) : null}
            </section>
          </section>
          <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={handlePageChange} showPages={5} />
        </div>
      </Modal.Content>
      <Modal.BottomButton>
        <div className="flex gap-x-3">
          <Button1
            onClick={() => {
              setModalState({ isEstimateModalOpen: false })
            }}
            customClassName={'w-full gap-x-3'}
            styleStatus={'default'}
            styleSize={'lg'}
            styleType={'outline'}
          >
            취소
          </Button1>
          <Button1
            onClick={handleLoadProject}
            customClassName={'w-full gap-x-3'}
            styleStatus={selectedProjectId !== null ? 'default' : 'disabled'}
            styleSize={'lg'}
            styleType={'primary'}
          >
            이 견적서 불러오기
          </Button1>
        </div>
      </Modal.BottomButton>
    </Modal>
  )
}
