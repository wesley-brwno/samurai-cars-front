import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { API_URI } from 'src/app/app.constants';
import { VehicleRequestBody } from 'src/app/interface/vehicle.interfaces';
import { AuthenticationService } from '../auth/authentication.service';

@Injectable({
  providedIn: 'root'
})
export class VehicleFormService {

  constructor(
    public http: HttpClient,
    private authenticationService: AuthenticationService
  ) { }


  putVehicle(vehiclePutDTO: VehicleRequestBody) {
    return this.http.put<VehicleRequestBody>(`${API_URI}/vehicles`, vehiclePutDTO);
  }

  postVehiclePhotos(vehicleId: number | undefined, formData: FormData) {
   return this.http.post<any>(`${API_URI}/photos?vehicleId=${vehicleId}`,
    formData);
  } 
}
