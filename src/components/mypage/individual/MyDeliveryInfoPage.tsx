import Button1 from '@/components/common/Button1'
import { deleteAddress, getAddressList } from '@/lib/mypage'
import Pagination from '@/components/common/Pagination'
import { useEffect, useState } from 'react'
import { AddressResponseType } from '@/type/mypage'
import { useModalStore } from '@/store/modalStore'

export default function MyDeliveryInfoPage() {
  const setModalState = useModalStore((state) => state.setState)
  // 페이지네이션
  const [currentPage, setCurrentPage] = useState(0)
  const [totalPages, setTotalPages] = useState<number>(0)
  const [totalElements, setTotalElements] = useState<number>(0)

  const [addressList, setAddressList] = useState<AddressResponseType[]>()

  // 페이지 변경 핸들러
  const handlePageChange = (page: number) => {
    setCurrentPage(page - 1) // Pagination은 1부터 시작하지만 API는 0부터 시작
  }

  // 데이터 로드
  useEffect(() => {
    const loadArchiveData = async () => {
      try {
        const response = await getAddressList(currentPage, 10)

        console.log('API 전체 응답:', response)

        if (response && response.result === 'SUCCESS' && response.data && Array.isArray(response.data.content)) {
          const content = response.data.content
          setAddressList(content)
          setTotalPages(response.data.totalPages)
          setTotalElements(response.data.totalElements || 0)
        } else {
          console.warn('예상하지 못한 응답 구조:', response)
          setAddressList([])
          setTotalPages(0)
          setTotalElements(0)
        }
      } catch (error: unknown) {
        console.error('주소 데이터 불러오기 실패:', error)
        setAddressList([])
        setTotalPages(0)
        setTotalElements(0)
      } finally {
      }
    }

    loadArchiveData()
  }, [currentPage]) // currentPage 변경 시 실행

  return (
    <section className="gap-y-2xs mt-[40px] flex w-[1220px] flex-col">
      <div className="flex justify-between">
        <h1 className="h2">배송 정보</h1>
        <Button1
          onClick={() => {
            setModalState({ isAddAddressModalOpen: true })
          }}
          styleStatus={'default'}
          styleSize={'sm'}
          styleType={'secondary'}
          customClassName={'w-[80px] rounded-full h-[36px]'}
        >
          추가
        </Button1>
      </div>
      {addressList
        ? addressList.map((address) => {
            return (
              <section className="p-s border-gray-20 flex justify-between gap-y-[16px] rounded-[24px] border bg-white">
                <div className="flex flex-col gap-y-[16px]">
                  <div className="gap-x-4xs flex items-center">
                    <h1 className="sub1">배송지명</h1>
                    <div className="badge text-conic-blue-30 bg-conic-blue-10 p-5xs w-fit rounded-[4px]">
                      기본 배송지
                    </div>
                  </div>

                  <div className="flex items-center gap-x-[7px]">
                    <p className="body1 text-gray-40">전화번호</p>
                    <p className="button-lg"></p>
                  </div>
                  <div className="flex items-center gap-x-[7px]">
                    <p className="body1 text-gray-40">주소</p>
                    <p className="button-lg">
                      {address.streetAddress} {address.detailAddress} {address.postalCode}
                    </p>
                  </div>
                </div>
                <div className="flex h-fit gap-x-3">
                  <Button1
                    onClick={async () => {
                      const result = await deleteAddress(address.id)
                      console.log('result', result)
                    }}
                    styleType={'secondary'}
                    styleSize={'sm'}
                    styleStatus={'disabled'}
                    customClassName={'text-gray-40 w-[80px] rounded-full h-[36px]'}
                  >
                    삭제
                  </Button1>
                </div>
              </section>
            )
          })
        : null}

      <div className="my-[40px]">
        <Pagination
          totalPages={totalPages}
          onPageChange={handlePageChange}
          currentPage={currentPage + 1} // API는 0부터, UI는 1부터
          showPages={5}
        />
      </div>
    </section>
  )
}
