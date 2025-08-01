'use client'
import Header from '@/components/common/Header'
import ReviewPagination from '../review/ReviewPagination'
import EstimateCard from './EstimateCard'
import EstimateCategory from './EstimateCategory'
import EstimateSearch from './EstimateSearch'


export default function EstimateListPage(){
    return(
        <main>

        <Header></Header>
        <div className="h-[100px]"></div>
        <div className='flex flex-col'>
            
            <div className='flex flex-col gap-[40px] items-center'>
                {/*견적서 검색창*/}
                <EstimateSearch></EstimateSearch>

                <div className='flex flex-col gap-[16px] justify-center'>
                    <p className='h2'>견적서 전체보기</p>

                    {/*견적서 카테고리*/}
                    <EstimateCategory></EstimateCategory>

                    {/*견적서 리스트*/}
                    <section className='flex flex-col gap-[20px]'>
                        <div className='flex gap-s'>
                            <EstimateCard></EstimateCard>
                            <EstimateCard></EstimateCard>
                            <EstimateCard></EstimateCard>
                        </div>
                        <div className='flex gap-s'>
                            <EstimateCard></EstimateCard>
                            <EstimateCard></EstimateCard>
                            <EstimateCard></EstimateCard>
                        </div>
                        <div className='flex gap-s'>
                            <EstimateCard></EstimateCard>
                            <EstimateCard></EstimateCard>
                            <EstimateCard></EstimateCard>
                        </div>
                        <div className='flex gap-s'>
                            <EstimateCard></EstimateCard>
                            <EstimateCard></EstimateCard>
                            <EstimateCard></EstimateCard>
                        </div>
                        <div className='flex gap-s'>
                            <EstimateCard></EstimateCard>
                            <EstimateCard></EstimateCard>
                            <EstimateCard></EstimateCard>
                        </div>
                    </section>

                    <ReviewPagination></ReviewPagination>
                </div>
            </div>

            

            
        </div>
        </main>
    )
}