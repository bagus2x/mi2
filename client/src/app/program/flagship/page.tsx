import Carousel, { CarouselItem } from '@mi/app/components/carousel'
import { Media } from '@mi/data/models/media'
import getFlagshipProgram from '@mi/data/source/get-flagship-program'
import { SERVER_BASE_URL } from '@mi/utils/constants'
import { Share } from 'iconsax-react'
import { Metadata } from 'next'
import { MDXRemote } from 'next-mdx-remote/rsc'
import { notFound } from 'next/navigation'

export const metadata: Metadata = {
  title: 'Program Unggulan',
}

export default async function Unggulan() {
  const flagship = await getFlagshipProgram()

  if (!flagship) {
    notFound()
  }

  return (
    <main className='mx-auto flex flex-col gap-8 pb-4 xl:pb-8'>
      <Carousel items={mapImagesToCarouselItem(flagship.images)} />
      <section className='mx-auto max-w-screen-xl px-4 xl:px-4'>
        <article className='prose w-full max-w-screen-xl'>
          {/* @ts-expect-error Server Component */}
          <MDXRemote
            source={flagship.description}
            components={{
              img: (props) => {
                const src = props.src?.startsWith('/')
                  ? `${SERVER_BASE_URL}${props.src}`
                  : props.src
                return <img {...props} src={src} />
              },
            }}
          />
        </article>
        <div className='mt-4 h-[1px] w-full bg-gray-200' />
        <div className='mt-2 flex w-full items-center justify-end gap-2'>
          <div className='flex w-full grow justify-end'>
            <button
              className='rounded-full text-xs text-gray-800 hover:bg-green-50'
              role='button'
            >
              <Share size={16} className='m-2' />
            </button>
          </div>
        </div>
      </section>
    </main>
  )
}

const mapImagesToCarouselItem = (images: Media[]): CarouselItem[] => {
  return images.map((image) => {
    return {
      id: image.id,
      imageUrl: image.url,
      caption: image.caption || image.alternativeText,
    }
  })
}
