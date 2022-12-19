import { AuthService } from './auth.service';
import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private authservice : AuthService, private route: Router){}



  canActivate() {

    if(this.authservice.isConnected()){
      return true;
    }else{
      
      this.route.navigate(['/produit']);
      return false;

    }
    
  }

  
}
