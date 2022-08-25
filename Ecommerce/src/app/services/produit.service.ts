import { Router, NavigationEnd } from '@angular/router';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Produit } from '../produit';

@Injectable({
  providedIn: 'root'
})
export class ProduitService {

  count: number = 1;
  routes : BehaviorSubject<string> = new BehaviorSubject<string>("");
  message : BehaviorSubject<string> = new BehaviorSubject<string>("");
  produits : any[] = [
    
    {name:'Allocco ', prix: 20, photo:'../../assets/img/alloco.jpg', description:'Alloco grillé sur feu doux à la sauce de persil et mouscade.', categorie:'Accompagnement'},
    {name:'Poulet Braisé', prix: 100, photo:'../../assets/img/Poulet-Braise.jpg', description:'Poulet braisé sur feu doux à la sauce de persil et mouscade.', categorie:'Plat principal'},
    {name:'Poisson Braisé', prix: 90, photo:'../../assets/img/poisson braisé.jpg', description:'Poisson braisé sur feu doux à la sauce de persil et mouscade.', categorie:'Plat principal'},
    {name:'Chèvre Braisée', prix: 120, photo:'../../assets/img/croupions-de-dindes.jpeg', description:'Chèvre braisé sur feu doux à la sauce de persil et mouscade.', categorie:'Plat principal'},
    {name:'Porc Braisé', prix: 120, photo:'../../assets/img/mouton-braisé.jpg', description:'Porc braisé sur feu doux à la sauce de persil. Excellent plat pour plusieurs.', categorie:'Plat principal'},
    {name:'Brochette Boeuf', prix: 110, photo:'../../assets/img/brochettes-de-boeuf-recette.jpeg', description:'Brochettes braisé sur feu doux à la sauce de persil et mouscade.', categorie:'Plat principal'},
    {name:'Frites', prix: 20, photo:'../../assets/img/frites.jpeg', description:'Frites croustillantes, dorées à feu doux. Excellent pour vos plats.', categorie:'Accompagnement'},
    {name:'Manioc', prix: 20, photo:'../../assets/img/kwanga.jpg', description:'Manioc, chikwangue. Accompagnement pour vos plats.', categorie:'Accompagnement'},
    {name:'Riz', prix: 30, photo:'../../assets/img/riz.jpg', description:'Riz basmati. Accompagnement de luxe pour vos plats.', categorie:'Accompagnement'},
    {name:'Jus de bissap', prix: 20, photo:'../../assets/img/jus de bissap.jpeg', description:'Jus de bissap, Accompagnement de luxe pour vos plats.', categorie:'Boisson'}


  ];

  carousel :Produit[] =[
    {name:'Porc Braisé', prix: 120, photo:'../../assets/img/slider/porc3.jpg', description:'Porc braisé sur feu doux à la sauce de persil et mouscade'},
    {name:'Brochette Boeuf', prix: 110, photo:'../../assets/img/slider/steak1.jpg', description:'Brochettes braisé sur feu doux à la sauce de persil et mouscade.', categorie:'Plat principal'},
    {name:'Riz', prix: 30, photo:'../../assets/img/slider/fried-rice2.jpg', description:'Riz basmati. Accompagnement de luxe pour vos plats.', categorie:'Accompagnement'},
    {name:'Porc Braisé', prix: 120, photo:'../../assets/img/slider/porc2.jpg', description:'Porc braisé sur feu doux à la sauce de persil et mouscade'},
    {name:'Poisson Braisé', prix: 90, photo:'../../assets/img/slider/fish1.jpg', description:'Poisson braisé sur feu doux à la sauce de persil et mouscade.', categorie:'Plat principal'},
    {name:'Frites', prix: 20, photo:'../../assets/img/slider/french-fries1.jpg', description:'Frites croustillantes, dorées à feu doux. Excellent accompagnement.'},
    
  ]
  panier : Produit[] = [];

  categorie : any[] = ['Plat principal', 'Accompagnement','Boisson'];

  constructor(private route: Router) { }


  AjoutPanier(produit:Produit){
    
    if(this.panier.indexOf(produit) != -1)
   {  
   //alert( produit.name + " ajouté au panier!");
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

onReceive = (message : string ) => { this.message.next(message);}
}
