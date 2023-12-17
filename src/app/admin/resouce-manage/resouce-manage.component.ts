import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { API_URI } from 'src/app/app.constants';
import { User } from 'src/app/interface/user.interfaces';
import { Vehicle } from 'src/app/interface/vehicle.interfaces';
import { VehicleService } from 'src/app/service/data/vehicle.service';

@Component({
  selector: 'app-resouce-manage',
  templateUrl: './resouce-manage.component.html',
  styleUrls: ['./resouce-manage.component.css']
})
export class ResouceManageComponent implements OnInit{

  loggedUser!: User;
  vehiclesByUser!: VehicleByUserImpl

  constructor(
    private router: Router,
    private http: HttpClient,
    private vehicleService: VehicleService
  ) {}

  ngOnInit(): void {
    this.loggedUser = new UserImpl(0, '', []);
    this.vehiclesByUser = new VehicleByUserImpl(0, '', []);
    this.loadUserData();
  }

  onAddVehicleClick() {
    this.router.navigate(['new-vehicle']);
  }

  onSeeMoreClick(cardId: number) {
    this.router.navigate([`vehicle-details/${cardId}`])
  }

  loadUserData() {
    this.http.get<User>(`${API_URI}/users`).subscribe(
      response => {
        this.loggedUser = response;        
        this.loadUserVehiclesData(this.loggedUser.user_id);
      },
      error => {
        console.log(error);
        
      }
    )
  }

  loadUserVehiclesData(user_id: number) {
    this.vehicleService.getVehiclesByUser(user_id).subscribe(
      response => {
        this.vehiclesByUser = response;
      }
    )
  }
}

export class UserImpl implements User {
  user_id: number;
  name: string;
  authorities: string[];

  constructor(id: number, name: string, authorities: string[]) {
    this.user_id = id;
    this.name = name;
    this.authorities = authorities;
  }
}

export class VehicleByUserImpl implements VehicleByUserImpl {
  user_id: number;
  name: string;
  vehicles: Vehicle[];

  constructor(user_id: number, name: string, vehicles: Vehicle[]) {
    this.user_id = user_id;
    this.name = name;
    this.vehicles = vehicles;
  }
}
