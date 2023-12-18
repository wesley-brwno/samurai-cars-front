import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { API_URI } from 'src/app/app.constants';
import { Vehicle } from 'src/app/interface/vehicle.interfaces';
import { AuthenticationService } from 'src/app/service/auth/authentication.service';
import { VehicleService } from 'src/app/service/data/vehicle.service';

@Component({
  selector: 'app-vehicle-details',
  templateUrl: './vehicle-details.component.html',
  styleUrls: ['./vehicle-details.component.css']
})
export class VehicleDetailsComponent implements OnInit {
  vehicleDetails!: VehicleDetails;
  userPublicDetails!: UserPublicDetails;
  loggedUserId!: string | null;
  loggedUserRole!: string | null;
  id!: number;

  constructor(
    private vehicleService: VehicleService,
    private route: ActivatedRoute,
    private http: HttpClient,
    private authService: AuthenticationService
  ) {}

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];    
    this.vehicleService.getVehicleById(this.id).subscribe(
      response => {
        this.vehicleDetails = response;
        this.laodUserPublicDetails(this.vehicleDetails.vehicle.user_id);                
      }
    );

    if(this.isUserLogged()) {
      this.loggedUserId = sessionStorage.getItem('loggedUserId');
      this.loggedUserRole = sessionStorage.getItem('loggedUserRole');
    }
  }

  onDeleteClick(vehicleId: number) {
    let confirm = window.confirm("Are you sure?")

    if(confirm) {
      this.vehicleService.deleteVehicleById(vehicleId).subscribe(
        reponse => {
          console.log("Delete succeeded");
          
          console.log(reponse);    
        },
        error => {
          console.log("Fail to delete");
          console.log(error);
          
        }
      )
    }
  }


  laodUserPublicDetails(userId: number) {
    this.http.get<UserPublicDetails>(`${API_URI}/users/${userId}`).subscribe(
      response => {
        this.userPublicDetails = response;        
      }
    )
  }

  isUserLogged() {
    return this.authService.isUserLogged();
  }

  isLoggedUserAdmin() {
    if(this.isUserLogged()) {
      return this.loggedUserRole === '[ADMIN]';
    }
    return false;
  }
  
  isLoggedUserOwnerOfResource() {
    if(this.isUserLogged()) {
      return parseInt(this.loggedUserId ?? '') === this.vehicleDetails.vehicle.user_id;
    }
    return false;
  }

}

export class VehicleDetails {
  constructor(
    public vehicle: Vehicle,
    public images: Images
  ) { }
}

interface Images {
  photos: string[];
}

export class UserPublicDetails {
  constructor(
    public id: number,
    public name: string,
    public created_at: Date
  ) {}
}