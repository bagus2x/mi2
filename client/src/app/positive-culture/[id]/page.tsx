import SectionLabel from '@mi/app/(home)/components/section-label'
import { getPositiveCulture } from '@mi/data/source/get-possitive-culture'
import Image from 'next/image'
import { notFound } from 'next/navigation'

interface PositiveCultureDetailProps {
  params: {
    id: string
  }
}

export default async function PositiveCultureDetail({
  params,
}: PositiveCultureDetailProps) {
  const positiveCulture = await getPositiveCulture(parseInt(params.id))

  if (!positiveCulture) {
    notFound()
  }

  return (
    <main className='mx-auto max-w-screen-xl px-4 py-4 lg:py-8'>
      <SectionLabel label={positiveCulture.title} />
      <div className='relative mt-4 w-full'>
        <Image
          src={positiveCulture.image}
          alt={positiveCulture.title}
          priority
          width={0}
          height={0}
          sizes='100%'
          className='h-full w-full rounded-2xl transition-all delay-1000 hover:rounded-none'
        />
      </div>
    </main>
  )
}
