export interface MessagePageable {
    content: Content[];
    pageable: Pageable;
    totalPages: number;
    totalElements: number;
    last: boolean;
    first: boolean;
    size: number;
    number: number;
}

export interface Content {
    id: number
    message: string,
    name: string,
    lastname: string,
    email: string,
    phone: string,
    created_at: Date,
    vehicle_id: number,
    is_read: boolean
}

interface Sort {
    sorted: boolean;
    unsorted: boolean;
    empty: boolean;
}

interface Pageable {
    pageNumber: number;
    pageSize: number;
    sort: Sort;
    offset: number;
    paged: boolean;
    unpaged: boolean;
}