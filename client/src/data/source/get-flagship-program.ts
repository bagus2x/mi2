import Program from '@mi/data/models/program'

const getFlagshipProgram = async (): Promise<Program | null> => {
  const res = await fetch(`${BASE_URL}/api/flagship-program?populate=images`, {
    next: { revalidate: 0 },
  })
  const program = (await res.json()) as GetFlagshipProgramResponse

  if (!program.data) {
    return null
  }

  return {
    description: program.data.attributes.description,
    images: program.data.attributes.images.data.map((image) => ({
      id: image.id,
      url: image.attributes.url.startsWith('/')
        ? `${BASE_URL}${image.attributes.url}`
        : image.attributes.url,
      alternativeText: image.attributes.alternativeText,
      caption: image.attributes.caption,
      mime: image.attributes.mime,
    })),
  }
}

export default getFlagshipProgram

const BASE_URL = process.env.SERVER_BASE_URL

export type GetFlagshipProgramResponse = {
  data: {
    id: number
    attributes: {
      description: string
      createdAt: string
      updatedAt: string
      publishedAt: string
      images: {
        data: Array<{
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
        }>
      }
    }
  }
  meta: {}
}
