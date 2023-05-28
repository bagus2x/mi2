import SectionLabel from '@mi/app/(home)/components/section-label'
import { getPositiveCultures } from '@mi/data/source/positive-culture-data-source'
import Image from 'next/image'
import Link from 'next/link'

export default async function PositiveCulture() {
  const possitiveCultures = await getPositiveCultures()

  return (
    <main className='mx-auto h-full w-full max-w-screen-xl overflow-auto px-4 py-4 xl:py-8'>
      <ul className='grid grid-cols-1 gap-4 md:grid-cols-2'>
        {possitiveCultures.map((possitiveCulture) => (
          <li key={possitiveCulture.id} className='relative'>
            <SectionLabel label={possitiveCulture.title} />
            <div className='relative mt-4 w-full cursor-pointer overflow-hidden rounded-2xl'>
              <Link
                href={`/positive-culture/${possitiveCulture.id}`}
                className='relative w-full'
              >
                <Image
                  alt={possitiveCulture.title}
                  src={possitiveCulture.image}
                  width={0}
                  height={0}
                  sizes='100%'
                  className='h-full w-full transition-all active:scale-105'
                />
              </Link>
            </div>
          </li>
        ))}
      </ul>
    </main>
  )
}
