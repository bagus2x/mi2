import SectionLabel from '@mi/app/(home)/components/section-label'
import { Location, Call, Sms } from 'iconsax-react'
import dynamic from 'next/dynamic'
import Link from 'next/link'

const Map = dynamic(() => import('@mi/app/contact/components/map'), {
  ssr: false,
})

export default function Contact() {
  return (
    <main className='mx-auto flex h-full max-w-screen-xl gap-8 px-4 py-4 xl:py-8'>
      <section className='flex grow flex-col justify-start'>
        <SectionLabel label='Kontak' />
        <div className='flex w-full flex-col gap-8 md:flex-row'>
          <div className='mt-4 flex grow basis-0 flex-col flex-wrap gap-2'>
            <h6 className='text-base'>Kontak Madrasah Islamiyah Purwojati</h6>
            <ul className='mt-4 flex flex-col space-y-4'>
              <li className='flex items-start justify-start space-x-4'>
                <span className='text-gray-800'>
                  <Location variant='Outline' size={24} />
                </span>
                <div>
                  <h6 className='font-semibold'>Lokasi</h6>
                  <p>
                    Jl. Utara Masjid Sirno, Desa Purwojati, Kec. Ngoro, Kab.
                    Mojokerto
                  </p>
                  <div className='mt-4 max-w-xs'>
                    <Map />
                  </div>
                </div>
              </li>
              <li className='flex items-start justify-start space-x-4'>
                <span className='text-gray-800'>
                  <Sms variant='Outline' size={24} />
                </span>
                <div>
                  <h6 className='font-semibold'>Email</h6>
                  <Link
                    href='mailto:miispur.ngoromjkt@gmail.com'
                    className='hover:text-green-500'
                  >
                    miispur.ngoromjkt@gmail.com
                  </Link>
                </div>
              </li>
              <li className='flex items-start justify-start space-x-4'>
                <span className='text-gray-800'>
                  <Call variant='Outline' size={24} />
                </span>
                <div>
                  <h6 className='font-semibold'>Telepon</h6>
                  <Link
                    href='tel:085733888655'
                    className='hover:text-green-500'
                  >
                    085733888655
                  </Link>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </section>
    </main>
  )
}

interface ContactItem {
  text: string
  icon: React.ReactNode
}

const contactItems: ContactItem[] = [
  {
    icon: <div></div>,
    text: 'FJ62+Q57, Timbulrejo, Purwojati, Kec. Ngoro, Kabupaten Mojokerto, Jawa Timur 61385',
  },
]
