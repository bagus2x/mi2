import { CodeOfConduct } from "@mi/data/models/code-of-conduct"
import { SERVER_BASE_URL } from "@mi/utils/constants"
import { ApiError } from "next/dist/server/api-utils"

const getCodeOfConduct = async (): Promise<CodeOfConduct | null> => {
  const res = await fetch(`${SERVER_BASE_URL}/api/code-of-conduct`)

  if (!res.ok) {
    if (res.status === 404) {
      return null
    }

    const errorRes = await res.json() as { error: ApiError }
    throw errorRes.error
  }

  const codeOfConduct = await res.json() as GetCodeOfConductRespon

  return {
    body: codeOfConduct.data.attributes.description,
    image: codeOfConduct.data.attributes.image ? {
      id: codeOfConduct.data.attributes.image.data.id,
      mime: codeOfConduct.data.attributes.image.data.attributes.mime,
      alternativeText: codeOfConduct.data.attributes.image.data.attributes.alternativeText,
      caption: codeOfConduct.data.attributes.image.data.attributes.caption,
      url: codeOfConduct.data.attributes.image.data.attributes.url
    } : undefined
  }
}

export default getCodeOfConduct

export type GetCodeOfConductRespon = {
  data: {
    id: number
    attributes: {
      description: string
      createdAt: string
      updatedAt: string
      publishedAt: string
      image: {
        data: {
          id: number
          attributes: {
            name: string
            alternativeText: any
            caption: any
            width: number
            height: number
            formats: {
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
  }
  meta: {}
}
