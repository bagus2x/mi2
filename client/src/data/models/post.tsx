import Category from '@mi/data/models/category'
import User from '@mi/data/models/user'

export default interface Post {
  id: number
  title: string
  body: string
  summary: string;
  thumbnail: string
  author?: User
  categories: Category[]
  createdAt: number
  updatedAt: number
}
