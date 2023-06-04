import DateFormatter from '@mi/app/components/date-formatter'
import getPost from '@mi/data/source/get-post'
import getPosts from '@mi/data/source/get-posts'
import { SERVER_BASE_URL } from '@mi/utils/constants'
import { Share } from 'iconsax-react'
import { Metadata } from 'next'
import { MDXRemote } from 'next-mdx-remote/rsc'
import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'

interface PostDetailProps {
  params: {
    id: string
  }
}

export const generateMetadata = async ({
  params,
}: PostDetailProps): Promise<Metadata> => {
  const postId = parseInt(params.id)
  const post = await getPost(postId)

  if (!post) {
    notFound()
  }

  return {
    title: `${post.title} | MI Purwojati`,
    openGraph: {
      title: `${post.title} | MI Purwojati`,
      description: post.summary,
      images: [post.thumbnail],
      type: 'article',
    },
  }
}

export default async function PostDetail({ params }: PostDetailProps) {
  const postId = parseInt(params.id)
  const [post, reccomendedPosts] = await Promise.all([
    getPost(postId),
    getPosts(1, 5, `&filters[id][$not][$eq]=${postId}`),
  ])

  if (!post) {
    notFound()
  }

  return (
    <main className='mx-auto flex max-w-screen-xl flex-col gap-8 px-4 py-4 md:flex-row lg:py-8 xl:px-4'>
      <section className='w-full max-w-screen-lg'>
        <h1 id='title' className='w-full text-4xl font-semibold text-gray-800'>
          {post.title}
        </h1>
        <span className='mt-2 text-xs text-gray-500'>
          <span>Ditulis pada: </span>
          <DateFormatter
            as='span'
            date={post.createdAt}
            pattern='d MMMM yyyy, H:m'
          />
        </span>
        <div className='mt-4 h-[1px] w-full bg-gray-200' />
        <article className='prose mt-8 w-full max-w-screen-lg'>
          {/* @ts-expect-error Server Component */}
          <MDXRemote
            source={post.body}
            components={{
              img: (props) => {
                const src = props.src?.startsWith('/')
                  ? `${SERVER_BASE_URL}${props.src}`
                  : props.src
                return <img {...props} src={src} />
              },
            }}
          />
        </article>
        <div className='mt-4 h-[1px] w-full bg-gray-200' />
        <div className='mt-2 flex w-full items-center justify-between gap-2'>
          <div className='flex w-full grow flex-wrap gap-2'>
            {post.categories.map((category) => (
              <span
                key={category.id}
                className='rounded-lg bg-gray-800 px-2 py-1 text-xs text-white'
              >
                {category.name}
              </span>
            ))}
          </div>
          <div className='flex w-full grow justify-end'>
            <button
              className='rounded-full text-xs text-gray-800 hover:bg-green-50'
              role='button'
            >
              <Share size={16} className='m-2' />
            </button>
          </div>
        </div>
      </section>
      <aside className='w-full shrink-0 md:w-80'>
        <div>
          <h6 className='text-2xl font-semibold text-gray-800'>
            Kabar Terbaru
          </h6>
          <ul className='mt-4 flex flex-col gap-8'>
            {reccomendedPosts.data.map((post) => (
              <li key={post.id}>
                <Link
                  key={post.id}
                  href={`/post/${post.id}`}
                  className='flex w-full flex-row space-x-2'
                >
                  <div className='relative h-24 w-24 shrink-0 overflow-hidden rounded-lg'>
                    <Image fill src={post.thumbnail} alt={post.title} />
                  </div>
                  <div className='grow'>
                    <span className='line-clamp-1 text-base text-gray-800'>
                      {post.title}
                    </span>
                    <p className='line-clamp-2 text-sm text-gray-500'>
                      {post.summary}
                    </p>
                    <DateFormatter
                      date={post.updatedAt}
                      pattern='d MMMM yyyy, H:m'
                      className='mt-1 text-xs text-gray-400'
                    />
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </aside>
    </main>
  )
}
