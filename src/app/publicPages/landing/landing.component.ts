import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/service/auth/authentication.service';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.css']
})
export class LandingComponent {


  constructor(
    private authenicationService: AuthenticationService,
    private router: Router
  ) {}

  onAdminClick() {
    this.authenicationService.executeJWTAuthenticationService("samuraiAdmin@email.com", "samuraiAdmin").subscribe(
      response => {
        this.router.navigate(['account']);
      },
      error => {
        console.log(error);
        
      }
    );
  }

}
