import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ProduitService } from './../../../services/produit.service';
import { Component, OnInit } from '@angular/core';
import { Produit } from 'src/app/modal/produit';

@Component({
  selector: 'app-modif-produit',
  templateUrl: './modif-produit.component.html',
  styleUrls: ['./modif-produit.component.scss']
})
export class ModifProduitComponent implements OnInit {

  listProduit: any[] = [];
  modifForm! : FormGroup;
  message: any;
  state : boolean = false;
  discounts : any[] = [];
  categories : any[ ] = [];

  constructor( private produitservice : ProduitService) { }

  ngOnInit(): void {
    this.getListProduit();
    this.intiForm();

    this.discounts = this.produitservice.discount;
    this.categories = this.produitservice.categorie;
  }

  intiForm(){
    this.modifForm = new FormGroup({
      name        :new FormControl(),
      prix        :new FormControl(),
      description :new FormControl(),
      favori      :new FormControl(),
      categorie   :new FormControl(),
      discount    :new FormControl()
    })
  }

  getListProduit(){
    const list = this.produitservice.getProduit();
    list.subscribe(
      (res: any) => this.listProduit = res,
      (err) => console.log(err)
    )
  }

  AfficheProduit(produit: Produit){
    if(produit != null){
      
    const list = this.modifForm.get('name')?.value;
    this.message = list;
    this.state = true;
   


    }
    
  }



}
