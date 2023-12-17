export interface VehiclePostDTO {
    id?: number
    name: string,
    model: string,
    year: number
}

export interface VehicleByUser {
    user_id: number;
    name: string;
    vehicles: Vehicle[];
}

export interface Vehicle {
    created_at: string;
    user_id: number;
    id: number;
    name: string;
    model: string;
    year: number;
}
