import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SharedModule } from './shared/shared.module';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { AuthModule } from './auth/auth.module';
import { VehicleModule } from './vehicle/vehicle.module';
import { AuthIntercepterService } from './service/http/auth-intercepter.service';
import { UserModule } from './user/user.module';
import { publicPagesModule } from './publicPages/catalogo.module';


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    SharedModule,
    HttpClientModule,
    FormsModule,
    AuthModule,
    publicPagesModule,
    VehicleModule,
    UserModule
  ],
  providers: [
    {provide: HTTP_INTERCEPTORS, useClass: AuthIntercepterService, multi:true} 
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
