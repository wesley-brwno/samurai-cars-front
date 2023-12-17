import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { API_URI } from 'src/app/app.constants';
import { VehiclePostDTO } from 'src/app/interface/vehicle.interfaces';
import { AuthenticationService } from '../auth/authentication.service';

@Injectable({
  providedIn: 'root'
})
export class VehicleFormPostService {


  constructor(
    public http: HttpClient,
    private authenticationService: AuthenticationService
  ) { }

  postVehicle(vehiclePostDTO: VehiclePostDTO) {
    let authorization = this.authenticationService.getAuthorizationTokenJWT();
    let headers;
    
    if(authorization) {
      headers = new HttpHeaders({
        Authorization: authorization
      });
    }
    return this.http.post<VehiclePostDTO>(`${API_URI}/vehicles/add`,
     vehiclePostDTO);
  }

  postVehiclePhotos(vehicleId: number | undefined, formData: FormData) {
    return this.http.post<any>(`${API_URI}/photos?vehicleId=${vehicleId}`,
    formData);
  }
}
