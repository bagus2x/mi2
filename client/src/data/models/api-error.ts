export default interface ApiError {
  status: number
  name: string
  message: string
}

export const isApiError = (obj: any): obj is ApiError => {
  return !!obj.name && !!obj.name && !!obj.message
}
