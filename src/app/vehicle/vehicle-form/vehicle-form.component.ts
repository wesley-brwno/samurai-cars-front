import { HttpClient } from '@angular/common/http';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { VehicleRequestBody } from 'src/app/interface/vehicle.interfaces';
import { VehicleFormService } from 'src/app/service/data/vehicle-form-post.service';
import { VehicleDetails } from '../vehicle-details/vehicle-details.component';
import { Router } from '@angular/router';
import { ApiErrorResponse } from 'src/app/interface/http-error-response';

@Component({
  selector: 'app-vehicle-form',
  templateUrl: './vehicle-form.component.html',
  styleUrls: ['./vehicle-form.component.css']
})
export class VehicleFormComponent implements OnInit {

  vehicle!: VehicleRequestBody
  vehicleId!: number | undefined;
  isLoadingContent!: boolean;
  @Input() editVehicle!: VehicleDetails;
  @Output() isFormVisible = new EventEmitter;
  showPhotos: boolean = false;
  isVehicleEdited: boolean = false;
  errorMap!: Map<string, string>;
  validationErrorResponse!: ApiErrorResponse;
  
  constructor(
    private vehicleService: VehicleFormService,
    private http: HttpClient,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.isLoadingContent = false;
    if (this.editVehicle) {
      this.vehicle = new FormVehicleRequestBody(this.editVehicle.vehicle.name, this.editVehicle.vehicle.model, this.editVehicle.vehicle.year);
      this.showPhotos = true;
    } else {
      this.vehicle = new FormVehicleRequestBody("", "", new Date().getFullYear());
    }
  }

  onSubmitVehicleForm() {
    this.vehicle.id = this.editVehicle.vehicle.id;
    this.executeVehiclePutRequest();
  }

  // Handles update of a Vehicle
  executeVehiclePutRequest() {    
    this.vehicleService.putVehicle(this.vehicle).subscribe(
      data => {
        window.location.reload();
        this.closeForm();
      },
      error => {
        console.log(error);
        this.validationErrorResponse = error;
        let fileds = this.validationErrorResponse.error.fields.split(',');
        let message = this.validationErrorResponse.error.fields_message.split(',');
        this.createErrorMap(fileds, message);
      }
    )
  }

  vehicleDataChange() {
    this.isVehicleEdited = true;
  }

  // Handles update of photos
  executePhotoPutRequest(formData: FormData, photoUrl: string) {
    this.http.put<any>(photoUrl, formData).subscribe(
      response => {
        this.reloadPhotos();
        this.isVehicleEdited = true;
      },
    )
  }

  onUpdatePhotoChange(event: any, photoUrl: string) {
    if (event.target.files && event.target.files[0]) {
      let photo = event.target.files[0];
      const formData = new FormData();
      formData.append('photo', photo);
      this.executePhotoPutRequest(formData, photoUrl);
    }
  }

  reloadPhotos() {
    this.showPhotos = false;
    setTimeout(() => this.showPhotos = true);
  }

  closeForm() {    
    this.isFormVisible.emit(false);
    if(this.isVehicleEdited) {
      this.router.navigate(['vehicle-details/', this.vehicle.id]);
    }
  }

  private createErrorMap(fields: string[], messages: string[]) {
    this.errorMap = new Map<string, string>;
    for (let i = 0; i < fields.length; i++) {
      this.errorMap.set(fields[i], messages[i]);
    }
  }
}

export class FormVehicleRequestBody implements VehicleRequestBody {
  public name: string;
  public model: string;
  public year: number;

  constructor(name: string, model: string, year: number) {
    this.name = name;
    this.model = model;
    this.year = year;
  }
}



