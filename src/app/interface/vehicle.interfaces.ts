export interface VehicleRequestBody {
    id?: number
    name: string,
    model: string,
    year: number,
    vehicle_type: string,
    brand: string,
    price: number
}

export interface VehicleByUser {
    // user_id: number;
    // name: string;
    vehicle: Vehicle;
    images: Images;
}

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
