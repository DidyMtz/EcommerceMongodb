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
  object! : {};
  discounts : any[] = [];
  categories : any[ ] = [];
  selectedProduit : Produit[] =[];
  selectedCategorie : any;
  selectForm! : FormGroup;

  constructor( private produitservice : ProduitService) { }

  ngOnInit(): void {
    this.getListProduit();
    this.intiForm();

    this.discounts = this.produitservice.discount;
    this.categories = this.produitservice.categorie;
    this.AfficheProduit();

  }

  intiForm(){
    this.modifForm = new FormGroup({
      name        :new FormControl(),
      prix        :new FormControl(),
      description :new FormControl(),
      favori      :new FormControl(),
      categorie   :new FormControl(),
      discount    :new FormControl()
    });


    this.selectForm = new FormGroup({
      name  :new FormControl()
    });

   
  }

  getListProduit(){
    const list = this.produitservice.getProduit();
    list.subscribe(
      (res: any) => this.listProduit = res,
      (err) => console.log(err)
    )
  }

  AfficheProduit(){
    
    this.state = true;
    const name = this.selectForm.get('name')?.value;
    this.selectedProduit = this.listProduit.filter(i => i.name === name);
     
    console.log(this.selectedProduit);


    
    
  }
  modifProduit(){
console.log(this.modifForm.value);

  }



}
