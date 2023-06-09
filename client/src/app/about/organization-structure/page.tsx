import TeachersList from '@mi/app/about/organization-structure/components/teachers-list'
import { Metadata } from 'next'
import dynamic from 'next/dynamic'

const Structure = dynamic(
  () => import('@mi/app/about/organization-structure/components/structure'),
  { ssr: false },
)

export const metadata: Metadata = {
  title: 'Struktur Organisasi',
}

export default async function OrganizationStructure() {
  return (
    <main className='flex flex-col gap-4 py-4 xl:py-8'>
      <Structure />
      <TeachersList />
    </main>
  )
}
