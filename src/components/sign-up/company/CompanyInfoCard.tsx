import { SummaryCompanyInfoResponseDataType } from '@/type/auth'

interface CompanyInfoCardProps extends SummaryCompanyInfoResponseDataType {
  onClick: () => void
}
const CompanyInfoCard = ({
  onClick,
  name,
  owner,
  id,
  businessType,
  address,
  registrationNumber,
}: CompanyInfoCardProps) => {
  return (
    <div
      onClick={onClick}
      className="hover:border-conic-orange-30 gap-y-2xs border-gray-20 p-s flex w-[600px] flex-col rounded-[24px] border bg-white"
    >
      <div className="gap-y-4xs flex flex-col">
        <p className="sub1">{name}</p>
        <p className="sub1 text-gray-50">{businessType}</p>
      </div>
      <div className="flex flex-col gap-y-2">
        <div className="gap-x-4xs flex">
          <div className="body1 text-gray-40 w-[100px]">대표자</div>
          <p className="button-lg">{owner}</p>
        </div>
        <div className="gap-x-4xs flex">
          <div className="body1 text-gray-40 w-[100px]">사업자등록번호</div>
          <p className="button-lg">{registrationNumber}</p>
        </div>
        <div className="gap-x-4xs flex">
          <div className="body1 text-gray-40 w-[100px]">주소</div>
          <p className="button-lg">
            {address.street} {address.detail}
          </p>
        </div>
      </div>
    </div>
  )
}
export default CompanyInfoCard
