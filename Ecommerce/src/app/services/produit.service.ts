import { Injectable } from '@angular/core';
import { Produit } from '../produit';

@Injectable({
  providedIn: 'root'
})
export class ProduitService {

  count: number = 1;
  produits : any[] = [
    
    {name:'Allocco ', prix: 20, photo:'../../assets/img/alloco.jpg', description:'Alloco grillé sur feu doux à la sauce de persil et mouscade.'},
    {name:'Poulet Braisé', prix: 100, photo:'../../assets/img/Poulet-Braise.jpg', description:'Poulet braisé sur feu doux à la sauce de persil et mouscade.'},
    {name:'Poisson Braisé', prix: 90, photo:'../../assets/img/poisson braisé.jpg', description:'Poisson braisé sur feu doux à la sauce de persil et mouscade.'},
    {name:'Viande de Chèvre Braisée', prix: 120, photo:'../../assets/img/croupions-de-dindes.jpeg', description:'Chèvre braisé sur feu doux à la sauce de persil et mouscade.'},
    {name:'Porc Braisé', prix: 120, photo:'../../assets/img/mouton-braisé.jpg', description:'Porc braisé sur feu doux à la sauce de persil et mouscade. Excellent plat pour plusieurs.'},
    {name:'Brochette Boeuf', prix: 110, photo:'../../assets/img/brochettes-de-boeuf-recette.jpeg', description:'Brochettes de boeuf braisé sur feu doux à la sauce de persil et mouscade.'},
    {name:'Frites', prix: 20, photo:'../../assets/img/frites.jpeg', description:'Frites croustillantes, dorées à feu doux. Excellent accompagnement pour vos plats.'},
    {name:'Manioc', prix: 20, photo:'../../assets/img/kwanga.jpg', description:'Manioc, chikwangue ou kwangua. Accompagnement de luxe pour vos plats.'},
    {name:'Jus de bissap', prix: 20, photo:'../../assets/img/jus de bissap.jpeg', description:'Jus de bissap, Accompagnement de luxe pour vos plats.'}


  ];

  carousel :any[] =[
    {name:'Porc Braisé', prix: 120, photo:'../../assets/img/mouton-braisé.jpg', description:'Porc braisé sur feu doux à la sauce de persil et mouscade'},
    {name:'Brochette Boeuf', prix: 110, photo:'../../assets/img/brochettes-de-boeuf-recette.jpeg', description:'Brochettes de boeuf braisé sur feu doux à la sauce de persil et mouscade'},
    {name:'Frites', prix: 20, photo:'../../assets/img/frites.jpeg', description:'Frites croustillantes, dorées à feu doux. Excellent accompagnement.'},
    
  ]
  panier : Produit[] = [];

  constructor() { }


  AjoutPanier(produit:Produit){
    
    if(this.panier.indexOf(produit) != -1)
   {  
   alert( produit.name + " ajouté au panier!");
   }else{
    this.panier.push(produit);
   }
    return this.panier;
  }

  /*
  countElt = (produit:Produit) => {

    let count = 0;
    this.panier.forEach(element => {
      if(produit === element){
        count++;
      }
    });
    return count;

  }*/

  
counter(){
  this.count ++; 
  return this.count;
}


Dcounter(){
  if(this.count > 1){this.count --;}  
   return this.count;
}
}
