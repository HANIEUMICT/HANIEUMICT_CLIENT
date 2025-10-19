import { RightIcon } from '@/assets/svgComponents'
import { GrayLeftIcon } from '@/assets/svgComponents'



export default function ReviewPagination(){
    return(
        <div className="flex items-center justify-center gap-[8px]">
        
            <div className='w-[32px] h-[32px] flex items-center justify-center'>
                <GrayLeftIcon width={8} height={16}></GrayLeftIcon>
            </div>
            <div className="flex w-[217px] h-[32px] gap-[5px]">
                <button className="w-[32px] h-[32px] p-[8px] flex items-center justify-center text-white bg-conic-orange-30 rounded-[12px]">1</button>
                <button className="w-[32px] h-[32px] p-[8px] flex items-center justify-center text-gray-40">2</button>
                <button className="w-[32px] h-[32px] p-[8px] flex items-center justify-center text-gray-40">3</button>
                <button className="w-[32px] h-[32px] p-[8px] flex items-center justify-center text-gray-40">4</button>
                <button className="w-[32px] h-[32px] p-[8px] flex items-center justify-center text-gray-40">5</button>
                <button className="w-[32px] h-[32px] p-[8px] flex items-center justify-center text-gray-40">...</button>
            </div>
            <div className='w-[32px] h-[32px] flex items-center justify-center'>
                <RightIcon width={8} height={16}></RightIcon>
            </div>
        
        </div>

    )
}