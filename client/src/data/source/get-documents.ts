import Document from '@mi/data/models/document'
import { Paging } from '@mi/data/models/paging'

const getDocument = async (
  page: number,
  pageSize: number,
): Promise<Paging<Document>> => {
  try {
    const res = await fetch(
      `${BASE_URL}/api/documents?pagination[page]=${page}&pagination[pageSize]=${pageSize}&populate=file`,
      {
        next: {
          revalidate: 0
        }
      }
    )
    const { data, meta } = (await res.json()) as GetDocumentResponse

    return {
      data: data.map((document) => ({
        id: document.id,
        file: document.attributes.file.data.attributes.url.startsWith('/')
          ? `${BASE_URL}${document.attributes.file.data.attributes.url}`
          : document.attributes.file.data.attributes.url,
        name: document.attributes.name,
        createdAt: (new Date(document.attributes.createdAt)).getTime()
      })),
      pagination: meta.pagination,
    }
  } catch (error: any) {
    throw new Error(error.error.message || 'Internal error')
  }
}

export default getDocument

const BASE_URL = process.env.SERVER_BASE_URL

export type GetDocumentResponse = {
  data: Array<{
    id: number
    attributes: {
      name: string
      file: {
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
      },
      createdAt: string
    },
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
