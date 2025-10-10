import PostCode from 'react-daum-postcode'
import { CancelIcon } from '@/assets/svgComponents'
import { useModalStore } from '@/store/modalStore'

interface SearchAddressModalProps {
  handleComplete: (data: any) => Promise<void>
}

const SearchAddressModal = ({ handleComplete }: SearchAddressModalProps) => {
  const setModalState = useModalStore((state) => state.setState)

  return (
    <div className={'fixed inset-0 z-50 flex items-center justify-center bg-[rgba(0,0,0,0.3)]'}>
      <div
        onClick={() => setModalState({ isSearchAddressModalOpen: false, isAddAddressInfoModalOpen: true })}
        className="fixed top-[50%] right-[50%] left-[50%] flex h-[508px] w-[1008px] translate-x-[-50%] translate-y-[-50%] flex-col gap-y-4 rounded-[32px] bg-white p-6"
      >
        <div className={'flex w-full justify-end'}>
          <CancelIcon
            onClick={() => setModalState({ isSearchAddressModalOpen: false, isAddAddressInfoModalOpen: true })}
            width={24}
            height={24}
          />
        </div>
        <PostCode onComplete={handleComplete} className="" />
      </div>
    </div>
  )
}
export default SearchAddressModal
