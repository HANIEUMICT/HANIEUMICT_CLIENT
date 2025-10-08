import Card from '@/components/factory/detail/Card'

export default function EquipmentCard() {
  return (
    <div className="flex flex-col gap-y-[16px]">
      <h2 className="h2">보유장비</h2>
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
