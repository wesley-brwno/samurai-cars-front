import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/service/auth/authentication.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {


  user!: User

  constructor(
    public authenticationService: AuthenticationService,
    private router: Router
  ) {

  }

  ngOnInit(): void {
    this.user = new User('', '');
  }

  onSubmitLogin() {
    this.authenticationService.executeJWTAuthenticationService(
      this.user.username,
      this.user.password
    ).subscribe(
      data => {
        this.router.navigate(['resource-management']);
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
