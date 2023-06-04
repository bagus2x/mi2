'use client'

import CircularIndicator from '@mi/app/components/circular-indicator'
import PostItem from '@mi/app/post/components/post-item'
import useGetUsers from '@mi/data/hooks/use-get-posts'
import { Paging } from '@mi/data/models/paging'
import Post from '@mi/data/models/post'
import { AnimatePresence, useInView } from 'framer-motion'
import { useEffect, useRef } from 'react'

interface PostListProps {
  initialData: Paging<Post>
}

export default function PostList({ initialData }: PostListProps) {
  const { isLoading, isFetching, data, fetchNextPage } =
    useGetUsers(initialData)
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref)

  useEffect(() => {
    if (inView) {
      fetchNextPage()
    }
  }, [inView])

  return (
    <section className='relative flex min-h-full w-full flex-col'>
      <ul className='flex w-full flex-col space-y-8'>
        <AnimatePresence>
          {data?.pages.map((page) =>
            page.data.map((post, index) => (
              <PostItem
                key={post.id}
                post={post}
                animationDelay={index * 0.1}
              />
            )),
          )}
        </AnimatePresence>
        <div ref={ref} className='sr-only'>
          Muat Lebih Banyak
        </div>
        {isFetching && (
          <div className='mx-auto my-4'>
            <CircularIndicator />
          </div>
        )}
      </ul>
      {isLoading && (
        <div className='fixed left-[50%] top-[50%] translate-x-[-50%] translate-y-[-50%]'>
          <CircularIndicator />
        </div>
      )}
    </section>
  )
}
