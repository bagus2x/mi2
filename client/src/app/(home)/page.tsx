import Blockquote from '@mi/app/(home)/components/blockquote'
import PostList from '@mi/app/(home)/components/post-list'
import Carousel, { CarouselItem } from '@mi/app/components/carousel'
import Headline from '@mi/data/models/headline'
import getHeadlines from '@mi/data/source/get-headlines'
import getPosts from '@mi/data/source/get-posts'
import getQuote from '@mi/data/source/get-quote'

export default async function HomePage() {
  const [headlines, quote, posts] = await Promise.all([getHeadlines(1, 10), getQuote(), getPosts(1, 10),])

  return (
    <main className='h-full w-full overflow-auto'>
      <Carousel items={mapHeadlineToCarouselItem(headlines.data)} />
      <Blockquote {...quote} />
      <PostList posts={posts.data} pagination={posts.pagination} />
    </main>
  )
}

const mapHeadlineToCarouselItem = (headlines: Headline[]): CarouselItem[] => {
  return headlines.map((headline) => {
    return {
      id: headline.id,
      imageUrl: headline.image,
      caption: headline.title,
      linkUrl: headline.link || (headline.post ? `/post/${headline.post.id}` : undefined)
    }
  })
}
