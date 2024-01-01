import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, of, tap } from 'rxjs';
import { API_URI } from 'src/app/app.constants';
import { ApiErrorResponse } from 'src/app/interface/http-error-response';
import { User } from 'src/app/interface/user.interfaces';
import { VehicleByUser } from 'src/app/interface/vehicle.interfaces';
import { VehicleService } from 'src/app/service/data/vehicle.service';
import { FormVehicleRequestBody } from 'src/app/vehicle/vehicle-form/vehicle-form.component';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit{

  loggedUser!: User
  vehiclesByUser!: VehicleByUser[];
  showVehiclesList!: boolean;
  currentSection!:string;
  vehicleForm!: FormVehicleRequestBody;
  savingData!: boolean;
  showPhotosForm!: boolean;
  photos!: any[];
  savedVehileId?: number;
  errorMap!: Map<string, string>;
  apiValidationError!: ApiErrorResponse;

  constructor(
    private vehicleService: VehicleService,
    private http: HttpClient,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadUserData();
    this.currentSection = 'actionsMenu';
  }

  // Handles Buttons Events
  onAllVehiclesClick() {
    this.loadUserVehiclesData(this.loggedUser.user_id);
  }

  onAddVehicleClick() {
    this.vehicleForm = new FormVehicleRequestBody('', '', new Date().getFullYear(), '', '', 0)
    this.currentSection = 'vehicleForm';
    this.savingData = false;
  }

  onReturnActionsSection() {
    this.currentSection = 'actionsMenu';
  }

  onMessagesClick() {
    this.currentSection = 'messages';
  }

  onSelectVehicleClick(vehicleId: number) {
    this.router.navigate(['vehicle-details/', vehicleId])
  }


  onCloseForm() {
    this.currentSection = 'actionsMenu';
    this.errorMap.clear();
  }

  // Handles Vehicle upload

  onVehicleSubmit() {
    this.savingData = true;
    this.vehicleService.postVehicle(this.vehicleForm).subscribe(
      response => {
        this.savedVehileId = response.id                
        this.savingData = false;
        this.photos = new Array(5);
        this.showPhotosForm = true;
        if(this.errorMap) {
          this.errorMap.clear();
        }
      },
      error => {
        this.apiValidationError = error;
        let fields = this.apiValidationError.error.fields.split(',');  
        let messages = this.apiValidationError.error.fields_message.split(',');
        this.createErrorMap(fields, messages); 
        this.savingData = false; 
      }
    )
  }

  private createErrorMap(fields: string[], messages: string[]) {
    this.errorMap = new Map<string, string>;
    for (let i = 0; i < fields.length; i++) {
      this.errorMap.set(fields[i], messages[i]);
    }
  }

  // Handles photos upload

  getPhotosRequestBody() {
    const formData = new FormData();
    for (let photo of this.photos) {
      if (photo) {
        formData.append('photos', photo);
      }
    }
    return formData;
  }

  onInputFileChange(event: any, arrayIndex: number) {
    if (event.target.files && event.target.files[0]) {
      this.photos[arrayIndex] = event.target.files[0];
    }
  }


  onPhotosSubmit() {
    this.vehicleService.postVehiclePhotos(this.savedVehileId, this.getPhotosRequestBody())
      .pipe(
        tap(response => {
          this.router.navigate(['vehicle-details/', this.savedVehileId]);
        }),
        catchError(error => {
          this.createErrorMap(['Bad Request'], [error.error.message]);
          return of(null);
        })
      )
      .subscribe();
  }
  

  // Retrives User and Vehicle data

  loadUserData() {
    this.http.get<User>(`${API_URI}/users`).subscribe(
      response => {
        this.loggedUser = response;        
        sessionStorage.setItem('loggedUserId', this.loggedUser.user_id.toString());
        console.log(this.loggedUser.authorities);
        
        sessionStorage.setItem('loggedUserRole', this.loggedUser.authorities.toString());
      },
      error => {
        console.log(error); 
      }
    );
  }

  loadUserVehiclesData(userId:number) {
    this.vehicleService.getVehiclesByUser(userId).subscribe(
      response => {
        this.vehiclesByUser = response;
        this.currentSection = 'vehiclesList';
      },
      error => {
        console.log(error);   
      }
    );
  }
}
