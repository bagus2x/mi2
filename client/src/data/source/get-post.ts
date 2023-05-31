'server only'

import Post from '@mi/data/models/post'

const getPost = async (id: number): Promise<Post> => {
  try {
    const res = await fetch(
      `${BASE_URL}/api/posts/${id}?populate=author,thumbnail,categories`,
      {
        next: {
          revalidate: 0
        }
      }
    )
    const { data } = (await res.json()) as PostResponse

    return {
      id: data.id,
      title: data.attributes.title,
      body: data.attributes.body,
      summary: data.attributes.summary,
      author: data.attributes.author ? {
        id: data?.attributes?.author?.data?.id,
        username: data?.attributes?.author?.data?.attributes?.username,
        email: data?.attributes?.author?.data?.attributes?.email,
      } : undefined,
      categories: data.attributes.categories.data.map((category) => ({
        id: category.id,
        name: category.attributes.name,
      })),
      thumbnail: data.attributes.thumbnail.data.attributes.url,
      createdAt: new Date(data.attributes.createdAt).getTime(),
      updatedAt: new Date(data.attributes.updatedAt).getTime(),
    }
  } catch (error: any) {
    console.log(`ERROR getPost ${error}`)
    throw new Error(error.error.message || 'Internal error')
  }
}

export default getPost

const BASE_URL = process.env.SERVER_BASE_URL

export type PostResponse = {
  data: {
    id: number
    attributes: {
      title: string
      body: string
      summary: string
      createdAt: string
      updatedAt: string
      publishedAt: string
      thumbnail: {
        data: {
          id: number
          attributes: {
            name: string
            alternativeText: string
            caption: any
            width: number
            height: number
            formats?: {
              thumbnail: {
                name: string
                hash: string
                ext: string
                mime: string
                path: any
                width: number
                height: number
                size: number
                url: string
              }
              large: {
                name: string
                hash: string
                ext: string
                mime: string
                path: any
                width: number
                height: number
                size: number
                url: string
              }
              medium: {
                name: string
                hash: string
                ext: string
                mime: string
                path: any
                width: number
                height: number
                size: number
                url: string
              }
              small: {
                name: string
                hash: string
                ext: string
                mime: string
                path: any
                width: number
                height: number
                size: number
                url: string
              }
            }
            hash: string
            ext: string
            mime: string
            size: number
            url: string
            previewUrl: any
            provider: string
            provider_metadata: any
            createdAt: string
            updatedAt: string
          }
        }
      }
      author?: {
        data: {
          id: number
          attributes: {
            username: string
            email: string
            provider: string
            confirmed: boolean
            blocked: boolean
            createdAt: string
            updatedAt: string
          }
        }
      }
      categories: {
        data: Array<{
          id: number
          attributes: {
            name: string
            createdAt: string
            updatedAt: string
            publishedAt: string
          }
        }>
      }
    }
  }
  meta: {}
}
