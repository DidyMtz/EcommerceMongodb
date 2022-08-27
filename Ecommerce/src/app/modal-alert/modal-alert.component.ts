import { ProduitService } from './../services/produit.service';
import { Produit } from './../produit';
import { MdbModalRef } from 'mdb-angular-ui-kit/modal';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';


@Component({
  selector: 'app-modal-alert',
  templateUrl: './modal-alert.component.html',
  styleUrls: ['./modal-alert.component.scss']
})
export class ModalAlertComponent implements OnInit {

  title: string | null = null;
  singleProduit : Produit[] | null = null;
  produit : Produit | null = null;
  count : number = 1;
  totalPrix : number = 0;
  messages : string | null = null;
  routes: string = "";

  constructor(private route: Router, private produitservice: ProduitService, public modalRef2: MdbModalRef<ModalAlertComponent>) { }

  ngOnInit(): void {

    if(this.produit === null) return 
    this.totalPrix = this.produit.prix ;
  }

  
counter(){
  this.count ++; 
 }
 
 Dcounter(){
   if(this.count > 1){this.count --;}  
   
 }
 
 AjoutPanier(){
   

  if(this.produit == null) return 
  this.produit.nbr = this.count;   
  this.messages = this.produit.name+" est ajouté au Panier";  
  this.produitservice.AjoutPanier(this.produit);
  this.produitservice.message.next(this.messages);
  
}
AfficherPanier(){

  this.route.navigate(['/panier']);
  this.modalRef2.close();
}
}
