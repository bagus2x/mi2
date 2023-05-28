import Schedule from '@mi/data/models/schedule'

const getSchedule = async (): Promise<Schedule> => {
  try {
    const res = await fetch(`${BASE_URL}/api/schedule?populate=*`)
    const schedule = (await res.json()) as GetScheduleResponse
    return {
      title: schedule.data.attributes.title,
      description: schedule.data.attributes.description,
      image: schedule.data.attributes.image.data.attributes.url.startsWith('/') ? `${process.env.SERVER_BASE_URL}${schedule.data.attributes.image.data.attributes.url}`: schedule.data.attributes.image.data.attributes.url,
      createdAt: new Date(schedule.data.attributes.createdAt).getTime(),
    }
  } catch (error) {
    console.error(`ERROR getPosts ${error}`)
    throw error
  }
}

export default getSchedule

export type GetScheduleResponse = {
  data: {
    id: number
    attributes: {
      title: string
      description?: string
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

const BASE_URL = process.env.SERVER_BASE_URL
