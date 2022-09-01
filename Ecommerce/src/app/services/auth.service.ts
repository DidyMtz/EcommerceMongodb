import { Personne } from '../modal/personne';
import { BehaviorSubject } from 'rxjs';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  p : Personne = new Personne();
  client : BehaviorSubject<Personne> = new BehaviorSubject(this.p) ;

  constructor() { }


  isConnected = (personne: Personne) => { return this.client.next(personne); }
}
