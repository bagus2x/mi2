import SectionLabel from '@mi/app/(home)/components/section-label'
import getSchedule from '@mi/data/source/get-schedule'
import { MDXRemote } from 'next-mdx-remote/rsc'
import Image from 'next/image'

export default async function Schedule() {
  const schedule = await getSchedule()

  return (
    <main className='mx-auto h-full max-w-screen-xl p-4'>
      <SectionLabel label='Jadwal Pembelajaran' />
      <div className='relative mt-8 w-full'>
        <Image
          src={schedule.image}
          alt={schedule.title}
          priority
          width={0}
          height={0}
          sizes='100%'
          className='h-full w-full transition-all delay-1000'
        />
      </div>
      {schedule.description && (
        <div className='prose mt-4 w-full'>
          {/* @ts-expect-error Server Component */}
          <MDXRemote source={schedule.description} />
        </div>
      )}
    </main>
  )
}
