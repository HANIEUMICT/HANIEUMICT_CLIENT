import Input from '@/components/common/Input'
import Button1 from '@/components/common/Button1'
import { useModalStore } from '@/store/modalStore'
import { useAuthStore } from '@/store/authStore'

export default function CompanyAddressField() {
  const setModalState = useModalStore((state) => state.setState)
  const registerCompanyInfoData = useAuthStore((state) => state.registerCompanyInfoData)
  const setState = useAuthStore((state) => state.setState)

  return (
    <div className="gap-y-4xs flex flex-col">
      <section className="gap-x-5xs sub2 flex">
        주소 <span className="text-conic-red-30">*</span>
      </section>
      <section className="gap-x-4xs flex">
        <Input
          readonly={true}
          onClick={() => {
            setModalState({ isSearchAddressModalOpen: true })
          }}
          value={registerCompanyInfoData?.addressRegisterRequest?.postalCode ?? ''}
          inputBoxStyle={'default'}
          placeholder={'우편번호 입력'}
          customClassName={'w-full'}
        />
        <Button1
          onClick={() => {
            setModalState({ isSearchAddressModalOpen: true })
          }}
          styleSize={'lg'}
          styleStatus={'default'}
          styleType={'secondary'}
          customClassName={'whitespace-nowrap w-[120px]'}
        >
          주소찾기
        </Button1>
      </section>
      <Input
        value={registerCompanyInfoData?.addressRegisterRequest?.streetAddress ?? ''}
        onChange={(e) =>
          setState({
            ...registerCompanyInfoData,
            registerCompanyInfoData: {
              ...registerCompanyInfoData,
              addressRegisterRequest: {
                ...registerCompanyInfoData?.addressRegisterRequest,
                streetAddress: e.target.value,
              },
            },
          })
        }
        inputBoxStyle={'default'}
        placeholder={'주소'}
        customClassName={'w-full'}
      />
      <Input
        value={registerCompanyInfoData?.addressRegisterRequest?.detailAddress ?? ''}
        onChange={(e) =>
          setState({
            ...registerCompanyInfoData,
            registerCompanyInfoData: {
              ...registerCompanyInfoData,
              addressRegisterRequest: {
                ...registerCompanyInfoData?.addressRegisterRequest,
                detailAddress: e.target.value,
              },
            },
          })
        }
        inputBoxStyle={'default'}
        placeholder={'상세주소를 입력해주세요.'}
        customClassName={'w-full'}
      />
    </div>
  )
}
