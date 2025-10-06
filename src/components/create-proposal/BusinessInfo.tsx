import Button1 from '@/components/common/Button1'
import { Dispatch, SetStateAction, useEffect, useState } from 'react'
import BusinessNumberField from '@/components/create-proposal/business-info/BusinessNumberField'
import RepresentativeNameField from '@/components/create-proposal/business-info/RepresentativeNameField'
import BusinessNameField from '@/components/create-proposal/business-info/BusinessNameField'
import BusinessAddressField from '@/components/create-proposal/business-info/BusinessAddressField'
import BusinessTypeField from '@/components/create-proposal/business-info/BusinessTypeField'
import BusinessItemField from '@/components/create-proposal/business-info/BusinessItemField'
import { useRouter } from 'next/navigation'
import { getCompany } from '@/lib/company'
import { getUserData } from '@/utils/common'
import { CompanyType } from '@/type/company'
import { postProposalInit } from '@/lib/proposal'
import { useProposalStore } from '@/store/proposalStore'

interface BusinessInfoProps {
  setCurrentStep: Dispatch<SetStateAction<number>>
}

export default function BusinessInfo({ setCurrentStep }: BusinessInfoProps) {
  const router = useRouter()
  const [companyData, setCompanyData] = useState<CompanyType>()
  const setState = useProposalStore((state) => state.setState)
  const selectedProjectId = useProposalStore((state) => state.selectedProjectId)

  useEffect(() => {
    getCompany(getUserData()?.companyId).then((result) => {
      if (result.result === 'SUCCESS') {
        setCompanyData(result.data)
      }
    })
  }, [])

  return (
    <div className="flex flex-col gap-y-[40px]">
      <section className="border-gray-20 flex flex-col gap-y-4 rounded-[24px] border bg-white p-6">
        <h1 className="sub1">사업자 정보</h1>
        <BusinessNumberField registrationNumber={companyData?.registrationNumber} />
        <RepresentativeNameField owner={companyData?.owner} />
        <BusinessNameField name={companyData?.name} />
        <BusinessAddressField address={companyData?.address} />
        <BusinessTypeField businessType={companyData?.businessType} />
        <BusinessItemField industry={companyData?.industry} />
      </section>
      <section className="flex justify-between">
        <Button1
          onClick={() => {
            router.back()
          }}
          customClassName={'h-[52px] w-[260px]'}
          styleStatus={'default'}
          styleSize={'lg'}
          styleType={'outline'}
        >
          이전
        </Button1>
        <div className="gap-x-2xs flex">
          <Button1
            onClick={async () => {
              setCurrentStep(2)
              const response = await postProposalInit(getUserData()?.memberId, selectedProjectId)
              if (response.result === 'SUCCESS') {
                setState({ resultProposalId: response.data?.proposalId })
                console.log('선택된 제안서 id: ', response.data?.proposalId)
              }
            }}
            customClassName={'h-[52px] w-[260px]'}
            styleStatus={'default'}
            styleType={'primary'}
            styleSize={'lg'}
          >
            다음
          </Button1>
        </div>
      </section>
    </div>
  )
}
