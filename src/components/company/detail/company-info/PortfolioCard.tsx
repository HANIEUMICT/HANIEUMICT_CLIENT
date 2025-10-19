import Card from '@/components/company/detail/Card'

export default function PortfolioCard() {
  return (
    <div className="flex flex-col gap-y-[16px]">
      <h2 className="h2">완제품</h2>
      <section className="gap-xs grid grid-cols-4">
        <Card />
        <Card />
        <Card />
        <Card />
        <Card />
        <Card />
        <Card />
        <Card />
      </section>
    </div>
  )
}
