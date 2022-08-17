import { ProduitService } from './../services/produit.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject, Subscription } from 'rxjs';
import { Produit } from '../produit';

@Component({
  selector: 'app-details-produit',
  templateUrl: './details-produit.component.html',
  styleUrls: ['./details-produit.component.scss']
})
export class DetailsProduitComponent implements OnInit {

  id!: any;
  singleProduit : Produit[] = [];
  message : string = "";
  subject! : Subscription;  
  produitSelected: Produit[] = [];
  count : number = 1;
  prix : number = 0;

  constructor(private route: Router, private activeRoute: ActivatedRoute, private produitservice: ProduitService) { }

  ngOnInit(): void {
    this.produitSelected = this.produitservice.produits;
    this.subject = this.activeRoute.paramMap.subscribe( params => {
      this.id = params.get('id');

    });
    this.singleProduit = this.produitservice.produits.filter(i => this.produitservice.produits.indexOf(i) == this.id);
    //console.log( this.singleProduit);
    
  }

  AjoutPanier(produit:Produit){
   
    let id = this.singleProduit.indexOf(produit);
    this.singleProduit[id].nbr = this.count; 
    this.produitservice.AjoutPanier(produit);
    this.message = produit.name+" ajouté au panier";
   
    setTimeout(()=> {
     this.message = "";
    },2000);
    
  }

  ngOnDestroy() {
    this.subject.unsubscribe();
  }

 onBack(){
  this.route.navigate(['/produit']);

}

counter(){
 this.count ++; 
}


Dcounter(){
  if(this.count > 1){this.count --;}  
   return this.count;
}
/*
selected(produit:Produit){
  let id = this.produitSelected.indexOf(produit);
  this.produitSelected[id].selected = !this.produitSelected[id].selected;
  //this.AjouterPanier(produit);
  
}*/




}
