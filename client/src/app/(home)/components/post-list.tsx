'use client'

import PostCard from '@mi/app/(home)/components/post-card'
import SectionLabel from '@mi/app/(home)/components/section-label'
import Pagination from '@mi/data/models/pagination'
import Post from '@mi/data/models/post'

interface PostListProps {
  posts: Post[]
  pagination: Pagination
}

export default function PostList({ posts, pagination }: PostListProps) {
  return (
    <section className='mx-auto my-8 flex max-w-screen-xl flex-col items-start px-4'>
      <SectionLabel label='Kabar Sekolah' />
      <div className='mt-8 grid w-full auto-rows-min grid-cols-1 gap-8 sm:grid-cols-2 md:grid-cols-3 lg:gap-10'>
        {posts.map((post) => (
          <PostCard key={post.id} post={post} />
        ))}
      </div>
    </section>
  )
}
