'use client'

import CarouselIndicator from '@mi/app/(home)/components/carousel-indicator'
import Headline from '@mi/data/models/headline'
import Autoplay from 'embla-carousel-autoplay'
import useEmblaCarousel from 'embla-carousel-react'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useCallback, useEffect, useState } from 'react'
import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from 'react-icons/md'

interface HeadlineCarouselProps {
  headlines: Headline[]
}

const HeadlineCarousel = ({ headlines }: HeadlineCarouselProps) => {
  const [viewportRef, embla] = useEmblaCarousel({ loop: true }, [Autoplay()])
  const [prevBtnEnabled, setPrevBtnEnabled] = useState(false)
  const [nextBtnEnabled, setNextBtnEnabled] = useState(false)
  const [selectedIndex, setSelectedIndex] = useState(0)
  const router = useRouter()

  const scrollPrev = useCallback(() => embla && embla.scrollPrev(), [embla])
  const scrollNext = useCallback(() => embla && embla.scrollNext(), [embla])
  const scrollTo = useCallback(
    (index: number) => {
      return embla && embla.scrollTo(index)
    },
    [embla],
  )

  const onSelect = useCallback(() => {
    if (!embla) return
    setSelectedIndex(embla.selectedScrollSnap())
    setPrevBtnEnabled(embla.canScrollPrev())
    setNextBtnEnabled(embla.canScrollNext())
  }, [embla, setSelectedIndex])

  useEffect(() => {
    if (!embla) return
    onSelect()
    embla.on('select', onSelect)
  }, [embla, onSelect])

  return (
    <div className='flex w-full flex-col'>
      <div
        className='embla group relative aspect-[4/1] w-full flex-grow overflow-hidden'
        ref={viewportRef}
      >
        <div className='embla__container flex h-full w-full'>
          {headlines.map(({ id, title, image, link, post }) => (
            <div
              key={id}
              onClick={() => router.push('')}
              className='embla__slide relative h-full w-full min-w-0 flex-shrink-0 flex-grow-0 basis-full'
            >
              <Image alt={title || 'headlines'} fill src={image} className='object-cover' />
              {
                (title || link || post) && <div className='w-full px-4 py-4 bg-gray-800 bg-opacity-50 left-0 bottom-0 absolute flex justify-center flex-col items-center gap-4'>
                  {title && <h1 className='text-xl text-white font-mono'>{title}</h1>}
                  {(link || post) && <Link href={link || `/post${post?.id}`} className='px-4 py-2 rounded-xl bg-green-500 hover:bg-green-800 text-white text-sm'>Baca</Link>}
                </div>
              }
            </div>
          ))}
        </div>
        {prevBtnEnabled && (
          <button
            onClick={scrollPrev}
            className='invisible absolute left-0 top-[50%] m-4 translate-y-[-50%] rounded-full bg-gray-50 bg-opacity-25 p-1 opacity-0 transition-all group-hover:opacity-100 sm:visible'
          >
            <MdKeyboardArrowLeft size={40} className='text-green-500' />
          </button>
        )}
        {nextBtnEnabled && (
          <button
            onClick={scrollNext}
            className='invisible absolute right-0 top-[50%] m-4 translate-y-[-50%] rounded-full bg-gray-50 bg-opacity-25 p-1 opacity-0 transition-all group-hover:opacity-100 sm:visible'
          >
            <MdKeyboardArrowRight size={40} className='text-green-500' />
          </button>
        )}
      </div>
      <CarouselIndicator
        count={headlines.length}
        currentIndex={selectedIndex}
        onClick={scrollTo}
      />
    </div>
  )
}

export default HeadlineCarousel
