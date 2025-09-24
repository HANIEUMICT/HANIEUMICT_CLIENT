interface FilterProps {
  title: string
  selectedText: string | undefined
}

export default function Filter({ title, selectedText }: FilterProps) {
  return (
    <div className="relative flex flex-col gap-y-3">
      <ToggleFilterButton title={title} selectedText={selectedText} />
      <FilterPanel />
    </div>
  )
}
function ToggleFilterButton({ title, initText, selectedText }: { title: string; selectedText: string | undefined }) {
  return (
    <div className="border-gray-20 px-2xs flex h-[40px] items-center justify-center rounded-[12px] border bg-white">
      <p className="sub2">{title}</p>
      <p className="body1 text-gray-50">{selectedText ? initText : selectedText}</p>
      <></>
      <></>
    </div>
  )
}

function FilterPanel() {
  return <></>
}
