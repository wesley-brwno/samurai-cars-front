export interface Vehicle {
    created_at: Date;
    user_id: number;
    id: number;
    name: string;
    model: string;
    year: number;
    vehicle_type: string,
    brand: string,
    price: number
}

export interface Images {
    photos: string[];
}

export interface Content {
    vehicle: Vehicle;
    images: Images;
}

export interface Sort {
    empty: boolean;
    sorted: boolean;
    unsorted: boolean;
}

export interface Pageable {
    pageNumber: number;
    pageSize: number;
    sort: Sort;
    offset: number;
    paged: boolean;
    unpaged: boolean;
}

export interface VehiclePage {
    content: Content[];
    pageable: Pageable;
    totalPages: number;
    totalElements: number;
    last: boolean;
    size: number;
    number: number;
    sort: Sort;
    first: boolean;
    numberOfElements: number;
    empty: boolean;
}

