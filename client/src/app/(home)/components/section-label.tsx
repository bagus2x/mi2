interface SectionLabelProps {
  label: string
  divider?: boolean
}

export default function SectionLabel({
  label,
  divider = true,
}: SectionLabelProps) {
  return (
    <div className='flex w-full items-center space-x-4'>
      <h1 className='whitespace-nowrap rounded-2xl bg-gray-800 px-4 py-2 text-xl text-white xl:text-2xl'>
        {label}
      </h1>
      {divider && <div className='h-[2px] w-full rounded bg-green-500' />}
    </div>
  )
}
