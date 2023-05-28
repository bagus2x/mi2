interface SectionLabelProps {
  label: string
}

export default function SectionLabel({ label }: SectionLabelProps) {
  return (
    <div className='flex w-full items-center space-x-4'>
      <h1 className='whitespace-nowrap rounded-2xl bg-gray-800 px-4 py-2 xl:text-3xl text-xl text-white'>
        {label}
      </h1>
      <div className='h-[2px] w-full rounded bg-green-500' />
    </div>
  )
}
