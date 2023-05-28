import Post from '@mi/data/models/post'

export default interface Headline {
  id: number
  title?: string
  image: string
  post?: Post
  link?: string
}
