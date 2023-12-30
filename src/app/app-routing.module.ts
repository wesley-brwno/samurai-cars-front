import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { HomeComponent } from './publicPages/home/home.component';
import { VehicleFormComponent } from './vehicle/vehicle-form/vehicle-form.component';
import { VehicleDetailsComponent } from './vehicle/vehicle-details/vehicle-details.component';
import { ProfileComponent } from './user/profile/profile.component';
import { LandingComponent } from './publicPages/landing/landing.component';

const routes: Routes = [
  {path: '', component: LandingComponent},
  {path: 'login', component: LoginComponent},
  {path: 'account', component: ProfileComponent},
  {path: 'home', component: HomeComponent},
  {path: 'new-vehicle', component: VehicleFormComponent},
  {path: 'vehicle-details/:id', component: VehicleDetailsComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
