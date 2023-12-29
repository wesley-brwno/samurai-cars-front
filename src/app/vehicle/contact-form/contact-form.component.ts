import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Images, Vehicle } from 'src/app/interface/vehicle-pabeable.intefaces';
import { UserPublicDetails } from '../vehicle-details/vehicle-details.component';
import { API_URI } from 'src/app/app.constants';
import { HttpClient } from '@angular/common/http';
import { ApiErrorResponse } from 'src/app/interface/http-error-response';

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
  contactForm!: ContactForm;
  errorMap!: Map<string, string>;
  apiValidationException!: ApiErrorResponse;

  constructor(
    private http: HttpClient,
  ) {

  }
  ngOnInit(): void {
    this.laodUserPublicDetails(this.selectedVehicle.user_id);
    this.contactForm = new ContactForm('', '', '', '', '', this.selectedVehicle.id);
  }

  onCloseForm() {
    this.closeForm.emit(true);
  }

  onSubmitMessage() {
    console.log("Method was opened");
    
    this.http.post<ContactForm>(`${API_URI}/messages`, this.contactForm).subscribe(
      response => {
        window.confirm("Your message was sent!");
        this.onCloseForm();  
      },
      error => {
        console.log(error);   
        this.apiValidationException = error;
        let fields = this.apiValidationException.error.fields.split(',');
        let messages = this.apiValidationException.error.fields_message.split(',');
        this.createErrorMap(fields, messages);
      }
    )
  }

  laodUserPublicDetails(userId: number) {
    this.http.get<UserPublicDetails>(`${API_URI}/users/${userId}`).subscribe(
      response => {
        this.userPublicDetails = response;        
      }
    );
  }

  private createErrorMap(fields: string[], messages: string[]) {
    this.errorMap = new Map<string, string>;
    for (let i = 0; i < fields.length; i++) {
      this.errorMap.set(fields[i], messages[i]);
    }
  }
}

export class ContactForm {
  constructor(
    public name: string,
    public lastname:string,
    public phone: string,
    public email: string,
    public message: string,
    public vehicle_id: number
  ) {}
}
