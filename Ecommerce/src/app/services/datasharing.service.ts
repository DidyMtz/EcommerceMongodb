import { BehaviorSubject } from 'rxjs';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DatasharingService {

  isUserLoggedIn : BehaviorSubject<boolean> = new BehaviorSubject(false);

  constructor() { }
}
