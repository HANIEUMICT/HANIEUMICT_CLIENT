import { useModalStore } from '@/store/modalStore'

export default function TranslationModal() {
  const setState = useModalStore((state) => state.setState)
  const isTranslationModalOpen = useModalStore((state) => state.isTranslationModalOpen)

  const languageList = ['한국어', '중국어', '영어']
  return (
    <div className="p-xs absolute top-20 right-40 flex flex-col gap-y-3 rounded-[20px] bg-white shadow-md">
      {languageList.map((language) => {
        return (
          <button
            onClick={() => {
              setState({ isTranslationModalOpen: !isTranslationModalOpen })
            }}
            key={language}
            className="button-sm p-4xs text-gray-40 flex w-[100px] items-center justify-center"
          >
            {language}
          </button>
        )
      })}
    </div>
  )
}
