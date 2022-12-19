import { AuthService } from './auth.service';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable, Injector } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TokenInterceptorService implements HttpInterceptor{

  constructor(private inject: Injector) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    
    let authservice = this.inject.get(AuthService)
    let jwtoken = req.clone({
      //setHeaders: { Authorisation : 'bearer '+authservice.getToken()}
      setHeaders: { token : authservice.getToken()}
    });
    return next.handle(jwtoken);

  }
 
}
