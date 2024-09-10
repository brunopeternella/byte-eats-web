export class PagedQueryResponse<T> {
    totalCount!: number
    pageNumber!: number
    pageSize!: number
    totalPages!: number
    hasNext!: boolean
    items!: T[]
}