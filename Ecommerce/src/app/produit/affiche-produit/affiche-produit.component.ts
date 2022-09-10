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
    
  }

  getProduits(){
    this.produitservice.getProduit().subscribe(
      (res: any) => {
        this.listProduit = res;

        
      /* filtrer et créer array par categorie */
        this.produitservice.categorie.forEach(elt =>{
          if(this.listProduit != null)
            this.categorie.push(this.listProduit.filter((i) => i.categorie === elt));
         
        }); //console.log(this.categorie);
      },
      (err) => {console.log(err);}      
    )
  }

  AjouterPanier(produit:Produit){
    
   this.produitservice.AjoutPanier(produit);
   this.message = produit.name+" ajouté au panier";
   this.route.navigate(['details-produit/'+produit._id]);
   
  }



}
