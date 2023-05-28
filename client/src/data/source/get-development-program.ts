import Program from "@mi/data/models/program";

const getDevelopmentProgram = async (): Promise<Program | null> => {
  const res = await fetch(`${BASE_URL}/api/development-program`, { next: { revalidate: 0 } })
  const program = await res.json() as GetFlagshipProgramResponse

  if (!program.data) {
    return null
  }

  return {
    description: program.data.attributes.description
  }
}

export default getDevelopmentProgram

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
