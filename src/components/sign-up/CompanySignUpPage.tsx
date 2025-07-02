import Header from '@/components/common/Header'
import Input from '@/components/common/Input'
import Button1 from '@/components/common/Button1'
import { DropDownIcon, SearchIcon } from '@/assets/svgComponents'
import CompanyInfoCard from '@/components/sign-up/company/CompanyInfoCard'

const CompanySignUpPage = () => {
  return (
    <main className="bg-gray-10 flex min-h-screen flex-col items-center justify-center">
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
          <CompanyInfoCard />
          <CompanyInfoCard />
          <CompanyInfoCard />
          <CompanyInfoCard />
          <CompanyInfoCard />
          <CompanyInfoCard />
          <CompanyInfoCard />
          <CompanyInfoCard />
        </section>
      </div>
    </main>
  )
}
export default CompanySignUpPage
