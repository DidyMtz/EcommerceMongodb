import { environment } from './../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Categorie } from '../model/categorie';

@Injectable({
  providedIn: 'root'
})
export class CategorieService {

  urlAPIpostCategorie = environment.API_url+"/categorie/post";
  urlAPIgetCategorie = environment.API_url+"/categorie/";

  constructor(private http : HttpClient) { }

  postCategorie(data: Categorie){
    return this.http.post(this.urlAPIpostCategorie,data);
  }
  getCategorie(){
    return this.http.get(this.urlAPIgetCategorie);
  }
}
