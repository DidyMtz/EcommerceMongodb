import { DialogRef,DIALOG_DATA } from '@angular/cdk/dialog';
import { ProduitService } from './../services/produit.service';
import { Produit } from './../produit';
import { Component, OnInit, Inject } from '@angular/core';
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

  constructor(
    public dialogRef: DialogRef<string>,
    private route: Router, 
    private produitservice: ProduitService,
    @Inject(DIALOG_DATA) public data: { produit: Produit}
    ) { }

  ngOnInit(): void {

    if(this.data.produit === null) return 
    this.totalPrix = this.data.produit.prix ;

   
  }

  
counter(){
  this.count ++; 
 }
 
 Dcounter(){
   if(this.count > 1){this.count --;}  
   
 }
 
 AjoutPanier(p: Produit){
   
  
  //if(this.produit == null) return 
  p.nbr = this.count;   
  this.messages = p.name+" est ajouté au Panier";  
  this.produitservice.AjoutPanier(p);
  this.produitservice.message.next(this.messages);

  setTimeout(() => {
    this.route.navigate(['/produit']);
    this.dialogRef.close();
  },1000);
  
}
}
