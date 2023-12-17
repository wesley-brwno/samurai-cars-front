import { Component, OnInit } from '@angular/core';
import { VehicleFormPostService } from '../service/data/vehicle-form-post.service';
import { VehiclePostDTO } from '../interface/vehicle.interfaces';
import { HttpClient } from '@angular/common/http';

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

  constructor(
    private vehiclePostService: VehicleFormPostService,
    private http: HttpClient
  ) { }
  ngOnInit(): void {
    this.togleForm = true;
    this.vehiclePostDTO = new VehiclePostDTOImpl("", "", new Date().getFullYear());

  }

  onSubmitVehicleForm() {
    this.vehiclePostService.postVehicle(this.vehiclePostDTO).subscribe(
      data => {
        this.vehicleId = data.id;
        this.togleForm = false;
      },
      error => {
        console.log(error);

      }
    )
  }

  onSubmitPhotosForm() {
    const formData = new FormData();
    for (let photo of this.photos) {
      formData.append('photos', photo);
    }

    this.vehiclePostService.postVehiclePhotos(this.vehicleId, formData).subscribe(
      response => {        
        console.log(JSON.stringify(response));
      },
      error => {
        console.log(error)
      }
    );
  }


  onInputFileChange(event: any, arrayIndex: number) {
    if (event.target.files && event.target.files[0]) {
      this.photos[arrayIndex] = event.target.files[arrayIndex];
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
