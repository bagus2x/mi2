import { MDXRemote } from 'next-mdx-remote/rsc'

export default function PostList() {
  return (
    <div className='prose mx-auto max-w-screen-xl px-4 py-4 xl:px-0'>
      {/* @ts-expect-error Server Component */}
      <MDXRemote
        source={`
          I **love** using [Next.js](https://nextjs.org/)

          ![alt text](/images/5s.png)

          \`\`\`js highlight=1,3-5
          const foo = "bar"

          const hello = () => {
            return "World"
          }
          \`\`\`

          # Heading level 1
          - bagus
          - bambang

          # Manusia
          1. Budi
          2. Ilham
          3. Roni
      `}
      />
    </div>
  )
}
