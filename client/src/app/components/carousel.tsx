'use client'

import CarouselIndicator from '@mi/app/(home)/components/carousel-indicator'
import Autoplay from 'embla-carousel-autoplay'
import useEmblaCarousel from 'embla-carousel-react'
import { ArrowLeft2, ArrowRight2 } from 'iconsax-react'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useCallback, useEffect, useState } from 'react'

export interface CarouselItem {
  id: number
  imageUrl: string
  caption?: string
  linkUrl?: string
}

interface CarouselProps {
  items: CarouselItem[]
}

const Carousel = ({ items }: CarouselProps) => {
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
          {items.map((item) => (
            <div
              key={item.id}
              className='embla__slide relative h-full w-full min-w-0 flex-shrink-0 flex-grow-0 basis-full'
            >
              <Image
                alt={item.caption || 'carousel'}
                fill
                src={item.imageUrl}
                className='object-cover'
              />
              {item.caption && (
                <div className='absolute bottom-0 left-0 flex w-full flex-col items-center justify-center gap-4 bg-gray-800 bg-opacity-60 px-4 py-4'>
                  {item.caption && (
                    <h1
                      onClick={() => {
                        if (item.linkUrl) {
                          router.push(item.linkUrl)
                        }
                      }}
                      className='text-center font-mono text-xs text-white md:text-xl'
                    >
                      {item.caption}
                    </h1>
                  )}
                  {item.linkUrl && (
                    <Link
                      href={item.linkUrl}
                      className='hidden rounded-xl bg-green-500 px-4 py-2 text-sm text-white hover:bg-green-800 md:block'
                    >
                      Baca
                    </Link>
                  )}
                </div>
              )}
            </div>
          ))}
        </div>
        {prevBtnEnabled && (
          <button
            onClick={scrollPrev}
            className='invisible absolute left-0 top-[50%] m-4 translate-y-[-50%] rounded-full bg-gray-50 bg-opacity-25 p-1 opacity-0 transition-all group-hover:opacity-100 sm:visible'
          >
            <ArrowLeft2 size={40} className='text-green-500' />
          </button>
        )}
        {nextBtnEnabled && (
          <button
            onClick={scrollNext}
            className='invisible absolute right-0 top-[50%] m-4 translate-y-[-50%] rounded-full bg-gray-50 bg-opacity-25 p-1 opacity-0 transition-all group-hover:opacity-100 sm:visible'
          >
            <ArrowRight2 size={40} className='text-green-500' />
          </button>
        )}
      </div>
      <CarouselIndicator
        count={items.length}
        currentIndex={selectedIndex}
        onClick={scrollTo}
      />
    </div>
  )
}

export default Carousel
