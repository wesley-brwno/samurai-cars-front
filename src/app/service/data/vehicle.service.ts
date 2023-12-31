import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { API_URI } from 'src/app/app.constants';
import { VehicleByUser, VehicleRequestBody } from 'src/app/interface/vehicle.interfaces';
import { VehicleDetails } from 'src/app/vehicle/vehicle-details/vehicle-details.component';

@Injectable({
  providedIn: 'root'
})
export class VehicleService {

  constructor(
    public http: HttpClient
  ) { }

  deleteVehicleById(vehicleId: number) {
    return this.http.delete<any>(`${API_URI}/vehicles?vehicle_id=${vehicleId}`);
  }

  getVehiclesByUser(user_id: number) {
    return this.http.get<VehicleByUser[]>(`${API_URI}/vehicles?user_id=${user_id}`);
  }

  getVehicleById(vehicle_id: number) {
    return this.http.get<VehicleDetails>(`${API_URI}/vehicles/${vehicle_id}`);
  }

  postVehicle(vehiclePostDTO: VehicleRequestBody) {
    return this.http.post<VehicleRequestBody>(`${API_URI}/vehicles/add`,
     vehiclePostDTO);
  }

  postVehiclePhotos(vehicleId: number | undefined, formData: FormData) {
    return this.http.post<any>(`${API_URI}/photos?vehicleId=${vehicleId}`, formData);
  } 
}
