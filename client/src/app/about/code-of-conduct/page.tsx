import SectionLabel from '@mi/app/(home)/components/section-label'
import getCodeOfConduct from '@mi/data/source/get-code-of-conduct'
import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { MDXRemote } from 'next-mdx-remote/rsc'
import { SERVER_BASE_URL } from '@mi/utils/constants'

export const metadata: Metadata = {
  title: 'Tata Tertib',
}

export default async function CodeOfConduct() {
  const codeOfConduct = await getCodeOfConduct()

  if (!codeOfConduct) {
    notFound()
  }

  return (
    <main className='mx-auto flex-col flex max-w-screen-xl px-4 py-4 lg:py-8 gap-4'>
      <SectionLabel label='Tata Tertib' />
      <article className='prose w-full max-w-screen-xl'>
        {/* @ts-expect-error Server Component */}
        <MDXRemote
          source={codeOfConduct.body}
          components={{
            img: (props) => {
              const src = props.src?.startsWith('/') ? `${SERVER_BASE_URL}${props.src}` : props.src
              return <img {...props} src={src} />
            },
          }}
        />
      </article>
    </main>
  )
}
