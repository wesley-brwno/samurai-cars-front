

import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { VehiclePostDTO } from 'src/app/interface/vehicle.interfaces';
import { VehicleFormPostService } from 'src/app/service/data/vehicle-form-post.service';

@Component({
  selector: 'app-vehicle-form',
  templateUrl: './vehicle-form.component.html',
  styleUrls: ['./vehicle-form.component.css']
})
export class VehicleFormComponent implements OnInit {

  vehiclePostDTO!: VehiclePostDTO
  togleForm!: boolean;
  photos: any[] = new Array(5);
  vehicleId!: number | undefined;
  isLoadingContent!: boolean;

  constructor(
    private vehiclePostService: VehicleFormPostService,
  ) { }

  ngOnInit(): void {
    this.togleForm = true;
    this.isLoadingContent = false;
    this.vehiclePostDTO = new VehiclePostDTOImpl("", "", new Date().getFullYear());
  }

  onSubmitVehicleForm() {
    this.vehiclePostService.postVehicle(this.vehiclePostDTO).subscribe(
      data => {
        this.vehicleId = data.id;
        this.togleForm = false;
        this.isLoadingContent = false;
      },
      error => {
        console.log(error);
        this.isLoadingContent = false;
      }
    )
    this.isLoadingContent = true;
  }

  onFormPhotosSubmit() {
    const formData = new FormData();
    for (let photo of this.photos) {
      if (photo) {
        formData.append('photos', photo);
      }
    }
    this.onSubmitVehiclePhoto(formData);
  }

  onSubmitVehiclePhoto(formData:FormData) {
    this.vehiclePostService.postVehiclePhotos(this.vehicleId, formData).subscribe(
      response => {    
        this.isLoadingContent = false;                  
      },
      error => {
        console.log(error)
        this.isLoadingContent = false;                  
      }
    );
    this.isLoadingContent = true;
  }

  onInputFileChange(event: any, arrayIndex: number) {
    if (event.target.files && event.target.files[0]) {
      this.photos[arrayIndex] = event.target.files[0];
    }
  }
}

export class VehiclePostDTOImpl implements VehiclePostDTO {
  public name: string;
  public model: string;
  public year: number;

  constructor(name: string, model: string, year: number) {
    this.name = name;
    this.model = model;
    this.year = year;
  }
}

