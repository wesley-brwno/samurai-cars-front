import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { API_URI } from 'src/app/app.constants';
import { MessagePageable } from 'src/app/interface/message-pageable';

@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.css']
})
export class MessagesComponent implements OnInit{

  messagePegeable!: MessagePageable;

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    let loggedUserId = sessionStorage.getItem('loggedUserId');
    this.loadUserMessage(Number(loggedUserId));
  }



  loadUserMessage(loggedUserId:number) {
    this.http.get<MessagePageable>(`${API_URI}/messages?user_id=${loggedUserId}`).subscribe(
      response => {
        this.messagePegeable = response;
        console.log(this.messagePegeable);
        
      },
      error => {
        console.log(error);
        
      }
    )
  }
}
