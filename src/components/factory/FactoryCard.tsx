import Image from 'next/image'
import { FavoriteIcon } from '@/assets/svgComponents'

export default function FactoryCard() {
  return (
  <div className="border border-gray-20 w-[290px] h-[318px] rounded-[16px] border">
    <section className="relative h-[120px] w-[290px] rounded-[16px]">
        <Image src={'/test.png'} alt="사진" fill className="object-cover rounded-t-[16px]"></Image>
        {/* 아이콘, 좋아요 갯수 */}
        <div className='flex gap-5xs absolute top-[10px] right-[15px]'>
            <FavoriteIcon width={16} height={14}></FavoriteIcon>
            <p className='button-sm text-white'>230</p>
        </div>
    </section>


    <div className="flex flex-col gap-y-4xs h-[198px] w-[290px] p-2xs bg-white rounded-b-[16px]">
        {/* 카테고리 */}
        <div className="flex items-center border border-gray-20 button-sm w-fit h-[24px] px-[8px] border rounded-full text-gray-50">
            카테고리
        </div>
        {/* 기업명 */}
        <div className="h3">
            기업명
        </div>
        {/* 상세정보 */}
        <div className='flex flex-col gap-y-[4px]'>
            <div className='flex items-center justify-between'>
                <p className='body2 text-gray-40'>제작 평균 소요시간</p>
                <p className='button-sm text-gray-50'>1개월</p>
            </div>
            <div className='flex items-center justify-between'>
                <p className='body2 text-gray-40'>거래 건수</p>
                <p className='button-sm text-gray-50'>999+</p>
            </div>
            <div className='flex items-center justify-between'>
                <p className='body2 text-gray-40'>재거래 고객</p>
                <p className='button-sm text-gray-50'>999+</p>
            </div>
            <div className='flex items-center justify-between'>
                <p className='body2 text-gray-40'>평균 응답 시간</p>
                <p className='button-sm text-gray-50'>1시간 이내</p>
            </div>
        </div>
    </div>
  </div>
  )
}

//tailwindCSS -> CSS -> 편하게 사용할 수 있게 하는 프레임워크
// className=""
// w-[100px] h-[100px] //픽셀단위는 대괄호
// border border-gray20
// rounded-[16px], rounded-full
// relative object-cover 세트
// 패딩 선언 p-2xs px py pl {x,y,l,r,t,b}
// 마진 m-
// 배경 색상 bg
// 텍스트 색상변경text-gray-20
// felx items-center //justify-between p랑 p를 끝과 끝으로
// 세로정렬과 간격 flex flex-col gap-y-[4px]
