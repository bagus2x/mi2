'server only'

import { Paging } from '@mi/data/models/paging'
import Post from '@mi/data/models/post'

const getPosts = async (
  page: number,
  pageSize: number,
  filters: string = ''
): Promise<Paging<Post>> => {
  try {
    const res = await fetch(
      `${BASE_URL}/api/posts?pagination[page]=${page}&pagination[pageSize]=${pageSize}&populate=author,thumbnail,categories${filters}`,
      {
        next: {
          revalidate: 0,
        },
      },
    )
    const { data, meta } = (await res.json()) as GetPostsResponse

    console.log(`HASIL ${data.map(v=> v.id)}`)

    return {
      data: data.map((post) => ({
        id: post.id,
        title: post.attributes.title,
        body: post.attributes.body,
        summary: post.attributes.summary,
        author: post.attributes.author ? {
          id: post.attributes.author?.data.id,
          username: post.attributes.author?.data.attributes.username,
          email: post.attributes.author?.data.attributes.email,
        }: undefined,
        categories: post.attributes.categories.data.map((category) => ({
          id: category.id,
          name: category.attributes.name,
        })),
        thumbnail: `${BASE_URL}${post.attributes.thumbnail.data.attributes.url}`,
        createdAt: new Date(post.attributes.createdAt).getTime(),
        updatedAt: new Date(post.attributes.updatedAt).getTime(),
      })),
      pagination: meta.pagination,
    }
  } catch (error: any) {
    console.error(`ERROR getPosts ${error}`)
    throw new Error(error?.error?.message || 'Internal error')
  }
}

export default getPosts

const BASE_URL = process.env.SERVER_BASE_URL

export type GetPostsResponse = {
  data: Array<{
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
            alternativeText: any
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
  }>
  meta: {
    pagination: {
      page: number
      pageSize: number
      pageCount: number
      total: number
    }
  }
}
