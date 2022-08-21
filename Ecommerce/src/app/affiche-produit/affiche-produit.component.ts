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
  categorie : any[] = [];

  constructor(private route: Router, private produitservice: ProduitService) { }

  ngOnInit(): void {

       
    this.produitservice.categorie.forEach(elt =>{

      this.listProduit = this.produitservice.produits.filter((i) => i.categorie === elt);
      this.categorie.push(this.listProduit);
    });
   
  

     
  }

  display(produit: Produit){

    //recuperer le nom de la categorie
   let categorie_name : any = produit.categorie;let newArray : any[] = []; 
   
    newArray = this.produitservice.produits.filter((i) => i.categorie === categorie_name);
    let id = newArray.indexOf(produit);
    let name = produit.name;
    //console.log(newArray);
    this.route.navigate(['/details-produit/'+name]);
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
