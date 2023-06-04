import Headline from '@mi/data/models/headline'
import { Paging } from '@mi/data/models/paging'

const getHeadlines = async (
  page: number,
  pageSize: number,
): Promise<Paging<Headline>> => {
  try {
    const res = await fetch(
      `${BASE_URL}/api/headlines?pagination[page]=${page}&pagination[pageSize]=${pageSize}&populate=image,post`,
      {
        next: {
          revalidate: 0,
        },
      },
    )
    const { data, meta } = (await res.json()) as GetHeadlinesResponse

    return {
      data: data.map((headline) => ({
        id: headline.id,
        image: headline.attributes.image.data.attributes.url.startsWith('/')
          ? `${BASE_URL}${headline.attributes.image.data.attributes.url}`
          : headline.attributes.image.data.attributes.url,
        title: headline.attributes.title,
        link: headline.attributes.link,
      })),
      pagination: meta.pagination,
    }
  } catch (error: any) {
    throw new Error(error?.error?.message || 'Internal error')
  }
}

export default getHeadlines

const BASE_URL = process.env.SERVER_BASE_URL

export type GetHeadlinesResponse = {
  data: Array<{
    id: number
    attributes: {
      title: string
      link: string
      createdAt: string
      updatedAt: string
      publishedAt: string
      post: {
        data: {
          id: number
          attributes: {
            title: string
            body: string
            summary: string
            createdAt: string
            updatedAt: string
            publishedAt: string
          }
        }
      }
      image: {
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
