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



  supprimerProduit(produit: string){

    console.warn(produit);
       
 
  }




}
