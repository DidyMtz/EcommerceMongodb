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

  constructor(private produitservice: ProduitService) { }

  ngOnInit(): void {
    this.panier = this.produitservice.panier;

    //somme des achats
    this.somme = this.panier.reduce((s,p)=> { return s + p.prix;},0);
  }

  //supprimer élément du panier
  supprimer(id: number){
    this.panier = this.panier.filter((i)=> this.panier.indexOf(i) !== id);
    //console.log(this.panier);
    //mise à jour de la somme des achats
    this.somme = this.panier.reduce((s,p)=> { return s + p.prix;},0);
    
  }
 
}
