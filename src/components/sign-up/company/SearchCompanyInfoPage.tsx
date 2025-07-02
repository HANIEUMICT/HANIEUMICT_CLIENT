import { Dispatch, SetStateAction, useState } from 'react'
import Modal from '@/components/common/Modal'
import Button1 from '@/components/common/Button1'
import Header from '@/components/common/Header'
import Input from '@/components/common/Input'
import { DropDownIcon, SearchIcon } from '@/assets/svgComponents'
import CompanyInfoCard from '@/components/sign-up/company/CompanyInfoCard'

interface SearchCompanyInfoPageProps {
  setStep: Dispatch<SetStateAction<'SearchCompanyInfoPage' | 'InputCompanyInfoPage'>>
}

export default function SearchCompanyInfoPage({ setStep }: SearchCompanyInfoPageProps) {
  const [isModalOpen, setIsModalOpen] = useState(false)
  return (
    <main className="bg-gray-10 flex min-h-screen flex-col items-center justify-center">
      {isModalOpen ? (
        <Modal>
          <Modal.Content>
            <div className="gap-y-s flex flex-col">
              <section className="flex flex-col gap-y-2">
                <h2 className="h2">
                  이 기업 정보로 <br />
                  <span className="text-conic-red-30">기업 회원(멤버) 가입</span>을 시작할까요?
                </h2>
                <p className="body1 text-gray-50">등록 전, 기업 정보가 정확한지 확인해주세요.</p>
              </section>
              <section className="gap-y-4xs bg-gray-10 p-2xs flex flex-col rounded-[12px]">
                <h3 className="h3">기업명</h3>
                <div className="gap-x-4xs button-lg flex">
                  <p className="text-gray-50">대표자명</p>
                  <p className="text-gray-30">|</p>
                  <p className="text-gray-50">000-00-00000</p>
                  <p className="text-gray-30">|</p>
                  <p className="text-gray-50">서울특별시 금천구 벚꽃로 298</p>
                </div>
              </section>
            </div>
          </Modal.Content>
          <Modal.BottomButton>
            <div className="flex gap-x-3">
              <Button1
                onClick={() => {
                  setIsModalOpen(false)
                }}
                styleSize="lg"
                styleType="outline"
                customClassName="w-full"
              >
                아니요
              </Button1>
              <Button1
                onClick={() => {
                  setIsModalOpen(false)
                  setStep('InputCompanyInfoPage')
                }}
                styleSize="lg"
                styleType="primary"
                customClassName="w-full"
              >
                가입 진행
              </Button1>
            </div>
          </Modal.BottomButton>
        </Modal>
      ) : null}
      <Header />
      <div className="mt-[40px] w-[1218px]">
        <div className="h-[80px]"></div>
        <section className="gap-y-3xs flex w-full flex-col">
          <h1 className="h2">기업 정보 검색</h1>
          <div className="flex gap-x-2">
            <Input
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
                onClick={() => {}}
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
          <CompanyInfoCard
            onClick={() => {
              setIsModalOpen(true)
            }}
          />
          <CompanyInfoCard
            onClick={() => {
              setIsModalOpen(true)
            }}
          />
          <CompanyInfoCard
            onClick={() => {
              setIsModalOpen(true)
            }}
          />
          <CompanyInfoCard
            onClick={() => {
              setIsModalOpen(true)
            }}
          />
          <CompanyInfoCard
            onClick={() => {
              setIsModalOpen(true)
            }}
          />
          <CompanyInfoCard
            onClick={() => {
              setIsModalOpen(true)
            }}
          />
          <CompanyInfoCard
            onClick={() => {
              setIsModalOpen(true)
            }}
          />
          <CompanyInfoCard
            onClick={() => {
              setIsModalOpen(true)
            }}
          />
        </section>
      </div>
    </main>
  )
}
