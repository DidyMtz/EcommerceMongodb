import { Dialog,DialogConfig } from '@angular/cdk/dialog';
import { ModalAlertComponent } from './../modal-alert/modal-alert.component';
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

  constructor(
   
    public dialog : Dialog,
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

  AfficherModal(produit: Produit){
    this.openModal(produit);
  }

  AjouterPanier(produit:Produit){
    
   this.produitservice.AjoutPanier(produit);
   this.message = produit.name+" ajouté au panier";
   
  }
  openModal(p:Produit){

    const dialogConfig = new DialogConfig();

    dialogConfig.disableClose = false;
    dialogConfig.autoFocus = true;
    dialogConfig.hasBackdrop = true;
    
    //console.dir(dialogConfig)

    const modalref = this.dialog.open(ModalAlertComponent,  {
      data : { produit : p}
    })


  }



}
