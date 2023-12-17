import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { ResouceManageComponent } from './admin/resouce-manage/resouce-manage.component';
import { HomeComponent } from './catalogo/home/home.component';
import { VehicleFormComponent } from './vehicle-form/vehicle-form.component';

const routes: Routes = [
  {path: 'login', component: LoginComponent},
  {path: 'resource-management', component: ResouceManageComponent},
  {path: 'home', component: HomeComponent},
  {path: 'new-vehicle', component: VehicleFormComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
