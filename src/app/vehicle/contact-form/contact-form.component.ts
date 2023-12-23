import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Images, Vehicle } from 'src/app/interface/vehicle-pabeable.intefaces';
import { UserPublicDetails } from '../vehicle-details/vehicle-details.component';
import { API_URI } from 'src/app/app.constants';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-contact-form',
  templateUrl: './contact-form.component.html',
  styleUrls: ['./contact-form.component.css']
})

export class ContactFormComponent implements OnInit{
  @Input() selectedVehicle!: Vehicle;
  @Input() vehiclePhotos!: Images;
  @Output() closeForm = new EventEmitter();
  userPublicDetails!: UserPublicDetails;

  constructor(
    private http: HttpClient,
  ) {

  }
  ngOnInit(): void {
    this.laodUserPublicDetails(this.selectedVehicle.user_id);
  }

  onCloseForm() {
    this.closeForm.emit(true);
  }

  laodUserPublicDetails(userId: number) {
    this.http.get<UserPublicDetails>(`${API_URI}/users/${userId}`).subscribe(
      response => {
        this.userPublicDetails = response;        
      }
    );
  }
}
