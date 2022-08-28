import { Produit } from './../produit';
import { AuthService } from './../services/auth.service';
import { Router } from '@angular/router';
import { ProduitService } from './../services/produit.service';
import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { Personne } from '../personne';

@Component({
  selector: 'app-panier',
  templateUrl: './panier.component.html',
  styleUrls: ['./panier.component.scss']
})
export class PanierComponent implements OnInit, OnChanges{

  panier: any[] = [];
  somme: number = 0;
  count : number = 0;
  nbr_article: number = 0;
  client : Personne = new Personne();
  message : string | null = null;
  shipping : number = 0;

  constructor(private produitservice: ProduitService, private auth:AuthService, private route:Router) { }

  ngOnInit(): void {

    /* remplir panier*/
    this.panier = this.produitservice.panier;
    //console.log(this.panier);

   
    /* calcul somme des achats*/
    this.somme = this.panier.reduce((s,p)=> { return s + (p.prix*p.nbr);},0);
    this.nbr_article = this.panier.length;
    if(this.nbr_article === 0) { this.message = "vide";}

    if(this.auth.client == null) return 
      this.auth.client.subscribe((personne : Personne) => {
      this.client = personne;
    });   
    

  }

    /* supprimer élément du panier*/
  supprimer(id: number){
    this.panier = this.panier.filter((i)=> this.panier.indexOf(i) !== id);
    
    /* mise à jour de la somme des achats*/
    this.somme = this.panier.reduce((s,p)=> { return s + p.prix;},0);
       
  }

  
 onBack(){
  this.route.navigate(['/produit']);
}

ngOnChanges(changes: SimpleChanges): void {
  /*for (let propName in changes) {  
    let change = changes[propName];
    let curVal  = JSON.stringify(change.currentValue);
    let prevVal = JSON.stringify(change.previousValue);
  
          console.log(curVal);
          console.log(prevVal);
       }*/
  
}
RecupPromoCode(event: any){
  console.log(event.target.value);
}  

RecupAllergene(event: any){
  console.log(event.target.value);
}  

 getTVAprix(s:number){
  return s * .1
}
 getTotalprix(number: number | null, p:number = 0){
  if(number == null) return 
  return this.getTVAprix(p) * number
}
 
}
