import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { API_URI } from 'src/app/app.constants';
import { VehiclePage } from '../../interface/vehicle-pabeable.intefaces';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class VehiclePageableService {

  constructor(
    private http: HttpClient,
    private router: Router
  ) { }

  getVehiclesPageable(pageable: string) {
    return this.http.get<VehiclePage>(`${API_URI}/vehicles/all${pageable}`);
  }
}
