import { Injectable } from '@angular/core';
import { Produit } from '../produit';

@Injectable({
  providedIn: 'root'
})
export class ProduitService {

  produits : any[] = [
    
    {name:'Allocco ', prix: 20, photo:'../../assets/img/alloco.jpg', description:'Alloco grillé sur feu doux à la sauce de persil et mouscade '},
    {name:'Poulet Braisé', prix: 100, photo:'../../assets/img/Poulet-Braise.jpg', description:'Poulet braisé sur feu doux à la sauce de persil et mouscade'},
    {name:'Poisson Braisé', prix: 90, photo:'../../assets/img/poisson braisé.jpg', description:'Poisson braisé sur feu doux à la sauce de persil et mouscade'},
    {name:'Viande de Chèvre Braisée', prix: 120, photo:'../../assets/img/croupions-de-dindes.jpeg', description:'Chèvre braisé sur feu doux à la sauce de persil et mouscade'},
    {name:'Porc Braisé', prix: 120, photo:'../../assets/img/mouton-braisé.jpg', description:'Porc braisé sur feu doux à la sauce de persil et mouscade'},
    {name:'Poisson Braisé', prix: 90, photo:'../../assets/img/poisson braisé.jpg', description:'Poisson braisé sur feu doux à la sauce de persil et mouscade'},
    {name:'Viande de Chèvre Braisée', prix: 120, photo:'../../assets/img/croupions-de-dindes.jpeg', description:'Chèvre braisé sur feu doux à la sauce de persil et mouscade'},
    {name:'Porc Braisé', prix: 120, photo:'../../assets/img/mouton-braisé.jpg', description:'Porc braisé sur feu doux à la sauce de persil et mouscade'}

  ];
  panier : any[] = [];

  constructor() { }


  AjoutPanier(produit:Produit){
    
    return this.panier.push(produit);
  }

}
