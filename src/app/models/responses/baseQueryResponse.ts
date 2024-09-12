export class BaseQueryResponse<T> {
    totalCount!: number
    page!: number
    pageSize!: number
    totalPages!: number
    hasNext!: boolean
    items: T[] = []
  }