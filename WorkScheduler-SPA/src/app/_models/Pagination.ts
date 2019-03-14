export interface Pagination {
    totalItems: number;
}

export class PaginatedResult<T> {
    result: T;
    pagination: Pagination;
}
