import { ModalAlertComponent } from './../modal-alert/modal-alert.component';
import { MdbModalRef, MdbModalService } from 'mdb-angular-ui-kit/modal';
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
  modalref : MdbModalRef<ModalAlertComponent> | null = null;

  constructor(private modalService: MdbModalService, private route: Router, private produitservice: ProduitService) { }

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

    this.modalref = this.modalService.open(ModalAlertComponent, {

      modalClass: 'modal-dialog modal-xl',
      data : {title : 'Détails Produit', produit : p}
    })


  }



}
