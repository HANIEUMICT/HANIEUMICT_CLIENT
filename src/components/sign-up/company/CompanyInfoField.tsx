import Button1 from '@/components/common/Button1'
import { Dispatch, SetStateAction } from 'react'
import { CompanySignUpPageStepType } from '@/type/sign-up'

interface CompanyInfoFieldProps {
  setStep: Dispatch<SetStateAction<CompanySignUpPageStepType>>
}

export default function CompanyInfoField({ setStep }: CompanyInfoFieldProps) {
  return (
    <div className="flex w-full flex-col gap-y-2">
      <section className="flex w-full items-center justify-between">
        <h3 className="sub2">기업정보</h3>
        <Button1
          onClick={() => {
            setStep('SearchCompanyInfoPage')
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
          <p className="sub1">기업명</p>
          <p className="sub1 text-gray-50">업종</p>
        </div>
        <div className="gap-y-4xs flex flex-col">
          <div className="gap-x-4xs flex items-center">
            <div className="body1 text-gray-40 w-[100px]">대표자</div>
            <p className="button-lg">대표자명</p>
          </div>
          <div className="gap-x-4xs flex items-center">
            <div className="body1 text-gray-40 w-[100px]">사업자등록번호</div>
            <p className="button-lg">000-00-00000</p>
          </div>
          <div className="gap-x-4xs flex items-center">
            <div className="body1 text-gray-40 w-[100px]">주소</div>
            <p className="button-lg">서울특별시 금천구 벚꽃로 298</p>
          </div>
        </div>
      </section>
    </div>
  )
}
