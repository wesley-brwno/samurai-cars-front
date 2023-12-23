import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
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
  showVehiclesByUserSection!: boolean;
  showEditForm!: boolean;

  constructor(
    private vehicleService: VehicleService,
    private route: ActivatedRoute,
    private http: HttpClient,
    private authService: AuthenticationService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadVehicleByIdData(this.route.snapshot.params['id']);

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
          this.showVehiclesByUserSection = true;
        },
        error => {
          console.log("Fail to delete");
          console.log(error);
          
        }
      )
    }
  }

  onHomeClick() {
    this.router.navigate(['home']);
  }

  onEditClick() {
    this.showEditForm = true;
  }

  onMoreBySellerClick() {
    this.showVehiclesByUserSection = true;
  }

  onVehicleIdChange(vehicleId: any) {    
    this.loadVehicleByIdData(vehicleId);
    this.showVehiclesByUserSection = false;
  }

  onCloseForm(event: any) {
    this.showEditForm = event;
  }


  loadVehicleByIdData(id: number) {    
    this.vehicleService.getVehicleById(id).subscribe(
      response => {
        this.vehicleDetails = response;
        this.laodUserPublicDetails(this.vehicleDetails.vehicle.user_id);                
      }
    );
  }

  laodUserPublicDetails(userId: number) {
    this.http.get<UserPublicDetails>(`${API_URI}/users/${userId}`).subscribe(
      response => {
        this.userPublicDetails = response;        
      }
    );
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