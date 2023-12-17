import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { API_URI } from 'src/app/app.constants';
import { VehicleByUser } from 'src/app/interface/vehicle.interfaces';

@Injectable({
  providedIn: 'root'
})
export class VehicleService {

  constructor(
    public http: HttpClient
  ) { }


  getVehiclesByUser(user_id: number) {
    return this.http.get<VehicleByUser>(`${API_URI}/vehicles?user_id=${user_id}`);
  }
}
