'use client'

import DateFormatter from '@mi/app/components/date-formatter'
import Post from '@mi/data/models/post'
import Image from 'next/image'
import Link from 'next/link'

interface PostCardProps {
  post: Post
}

export default function PostCard({ post }: PostCardProps) {
  return (
    <div className='w-full overflow-hidden rounded-2xl border border-gray-100 shadow-xl'>
      <div className='relative aspect-[2/1] w-full'>
        <Image
          alt={post.title}
          src={post.thumbnail}
          fill
          className='object-cover'
        />
      </div>
      <div className='p-4'>
        <h6 className='text-sm font-semibold text-gray-800'>{post.title}</h6>
        <div className='mt-2 flex flex-wrap gap-1'>
          {post.categories.map((category) => (
            <span
              key={category.id}
              className='rounded-lg bg-gray-800 px-2 py-1 text-xs text-white'
            >
              {category.name}
            </span>
          ))}
        </div>
        <p className='mt-2 line-clamp-2 text-sm text-gray-600'>
          {post.summary}
        </p>
        <div className='mt-2 flex justify-between space-x-4'>
          <DateFormatter
            pattern='d MMMM yyyy, H:m'
            date={post.createdAt}
            className='text-xs text-gray-400'
          />
          <Link
            href={`/post/${post.id}#top`}
            className='rounded-2xl bg-green-500 px-4 py-2 text-sm text-white transition-all hover:bg-green-800'
          >
            Baca
          </Link>
        </div>
      </div>
    </div>
  )
}
