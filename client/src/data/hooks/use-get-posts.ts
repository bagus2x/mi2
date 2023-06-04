import { Paging } from '@mi/data/models/paging'
import Post from '@mi/data/models/post'
import getPosts from '@mi/data/source/get-posts'
import { useInfiniteQuery } from '@tanstack/react-query'
import { ApiError } from 'next/dist/server/api-utils'

const useGetUsers = (initialData?: Paging<Post>) => {
  return useInfiniteQuery<Paging<Post>, ApiError>({
    queryKey: ['posts'],
    queryFn: ({ pageParam = initialData?.pagination.page || 1 }) => {
      return getPosts(
        pageParam,
        initialData?.pagination.pageSize || 5,
        '&sort[0]=id:desc',
      )
    },
    getNextPageParam: (lastPage) =>
      lastPage.pagination.page !== lastPage.pagination.pageCount
        ? lastPage.pagination.page + 1
        : undefined,
    initialData: () => {
      if (initialData) {
        return {
          pages: [initialData],
          pageParams: [initialData.pagination.page],
        }
      }
    },
  })
}

export default useGetUsers
