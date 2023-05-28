import Program from '@mi/data/models/program'

const getFlagshipProgram = async (): Promise<Program | null> => {
  const res = await fetch(`${BASE_URL}/api/flagship-program`, {
    next: { revalidate: 0 },
  })
  const program = (await res.json()) as GetFlagshipProgramResponse

  if (!program.data) {
    return null
  }

  return {
    description: program.data.attributes.description,
  }
}

export default getFlagshipProgram

const BASE_URL = process.env.SERVER_BASE_URL

export type GetFlagshipProgramResponse = {
  data?: {
    id: number
    attributes: {
      description: string
    }
  }
  meta: {}
}
