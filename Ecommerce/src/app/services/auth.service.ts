import { HttpClient } from '@angular/common/http';
import { Personne } from '../model/personne';
import { BehaviorSubject } from 'rxjs';
import { Injectable, Input } from '@angular/core';
import { environment } from 'src/environments/environment';
import { ActivatedRoute, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  API_registerUser: string = environment.API_url + "/user/register";
  API_loginUser: string = environment.API_url + "/user/login";
  API_deleteUser: string = environment.API_url + "/user/delete";
  API_updateUser: string = environment.API_url + "/user/update";
  API_getUser: string = environment.API_url + "/user";


  constructor(private http: HttpClient,
    private route: Router,
    private routeActivated: ActivatedRoute) { }


  isConnected = () => {
    return sessionStorage.getItem('token') != null;

  }
  getToken() {
    return sessionStorage.getItem('token') || '';
  }
  haveAccess() {
    const logginToken = sessionStorage.getItem('token');
    const _extractToken = logginToken?.split('.')[1];
    /* const _atobdata = atob(_extractToken);
     const finaldata = JSON.parse(_atobdata)*/
  }
  registerUser(user: Personne) {
    return this.http.post(this.API_registerUser, user)
  }
  loginUser(user: any) {
    return this.http.post(this.API_loginUser, user)
  }
  updateUser(user: Personne) {
    return this.http.patch(this.API_updateUser, user)
  }
  deleteUser(id: any) {
    return this.http.delete(this.API_deleteUser + "/" + id)
  }
  getUser() {
    return this.http.get(this.API_getUser)
  }
  reloadPage(destination: string) {
    this.route.routeReuseStrategy.shouldReuseRoute = () => false;
    this.route.navigate(["/" + destination], {
      relativeTo: this.routeActivated,
      queryParamsHandling: "merge"
    });
  }



}
