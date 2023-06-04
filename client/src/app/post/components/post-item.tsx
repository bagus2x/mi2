import DateFormatter from '@mi/app/components/date-formatter'
import Post from '@mi/data/models/post'
import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'framer-motion'

interface PostItemProps {
  post: Post
  animationDelay?: number
}

export default function PostItem({ post, animationDelay }: PostItemProps) {
  return (
    <motion.li
      initial={{ scale: 0.5, opacity: 0 }}
      animate={{ scale: 1, opacity: 1, transition: { delay: animationDelay } }}
      className='flex space-x-4 overflow-hidden rounded-2xl border border-gray-200 shadow-xl'
    >
      <div className='flex grow flex-col items-start space-y-2 p-4'>
        <h6 className='line-clamp-2 text-lg font-semibold'>{post.title}</h6>
        <div>
          <p className='line-clamp-3 text-sm text-gray-500'>{post.summary}</p>
          <DateFormatter
            date={post.createdAt}
            pattern='d MMMM yyyy, H:m'
            className='mt-2 text-xs text-gray-500'
          />
        </div>
        <Link
          href={`/post/${post.id}`}
          className='rounded-2xl bg-green-500 px-4 py-2 text-white transition hover:bg-green-800'
        >
          <span>Baca </span>
          <span className='hidden md:inline'>Selengkapnya</span>
        </Link>
      </div>
      <Image
        src={post.thumbnail}
        width={150}
        height={150}
        alt={post.title}
        className='shrink-0 object-cover'
      />
    </motion.li>
  )
}
