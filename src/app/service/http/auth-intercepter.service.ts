import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthenticationService } from '../auth/authentication.service';

@Injectable({
  providedIn: 'root'
})
export class AuthIntercepterService implements HttpInterceptor{

  constructor(private authenticationService: AuthenticationService) { }


  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    let tokenJWT = this.authenticationService.getAuthorizationTokenJWT();

    if(tokenJWT.length > 5) {
      req = req.clone({
        setHeaders : {
          Authorization: "Bearer "+tokenJWT
        }
      });
    }
    
    return next.handle(req);
  }
}
