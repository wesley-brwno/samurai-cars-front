import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProfileComponent } from './profile/profile.component';
import { FormsModule } from '@angular/forms';
import { MessagesComponent } from './messages/messages.component';



@NgModule({
  declarations: [
    ProfileComponent,
    MessagesComponent
  ],
  imports: [
    CommonModule,
    FormsModule
  ]
})
export class UserModule { }
