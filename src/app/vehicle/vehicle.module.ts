import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';



@NgModule({
  declarations: [],
  imports: [
    CommonModule
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