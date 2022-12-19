import { DIALOG_DATA, DialogRef } from '@angular/cdk/dialog';
import { Component, Inject, OnInit } from '@angular/core';
import { Produits } from 'src/app/model/produits';
import { ProduitService } from 'src/app/services/produit.service';

@Component({
  selector: 'app-modalsupprproduit',
  templateUrl: './modalsupprproduit.component.html',
  styleUrls: ['./modalsupprproduit.component.scss']
})
export class ModalsupprproduitComponent implements OnInit {

  message : string = "";
  constructor(
    private produitservice : ProduitService,
    @Inject(DIALOG_DATA) public data : { produit : Produits},
    public dialogRef : DialogRef<string>)
    { }

  ngOnInit(): void {
  }

  supprimer(){
    
   const id = this.data.produit._id;
   console.log(id);
   
   this.produitservice.supprimerProduit(id).subscribe(
     (res:any) => this.message = res.message,
     (err) => console.log(err)
     
   )
  }
}
