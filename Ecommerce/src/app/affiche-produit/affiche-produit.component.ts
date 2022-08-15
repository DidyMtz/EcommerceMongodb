import { ProduitService } from './../services/produit.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Produit } from '../produit';

@Component({
  selector: 'app-affiche-produit',
  templateUrl: './affiche-produit.component.html',
  styleUrls: ['./affiche-produit.component.scss']
})
export class AfficheProduitComponent implements OnInit {

  listProduit: any[] = [];
  message : string = '';

  constructor(private route: Router, private produitservice: ProduitService) { }

  ngOnInit(): void {

    this.listProduit = this.produitservice.produits;
  }

  display(id:number){

    this.route.navigate(['/details-produit/'+id]);
  }

  AjouterPanier(produit:Produit){
    
   this.produitservice.AjoutPanier(produit);
   // alert(produit.name+" ajouté au panier");
   this.message = produit.name+" ajouté au panier";
   
   setTimeout(()=> {
    this.message = "";
   },2000);
   
  }
}
