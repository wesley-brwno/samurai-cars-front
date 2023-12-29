import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiErrorResponse, ApiExceptionResponse } from 'src/app/interface/http-error-response';
import { AuthenticationService } from 'src/app/service/auth/authentication.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  user!: User;
  newUser!: NewUser;
  toggleForm!: boolean;
  apiErrorResponse!: ApiErrorResponse;
  apiExceptionResponse!: ApiExceptionResponse;
  errorMap!: Map<string, string>;

  constructor(
    public authenticationService: AuthenticationService,
    private router: Router
  ) {

  }

  ngOnInit(): void {
    this.user = new User('', '');
  }

  onShowCreateAccountForm() {
    this.toggleForm = true;
    this.newUser = new NewUser('', '', '');
    this.errorMap.clear();
  }

  onSubmitLogin() {
    this.authenticationService.executeJWTAuthenticationService(
      this.user.username,
      this.user.password
    ).subscribe(
      data => {
        this.router.navigate(['account']);
      },
      error => {
        console.log(error);
        
        if(error.status === 403) {
          this.apiExceptionResponse = error;
          this.createErrorMap(['error'], [this.apiExceptionResponse.error.title]);
          return;
        }      
        this.apiErrorResponse = error;
        let errorFields = this.apiErrorResponse.error.fields.split(',');
        let errorMessages = this.apiErrorResponse.error.fields_message.split(',');
        this.createErrorMap(errorFields, errorMessages)
      }
    )
  }

  onSubmitSignup() {
    this.authenticationService.regiterNewUser(this.newUser).subscribe(
      data => {
        console.log(data);
        this.toggleForm = false;
      },
      error => {
        this.apiErrorResponse = error;
        let errorFields = this.apiErrorResponse.error.fields.split(',');
        let errorMessages = this.apiErrorResponse.error.fields_message.split(',');
        this.createErrorMap(errorFields, errorMessages);
      }
    )
  }

  onToggleFormClick() {
    this.toggleForm = false;
    this.errorMap.clear();
  }

  private createErrorMap(fields: string[], messages: string[]) {
    this.errorMap = new Map<string, string>;
    for (let i = 0; i < fields.length; i++) {
      this.errorMap.set(fields[i], messages[i]);
    }
  }
}

export class User {
  constructor(
    public username: string,
    public password: string
  ) {}
}

export class NewUser {
  constructor(
    public name: string,
    public email: string,
    public password: string
  ) {}
}
