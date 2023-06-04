import History from '@mi/app/about/vision-mission/components/history'
import VisionMissionCarousel from '@mi/app/about/vision-mission/components/vision-mission-carousel'
import getDevelopmentProgram from '@mi/data/source/get-development-program'
import { Metadata } from 'next'
import { notFound } from 'next/navigation'

export const metadata: Metadata = {
  title: 'Program Pengembangan',
}

export default async function Development() {
  const development = await getDevelopmentProgram()

  if (!development) {
    notFound()
  }

  return (
    <main className='mx-auto flex max-w-screen-xl flex-col gap-8 px-4 py-4 lg:py-8'>
      <History />
      <VisionMissionCarousel />
    </main>
  )
}
