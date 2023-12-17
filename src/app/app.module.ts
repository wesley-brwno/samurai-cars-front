import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SharedModule } from './shared/shared.module';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { AuthModule } from './auth/auth.module';
import { AdminModule } from './admin/admin.module';
import { CatalogoModule } from './catalogo/catalogo.module';
import { VehicleFormComponent } from './vehicle-form/vehicle-form.component';
import { VehicleModule } from './vehicle/vehicle.module';
import { AuthIntercepterService } from './service/http/auth-intercepter.service';


@NgModule({
  declarations: [
    AppComponent,
    VehicleFormComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    SharedModule,
    HttpClientModule,
    FormsModule,
    AuthModule,
    AdminModule,
    CatalogoModule,
    VehicleModule
  ],
  providers: [
    {provide: HTTP_INTERCEPTORS, useClass: AuthIntercepterService, multi:true} // to solve CORS problem
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
