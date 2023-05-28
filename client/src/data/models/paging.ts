import Pagination from '@mi/data/models/pagination'

export interface Paging<T> {
  data: T[]
  pagination: Pagination
}
