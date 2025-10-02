'use client'

import Header from '@/components/common/Header'
import ProjectCard from '@/components/project/ProjectCard'
import Pagination from '@/components/common/Pagination'
import Input from '@/components/common/Input'
import Filter from '@/components/common/Filter'

export default function ProjectPage() {
  return (
    <main className="flex flex-col items-center justify-center">
      <Header headerType={'DEFAULT'} />
      <section className="mt-[100px] flex w-[1218px] flex-col gap-y-[40px] border">
        <Input
          value={''}
          inputBoxStyle={'default'}
          placeholder={"‘공급업체' 또는 ‘카테고리' 검색어를 입력해보세요."}
        ></Input>
        <section className="flex flex-col gap-y-4">
          <h1 className="h2">견적서 전체보기</h1>
          <section className="flex gap-x-2">
            {/*<Filter title={'카테고리'} />*/}
            {/*<Filter title={'제조 분류'} />*/}
            {/*<Filter title={'평균 응답 시간'} />*/}
            {/*<Filter title={'입찰 여부'} />*/}
          </section>
          <section className="gap-s grid grid-cols-3">
            {/*<ProjectCard />*/}
            {/*<ProjectCard />*/}
            {/*<ProjectCard />*/}
            {/*<ProjectCard />*/}
            {/*<ProjectCard />*/}
          </section>
        </section>
      </section>

      <Pagination />
    </main>
  )
}
