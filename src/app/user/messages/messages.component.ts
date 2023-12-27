import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { API_URI } from 'src/app/app.constants';
import { Content, MessagePageable } from 'src/app/interface/message-pageable';
import { VehicleService } from 'src/app/service/data/vehicle.service';
import { VehicleDetails } from 'src/app/vehicle/vehicle-details/vehicle-details.component';

@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.css']
})
export class MessagesComponent implements OnInit {

  messagePegeable!: MessagePageable;
  contactMessage!: ContactMessage;
  vehicelDetails!: VehicleDetails;

  constructor(
    private http: HttpClient,
    private vehicleService: VehicleService
  ) { }

  ngOnInit(): void {
    this.loadUserMessages();
  }

  loadUserMessages() {
    this.http.get<MessagePageable>(`${API_URI}/messages`).subscribe(
      response => {
        this.messagePegeable = response;
      },
      error => {
        console.log(error);
      }
    )
  }

  onDeleteClick(messageId: number) {
    this.http.delete(`${API_URI}/messages/${messageId}`).subscribe(
      response => {
        window.alert("Message Deleted!");
        this.loadUserMessages();
      },
      error => {
        window.alert("Fail to delete Message");
      }
    )
  }

  onReadClick(message: Content) {
    this.http.get<ContactMessage>(`${API_URI}/messages/${message.id}`).subscribe(
      response => {
        this.contactMessage = response;
        this.vehicleService.getVehicleById(response.vehicle_id).subscribe(
          response => {
            this.vehicelDetails = response;            
          },
          error => {
            console.log(error);            
          }
        )
        message.is_read = true;        
      },
      error => {
        console.log(error);
      }
    )
  }
}

export class ContactMessage {
  name: string;
  lastName: string;
  phone: string;
  email: string;
  message: string;
  id: number;
  vehicle_id: number;
  created_at: Date;
  is_read: boolean;

  constructor(
    name: string, lastName: string, phone: string, email: string, message: string, id: number, vehicleId: number, createdAt: Date, isRead: boolean
  ) {
    this.name = name;
    this.lastName = lastName;
    this.phone = phone;
    this.email = email;
    this.message = message;
    this.id = id;
    this.vehicle_id = vehicleId;
    this.created_at = createdAt;
    this.is_read = isRead;
  }
}

