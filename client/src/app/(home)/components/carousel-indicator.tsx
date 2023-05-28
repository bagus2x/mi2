import { useMemo } from 'react'
import clsx from 'clsx'

interface CarouselIndicatorProps {
  count: number
  currentIndex: number
  onClick: (index: number) => void
}

export default function CarouselIndicator({
  count,
  currentIndex,
  onClick,
}: CarouselIndicatorProps) {
  const dots = useMemo(() => [...Array(count).keys()], [count])
  return (
    <div className='mt-2 flex justify-center space-x-2'>
      {dots.map((_, index) => (
        <div
          key={index}
          onClick={() => onClick(index)}
          className={clsx(
            'h-2 rounded-full transition-all delay-100 duration-500 xl:h-3',
            currentIndex === index
              ? 'w-3 bg-green-500 xl:w-4'
              : 'w-2 cursor-pointer bg-gray-200 xl:w-3',
          )}
        />
      ))}
    </div>
  )
}
