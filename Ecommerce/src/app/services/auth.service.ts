import { HttpClient } from '@angular/common/http';
import { Personne } from '../modal/personne';
import { BehaviorSubject } from 'rxjs';
import { Injectable, Input } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  p : Personne = new Personne();
  client : BehaviorSubject<Personne> = new BehaviorSubject(this.p) ;
  API_registerUser :  string = environment.API_url+"/user/register";
  API_loginUser  :  string = environment.API_url+"/user/login";
  API_deleteUser :  string = environment.API_url+"/user/delete";
  API_updateUser :  string = environment.API_url+"/user/update";
  API_getUser    :  string = environment.API_url+"/user";


  constructor(private http : HttpClient) { }


  isConnected = (personne: Personne) => { return this.client.next(personne); }
  isAdmin = (personne: Personne) => { return this.client.next(personne)}

  registerUser(user: Personne){
    return this.http.post(this.API_registerUser,user)
  }
  loginUser(user: any){
    return this.http.post(this.API_loginUser,user)
  }
  updateUser(user: Personne){
    return this.http.patch(this.API_updateUser,user)
  }
  deleteUser(id: any){
    return this.http.delete(this.API_deleteUser+"/"+id)
  }
  getUser(){
    return this.http.get(this.API_getUser)
  }




}
