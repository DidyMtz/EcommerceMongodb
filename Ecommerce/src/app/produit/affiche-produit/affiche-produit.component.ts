import { ProduitService } from '../../services/produit.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Produit } from '../../modal/produit';

@Component({
  selector: 'app-affiche-produit',
  templateUrl: './affiche-produit.component.html',
  styleUrls: ['./affiche-produit.component.scss']
})
export class AfficheProduitComponent implements OnInit {

  listProduit: any[] = [];
  message : string = '';
  categorie : any[] = [];

  constructor(
   
    
    private route: Router, 
    private produitservice: ProduitService
    ) { }

  ngOnInit(): void {

       /*filtrer et remplir array par categorie */
    this.produitservice.categorie.forEach(elt =>{
      this.listProduit = this.produitservice.produits.filter((i) => i.categorie === elt);
      this.categorie.push(this.listProduit);
    });
  }


  AjouterPanier(produit:Produit){
    
   this.produitservice.AjoutPanier(produit);
   this.message = produit.name+" ajouté au panier";
   this.route.navigate(['details-produit/'+produit.name]);
   
  }



}
