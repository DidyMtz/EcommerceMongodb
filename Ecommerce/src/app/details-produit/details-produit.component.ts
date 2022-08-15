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
  singleProduit : any[] = [];
  message : string = "";
  subject! : Subscription;

  constructor(private route: Router, private activeRoute: ActivatedRoute, private produitservice: ProduitService) { }

  ngOnInit(): void {

    this.subject = this.activeRoute.paramMap.subscribe( params => {
      this.id = params.get('id');

    });
    this.singleProduit = this.produitservice.produits.filter(i => this.produitservice.produits.indexOf(i) == this.id);
    console.log( this.singleProduit);
    
  }

  AjoutPanier(produit:Produit){
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

}
