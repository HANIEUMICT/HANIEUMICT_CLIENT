import { RightIcon } from '@/assets/svgComponents'
import { LeftIcon } from '@/assets/svgComponents'

export default function FactoryArrowButton() {
    return(
        <div className='flex items-center justify-center border border-gray-20 w-[80px] h-[40px] rounded-[12px]'>
            <div className='flex items-center justify-center w-[40px] h-[40px]'>
                <LeftIcon width={24} height={24}></LeftIcon>
            </div>
            <div className='flex items-center justify-center w-[40px] h-[40px]'>
                <RightIcon width={24} height={24}></RightIcon>
            </div>
            
        </div>
    )
}