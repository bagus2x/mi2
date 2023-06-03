import FacilityList from '@mi/app/about/facility/components/facility-list'
import getDevelopmentProgram from '@mi/data/source/get-development-program'
import { Metadata } from 'next'
import { notFound } from 'next/navigation'

export const metadata: Metadata = {
  title: 'Fasilitas Sekolah',
}

export default async function Development() {
  const development = await getDevelopmentProgram()

  if (!development) {
    notFound()
  }

  return (
    <main className='mx-auto flex max-w-screen-xl flex-row px-4 py-4 xl:py-8 gap-8'>
      <FacilityList />
    </main>
  )
}
