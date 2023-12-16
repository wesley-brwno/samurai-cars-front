import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/service/auth/authentication.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent {


  constructor(
    private router: Router,
    public authenticationService: AuthenticationService  
  ) {}

  onLogin() {
    this.router.navigate(['login']);
  }
  onLogout() {
    this.authenticationService.logout();
    this.router.navigate(['login']);
  }
}
