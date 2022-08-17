import { Router } from '@angular/router';
import { Produit } from './../produit';
import { ProduitService } from './../services/produit.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-panier',
  templateUrl: './panier.component.html',
  styleUrls: ['./panier.component.scss']
})
export class PanierComponent implements OnInit {

  panier: any[] = [];
  somme: number = 0;
  count : number = 0;
  nbr_article: number = 0;

  constructor(private produitservice: ProduitService, private route:Router) { }

  ngOnInit(): void {
    this.panier = this.produitservice.panier;
    //console.log(this.panier);
    

    //somme des achats
    this.somme = this.panier.reduce((s,p)=> { return s + (p.prix*p.nbr);},0);
    this.nbr_article = this.panier.length;

   

  }

  //supprimer élément du panier

  supprimer(id: number){
    this.panier = this.panier.filter((i)=> this.panier.indexOf(i) !== id);
    
    //mise à jour de la somme des achats
    this.somme = this.panier.reduce((s,p)=> { return s + p.prix;},0);
    
  }

  
 onBack(){
  this.route.navigate(['/produit']);

}
  
 
counter(){
 this.count = this.produitservice.counter(); 
}


Dcounter(){
  this.count = this.produitservice.Dcounter(); 
}
 
}
