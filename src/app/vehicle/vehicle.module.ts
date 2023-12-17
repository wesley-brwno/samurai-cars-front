import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VehicleFormComponent } from './vehicle-form/vehicle-form.component';
import { FormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    VehicleFormComponent
  ],
  imports: [
    CommonModule,
    FormsModule
  ]
})
export class VehicleModule { }


export class VehiclePostRequestBody {
  constructor(
    public name: string,
    public model: string,
    public year: number
  ) {}
}