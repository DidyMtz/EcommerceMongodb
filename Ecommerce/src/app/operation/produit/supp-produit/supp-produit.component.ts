import { ProduitService } from './../../../services/produit.service';
import { Component, OnInit } from '@angular/core';
import { Produit } from 'src/app/modal/produit';

@Component({
  selector: 'app-supp-produit',
  templateUrl: './supp-produit.component.html',
  styleUrls: ['./supp-produit.component.scss']
})
export class SuppProduitComponent implements OnInit {

  listProduit : any[] = [];
  state: boolean = false;
  produit = new Produit;
  message : string ="";

  constructor(private produitservice : ProduitService) { }

  ngOnInit(): void {

    this.getListProduit();
  }

  getListProduit(){
    const list = this.produitservice.getProduit();
    list.subscribe(
      (res: any) => this.listProduit = res,
      (err) => console.log(err)
    )
  }



  supprimerProduit(produit: Produit){
  this.produit = produit;
  this.state = true;
  this.message = "";       
 
  }
  confirmersuppProduit(){
    const idproduit = this.produit._id;

    /*supprime image
    this.produitservice.supprimerimgProduit(idproduit).subscribe(
      (res: any) => {
        this.message = res.message+" ";
      },
      (err) => this.message = err
    )*/
  //supprime produit
    this.produitservice.supprimerProduit(idproduit).subscribe(
      (res: any) => {
        this.message += res.message;
        this.getListProduit();
        
      },
      (err: any) => this.message = err
    )
    console.warn(idproduit);
  }




}
