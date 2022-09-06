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

    this.getProduits();
    
      /* filtrer et remplir array par categorie 
      
    this.produitservice.categorie.forEach(elt =>{
      if(this.listProduit != null)
      this.categorie.push(this.listProduit.filter((i) => i.categorie === "Plat principal"));
    });

    console.log(this.categorie);*/
    
  }

  getProduits(){
    this.produitservice.getProduit().subscribe(
      (err) => console.log(err),
      (res: any) => {this.listProduit.push(res);
       
      }
      
    )
  }

  AjouterPanier(produit:Produit){
    
   this.produitservice.AjoutPanier(produit);
   this.message = produit.name+" ajouté au panier";
   this.route.navigate(['details-produit/'+produit.name]);
   
  }



}
