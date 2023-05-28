import PostList from '@mi/app/(home)/components/post-list'
import HeadlinesCarousel from '@mi/app/(home)/components/headline-carousel'
import Blockquote from '@mi/app/(home)/components/blockquote'
import getPosts from '@mi/data/source/get-posts'
import getHeadlines from '@mi/data/source/get-headlines'
import getQuote from '@mi/data/source/get-quote'

export default async function HomePage() {
  const [headlines, quote, posts] = await Promise.all([getHeadlines(1, 10), getQuote(), getPosts(1, 10),])

  return (
    <main className='h-full w-full overflow-auto'>
      <HeadlinesCarousel headlines={headlines.data} />
      <Blockquote {...quote} />
      <PostList posts={posts.data} pagination={posts.pagination} />
    </main>
  )
}
