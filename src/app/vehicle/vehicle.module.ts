import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VehicleFormComponent } from './vehicle-form/vehicle-form.component';
import { FormsModule } from '@angular/forms';
import { VehicleDetailsComponent } from './vehicle-details/vehicle-details.component';
import { VehiclesByUserComponent } from './vehicles-by-user/vehicles-by-user.component';
import { ContactFormComponent } from './contact-form/contact-form.component';


@NgModule({
  declarations: [
    VehicleFormComponent,
    VehicleDetailsComponent,
    VehiclesByUserComponent,
    ContactFormComponent
  ],
  exports: [
    ContactFormComponent
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