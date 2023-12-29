import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home/home.component';
import { VehicleModule } from '../vehicle/vehicle.module';



@NgModule({
  declarations: [
    HomeComponent
  ],
  imports: [
    CommonModule,
    VehicleModule
  ]
})
export class publicPagesModule { }
