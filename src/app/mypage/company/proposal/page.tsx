import ProposalMenu from '@/components/mypage/company/proposal/ProposalMenu'
import { getProjectMeCompany } from '@/lib/api/server/project'
import { getProposalMe } from '@/lib/api/server/proposal'
import { getCompanyFavorites } from '@/lib/api/server/favorite'
import MyPageReceivedProject from '@/components/mypage/company/proposal/MyPageReceivedProject'
import MyPageWriteProposal from '@/components/mypage/company/proposal/MyPageWriteProposal'
import MyPageLikeProject from '@/components/mypage/company/proposal/MyPageLikeProject'

type MenuType = 'received' | 'write' | 'like'
type SearchParams = Promise<{ [key: string]: string | string[] | undefined }>
const PAGE_SIZE = 20

export default async function CompanyProposalMyPage({ searchParams }: { searchParams: SearchParams }) {
  const params = await searchParams
  const menu = (params.menu as MenuType) || 'received' // 기본값
  const page = Number(params.page) || 1

  return (
    <main className="mx-auto mt-[40px] flex gap-x-[40px]">
      <section className="gap-y-2xs flex w-[1220px] flex-col">
        <h1 className="h2">견적서</h1>

        <ProposalMenu selectedMenu={menu} />
        {menu === 'received' ? <ReceivedProject page={page} /> : null}
        {menu === 'write' ? <WriteProposal page={page} /> : null}
        {menu === 'like' ? <LikeProject page={page} /> : null}
      </section>
    </main>
  )
}

async function ReceivedProject({ page }: { page: number }) {
  const offset = (page - 1) * PAGE_SIZE
  const receivedProjects = await getProjectMeCompany(offset, PAGE_SIZE)
  return <MyPageReceivedProject receivedProjects={receivedProjects.data?.content} />
}

async function WriteProposal({ page }: { page: number }) {
  const offset = (page - 1) * PAGE_SIZE
  const writeProposals = await getProposalMe(offset, PAGE_SIZE)
  return <MyPageWriteProposal writeProposals={writeProposals.data?.content} />
}

async function LikeProject({ page }: { page: number }) {
  const offset = (page - 1) * PAGE_SIZE
  const favoriteProjects = await getCompanyFavorites(offset, PAGE_SIZE)
  return <MyPageLikeProject favoriteProjects={favoriteProjects.data?.content} />
}
