import Button1 from '@/components/common/Button1'
import { useAuthStore } from '@/store/authStore'
import { useRouter } from 'next/navigation'

export default function CompanyInfoField() {
  const router = useRouter()
  const setState = useAuthStore((state) => state.setState)
  const summaryCompanyInfoData = useAuthStore((state) => state.summaryCompanyInfoData)
  return (
    <div className="flex w-full flex-col gap-y-2">
      <section className="flex w-full items-center justify-between">
        <h3 className="sub2">기업정보</h3>
        <Button1
          onClick={() => {
            router.push('/sign-up/company/search')
            setState({
              summaryCompanyInfoData: undefined,
              registerCompanyInfoData: undefined,
            })
          }}
          styleSize="sm"
          styleType="outline2"
          styleStatus="default"
          customClassName="rounded-full h-[36px]"
        >
          기업 다시 선택
        </Button1>
      </section>
      <section className="gap-y-2xs p-s border-gray-20 flex flex-col rounded-[24px] border bg-white">
        <div className="gap-y-4xs flex flex-col">
          <p className="sub1">{summaryCompanyInfoData?.name}</p>
          <p className="sub1 text-gray-50">{summaryCompanyInfoData?.businessType}</p>
        </div>
        <div className="gap-y-4xs flex flex-col">
          <div className="gap-x-4xs flex items-center">
            <div className="body1 text-gray-40 w-[100px]">대표자</div>
            <p className="button-lg">{summaryCompanyInfoData?.owner}</p>
          </div>
          <div className="gap-x-4xs flex items-center">
            <div className="body1 text-gray-40 w-[100px]">사업자등록번호</div>
            <p className="button-lg">{summaryCompanyInfoData?.registrationNumber}</p>
          </div>
          <div className="gap-x-4xs flex items-center">
            <div className="body1 text-gray-40 w-[100px]">주소</div>
            <p className="button-lg">
              {summaryCompanyInfoData?.addressRegisterRequest?.streetAddress}{' '}
              {summaryCompanyInfoData?.addressRegisterRequest?.detailAddress}
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}
