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
  counts : any = {};

  constructor(private produitservice: ProduitService) { }

  ngOnInit(): void {
    this.panier = this.produitservice.panier;
    //console.log(this.panier);
    

    //somme des achats
    this.somme = this.panier.reduce((s,p)=> { return s + p.prix;},0);

   //test array

   
   this.panier.forEach(element => {
     this.counts[element] = (this.counts[element] || 0) + 1;
   });
   // 👇️ {one: 3, two: 2, three: 1}
   console.log(this.counts);





  }

  //supprimer élément du panier

  supprimer(id: number){
    this.panier = this.panier.filter((i)=> this.panier.indexOf(i) !== id);
    
    //mise à jour de la somme des achats
    this.somme = this.panier.reduce((s,p)=> { return s + p.prix;},0);
    
  }
  countElt(produit:Produit){

   this.count = this.produitservice.countElt(produit);
   
  }

  
 
 
}
