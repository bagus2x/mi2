import PostList from "@mi/app/post/components/post-list";
import getPosts from "@mi/data/source/get-posts";

export default async function Posts() {
  const posts = await getPosts(1, 10, '&sort[0]=id:desc')

  return (
    <div className='w-full h-full max-w-screen-xl px-4 py-4 lg:py-8 mx-auto'>
      <PostList initialData={posts} />
    </div>
  )
}
