import Button1 from '@/components/common/Button1'
import { Dispatch, SetStateAction } from 'react'
import BusinessNumberField from '@/components/proposal/business-info/BusinessNumberField'
import RepresentativeNameField from '@/components/proposal/business-info/RepresentativeNameField'
import BusinessNameField from '@/components/proposal/business-info/BusinessNameField'
import BusinessAddressField from '@/components/proposal/business-info/BusinessAddressField'
import BusinessTypeField from '@/components/proposal/business-info/BusinessTypeField'
import BusinessItemField from '@/components/proposal/business-info/BusinessItemField'
import ContactNumberField from '@/components/proposal/business-info/ContactNumberField'
import ManagerField from '@/components/proposal/business-info/ManagerField'
import { useRouter } from 'next/navigation'

interface BusinessInfoProps {
  setCurrentStep: Dispatch<SetStateAction<number>>
}

export default function BusinessInfo({ setCurrentStep }: BusinessInfoProps) {
  const router = useRouter()
  return (
    <div className="flex flex-col gap-y-[40px]">
      <section className="border-gray-20 flex flex-col gap-y-4 rounded-[24px] border bg-white p-6">
        <h1 className="sub1">사업자 정보</h1>
        <BusinessNumberField />
        <RepresentativeNameField />
        <BusinessNameField />
        <BusinessAddressField />
        <BusinessTypeField />
        <BusinessItemField />
        <ManagerField />
        <ContactNumberField />
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
            onClick={() => {}}
            customClassName={'h-[52px] w-[260px]'}
            styleStatus={'disabled'}
            styleSize={'lg'}
            styleType={'outline'}
          >
            임시저장
          </Button1>
          <Button1
            onClick={() => {
              setCurrentStep(2)
            }}
            customClassName={'h-[52px] w-[260px]'}
            styleStatus={'disabled'}
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
