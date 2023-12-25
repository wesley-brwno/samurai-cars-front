import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
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
  }

  onSubmitLogin() {
    this.authenticationService.executeJWTAuthenticationService(
      this.user.username,
      this.user.password
    ).subscribe(
      data => {
        this.router.navigate(['account']);
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
        console.log(error);     
      }
    )
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
