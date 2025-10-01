import { Dispatch, SetStateAction, useEffect, useState } from 'react'
import Button1 from '@/components/common/Button1'
import Header from '@/components/common/Header'
import Input from '@/components/common/Input'
import { DropDownIcon, SearchIcon } from '@/assets/svgComponents'
import CompanyInfoCard from '@/components/sign-up/company/CompanyInfoCard'
import { CompanySignUpPageStepType, SummaryCompanyInfoResponseDataType } from '@/type/auth'
import CompanyConfirmModal from '@/components/modal/CompanyConfirmModal'
import { getSummaryCompanyInfoList } from '@/lib/auth'
import Pagination from '@/components/common/Pagination'
import { useAuthStore } from '@/store/authStore'

interface SearchCompanyInfoPageProps {
  setStep: Dispatch<SetStateAction<CompanySignUpPageStepType>>
}

export default function SearchCompanyInfoPage({ setStep }: SearchCompanyInfoPageProps) {
  const [isModalOpen, setIsModalOpen] = useState(false)
  // 페이지네이션
  const [currentPage, setCurrentPage] = useState(0)
  const [totalPages, setTotalPages] = useState<number>(0)
  const [totalElements, setTotalElements] = useState<number>(0)

  const [isLoading, setIsLoading] = useState(false)

  const [summaryCompanyList, setSummaryCompanyList] = useState<SummaryCompanyInfoResponseDataType[] | undefined>()
  const setAuthState = useAuthStore((state) => state.setState)
  const summaryCompanyInfoData = useAuthStore((state) => state.summaryCompanyInfoData)

  // 페이지 변경 핸들러
  const handlePageChange = (page: number) => {
    setCurrentPage(page - 1) // Pagination은 1부터 시작하지만 API는 0부터 시작
  }

  // 데이터 로드
  useEffect(() => {
    const loadArchiveData = async () => {
      try {
        setIsLoading(true)

        const response = await getSummaryCompanyInfoList(currentPage, 10)

        console.log('API 전체 응답:', response)

        if (response && response.result === 'SUCCESS' && response.data && Array.isArray(response.data.content)) {
          const content = response.data.content
          setSummaryCompanyList(content)
          setTotalPages(response.data.totalPages)
          setTotalElements(response.data.totalElements || 0)
        } else {
          console.warn('예상하지 못한 응답 구조:', response)
          setSummaryCompanyList([])
          setTotalPages(0)
          setTotalElements(0)
        }
      } catch (error: unknown) {
        console.error('아카이브 데이터 불러오기 실패:', error)
        setSummaryCompanyList([])
        setTotalPages(0)
        setTotalElements(0)
      } finally {
        setIsLoading(false)
      }
    }

    loadArchiveData()
  }, [currentPage]) // currentPage 변경 시 실행

  return (
    <main className="bg-gray-10 flex min-h-screen flex-col items-center justify-center">
      {isModalOpen ? <CompanyConfirmModal setIsModalOpen={setIsModalOpen} setStep={setStep} /> : null}
      <Header headerType={'SIGNUP'} />
      <div className="mt-[40px] w-[1218px]">
        <div className="h-[80px]"></div>
        <section className="gap-y-3xs flex w-full flex-col">
          <h1 className="h2">기업 정보 검색</h1>
          <div className="flex gap-x-2">
            <Input
              value={''}
              customClassName={'h-[52px] w-full'}
              type={'text'}
              inputBoxStyle={'default'}
              placeholder={'회사명을 검색해보세요.'}
              leftIcon={<SearchIcon width={24} height={24} className="text-conic-red-30" />}
            />
            <Button1
              onClick={() => {}}
              styleType={'primary'}
              styleStatus={'default'}
              styleSize={'lg'}
              customClassName={'w-[120px] h-[52px]'}
            >
              검색
            </Button1>
          </div>
        </section>
        <section className="mt-m gap-y-3xs flex w-full flex-col">
          <h2 className="h3">
            검색 결과 <span className="text-conic-red-30">12</span>
          </h2>
          <div className="flex justify-between">
            <div className="gap-x-4xs flex">
              <Button1
                customClassName={'h-[48px]'}
                styleType={'outline'}
                styleStatus={'default'}
                styleSize={'md'}
                onClick={() => {}}
                rightIcon={<DropDownIcon width={16} height={12} />}
              >
                전체 지역
              </Button1>
              <Button1
                customClassName={'h-[48px]'}
                styleType={'outline'}
                styleStatus={'default'}
                styleSize={'md'}
                onClick={() => {}}
                rightIcon={<DropDownIcon width={16} height={12} />}
              >
                전체 업종
              </Button1>
              <Input
                value={''}
                customClassName={'h-[48px] w-[365px]'}
                type={'text'}
                inputBoxStyle={'default'}
                placeholder={'결과 내 재검색'}
                leftIcon={<SearchIcon width={24} height={24} className="text-conic-red-30" />}
              />
            </div>
            <div className="gap-x-2xs flex items-center">
              <p className="sub1 text-gray-50">찾으시는 기업이 없나요?</p>
              <Button1
                onClick={() => {
                  setStep('RegisterCompanyPage')
                }}
                styleType={'outline2'}
                styleSize={'sm'}
                styleStatus={'default'}
                customClassName={'h-[36px]'}
              >
                직접 등록
              </Button1>
            </div>
          </div>
        </section>
        <section className="mt-3xs grid grid-cols-2 gap-[24px]">
          {summaryCompanyList?.map((summaryCompany) => {
            return (
              <CompanyInfoCard
                {...summaryCompany}
                key={summaryCompany.id}
                onClick={() => {
                  setIsModalOpen(true)
                  setAuthState({
                    summaryCompanyInfoData: {
                      companyId: summaryCompany.id,
                      name: summaryCompany.name,
                      businessType: summaryCompany.businessType,
                      owner: summaryCompany.owner,
                      registrationNumber: summaryCompany.registrationNumber,
                      addressRegisterRequest: {
                        postalCode: summaryCompany.address.postal,
                        streetAddress: summaryCompany.address.street,
                        detailAddress: summaryCompany.address.detail,
                      },
                    },
                  })
                }}
              />
            )
          })}
        </section>
        <div className="my-[40px]">
          <Pagination
            totalPages={totalPages}
            onPageChange={handlePageChange}
            currentPage={currentPage + 1} // API는 0부터, UI는 1부터
            showPages={5}
          />
        </div>
      </div>
    </main>
  )
}
