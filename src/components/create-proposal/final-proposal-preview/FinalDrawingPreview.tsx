import Button1 from '@/components/common/Button1'
import DownloadItem from '@/components/common/DownloadItem'

export default function FinalDrawingPreview() {
  return (
    <div className="border-gray-20 flex flex-col gap-y-4 rounded-[24px] border bg-white p-6">
      <h1 className="sub1">도면</h1>
      <section className="flex flex-col gap-y-2">
        <DownloadItem customClassName={'w-[624px]'} />
        <DownloadItem customClassName={'w-[624px]'} />
        <DownloadItem customClassName={'w-[624px]'} />
        <DownloadItem customClassName={'w-[624px]'} />
      </section>
      <div className="flex w-full justify-end">
        <Button1 styleSize={'md'} styleStatus={'disabled'} styleType={'outline'} customClassName={'h-[48px] w-[160px]'}>
          수정
        </Button1>
      </div>
    </div>
  )
}
