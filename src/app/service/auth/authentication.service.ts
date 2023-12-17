import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';
import { API_URI } from 'src/app/app.constants';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {


  constructor(private http: HttpClient) { }

  executeJWTAuthenticationService(username: string, password: string) {
    return this.http.post<any>(`${API_URI}/auth/authorize`,
    {
      email: username,
      password: password
    }).pipe(map(
      data => {
        sessionStorage.setItem('TokenJWT', data.token);
        sessionStorage.setItem('loggedUser', username);        
      }
    ));
  }

  logout() {
    sessionStorage.removeItem('TokenJWT');
    sessionStorage.removeItem('loggedUser');
  }

  getAuthorizationTokenJWT():string {
    return sessionStorage.getItem('TokenJWT') ?? '';
  }

  isUserLogged(): boolean {
    return sessionStorage.getItem('TokenJWT') !== null;
  }
}

