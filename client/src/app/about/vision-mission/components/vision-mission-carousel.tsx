'use client'

import CarouselIndicator from '@mi/app/(home)/components/carousel-indicator'
import SectionLabel from '@mi/app/(home)/components/section-label'
import Autoplay from 'embla-carousel-autoplay'
import useEmblaCarousel from 'embla-carousel-react'
import { QuoteDown, QuoteUp } from 'iconsax-react'
import { useCallback, useEffect, useState } from 'react'

export default function VisionMissionCarousel() {
  const [viewportRef, embla] = useEmblaCarousel({ loop: true }, [Autoplay()])
  const [selectedIndex, setSelectedIndex] = useState(0)
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
  }, [embla, setSelectedIndex])

  useEffect(() => {
    if (!embla) return
    onSelect()
    embla.on('select', onSelect)
  }, [embla, onSelect])

  return (
    <section>
      <SectionLabel label='Visi, Misi & Tujuan' />
      <div className='relative w-full'>
        <QuoteUp
          size={64}
          className='absolute bottom-0 left-0 z-0 text-gray-100'
        />
        <QuoteDown
          size={64}
          className='absolute right-0 top-0 z-0 text-gray-100'
        />
        <div className='embla mt-4 overflow-hidden' ref={viewportRef}>
          <div className='embla__container z-10 flex w-full'>
            <div className='embla__slide w-full flex-shrink-0 flex-grow-0 basis-full'>
              <div>
                <h5 className='text-center  text-2xl text-green-500'>Tujuan</h5>
                <h6 className='text-center text-sm font-semibold text-gray-800'>
                  Madrasah Islamiyah Purwojati
                </h6>
                <ul className='mx-auto mt-4 flex max-w-screen-md flex-col space-y-2 text-center'>
                  <li>
                    a. Meningkatkan kualitas pendidikan dan mengoptimalkan
                    pengembangan kurikulum berbasis kompetensi
                  </li>
                  <li>
                    b. Menghasilkan keluaran/ lulusan yang mempunyai kompetensi
                    tinggi
                  </li>
                  <li>
                    c. Mengoptimalkan pengembanag dan peningkatan etos kerja dan
                    kualitas Sumber Daya Manusia
                  </li>
                  <li>d. Memenuhi dan memanfaatkan sarana secara optimal</li>
                  <li>
                    e. Memperbaharui sistem managemen yang kurang profesional
                  </li>
                  <li>f. Meningkatkan kualitas pelajayan kepada masyarakat</li>
                  <li>g. Meningkatkan kesejahteraan pegawai</li>
                  <li>
                    h. Meningkatkan jumlah sarana dan prasarana serta
                    pemberdayaannya yang mendukung peningkatan prestasi akademik
                    maupun non akademik
                  </li>
                </ul>
              </div>
            </div>
            <div className='embla__slide w-full flex-shrink-0 flex-grow-0 basis-full'>
              <div className='w-full'>
                <div>
                  <h5 className='text-center  text-2xl text-green-500'>Visi</h5>
                  <h6 className='text-center text-sm font-semibold text-gray-800'>
                    Madrasah Islamiyah Purwojati
                  </h6>
                </div>
                <p className='mt-4 text-center'>
                  Membangun generasi beriman, bertaqwa, berakhlakul karimah dan
                  unggul dalam prestasi.
                </p>
              </div>
            </div>
            <div className='embla__slide w-full flex-shrink-0 flex-grow-0 basis-full'>
              <div>
                <h5 className='text-center  text-2xl text-green-500'>Misi</h5>
                <h6 className='text-center text-sm font-semibold text-gray-800'>
                  Madrasah Islamiyah Purwojati
                </h6>
                <ul className='mx-auto mt-4 flex max-w-screen-md flex-col space-y-4 text-center'>
                  <li>
                    a. Menyelenggarakan dan mengembangkan model pembelajaran
                    yang aktif, inovatif, kreatif, efektif, menyenangkan dan
                    konteksual, berbasiskan iman dan takwa guna meningkatkan
                    kompetensi peserta didik dalam penguasaan ilmu pengetahuan
                    dan teknologi yang berwawasan global
                  </li>
                  <li>
                    b. Membina dan mengembangkan seluruh potensi peserta didik
                    guna membangun kapasitas peserta didik yang cerdas,
                    terampil, kreatif, sehat jasmanii dan rohani, dan memiliki
                    keunggulan kompetitif dalam bidang akademik dan non akademik
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className='mt-4'>
        <CarouselIndicator
          count={3}
          currentIndex={selectedIndex}
          onClick={scrollTo}
        />
      </div>
    </section>
  )
}
