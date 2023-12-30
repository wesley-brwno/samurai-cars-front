import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home/home.component';
import { VehicleModule } from '../vehicle/vehicle.module';
import { LandingComponent } from './landing/landing.component';



@NgModule({
  declarations: [
    HomeComponent,
    LandingComponent
  ],
  imports: [
    CommonModule,
    VehicleModule
  ]
})
export class publicPagesModule { }
