import getFlagshipProgram from '@mi/data/source/get-flagship-program'
import { Metadata } from 'next'
import { MDXRemote } from 'next-mdx-remote/rsc'
import { notFound } from 'next/navigation'
import { HiShare } from 'react-icons/hi2'

export const metadata: Metadata = {
  title: 'Program Unggulan',
}

export default async function Flagship() {
  const flagship = await getFlagshipProgram()

  if (!flagship) {
    notFound()
  }

  return (
    <main className='mx-auto flex max-w-screen-xl flex-row px-4 py-4 lg:py-8 xl:px-4 gap-8'>
      <section className='max-w-screen-xl'>
        <article className='prose w-full max-w-screen-xl'>
          {/* @ts-expect-error Server Component */}
          <MDXRemote
            source={flagship.description}
            components={{
              img: (props) => {
                const src = props.src?.startsWith('/')
                  ? `${process.env.SERVER_BASE_URL}${props.src}`
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
              <HiShare size={16} className='m-2' />
            </button>
          </div>
        </div>
      </section>
    </main>
  )
}
