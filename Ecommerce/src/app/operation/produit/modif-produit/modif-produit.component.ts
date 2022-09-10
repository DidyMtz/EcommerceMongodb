import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ProduitService } from './../../../services/produit.service';
import { Component, OnInit, OnChanges, SimpleChanges, Input } from '@angular/core';
import { Produit } from 'src/app/modal/produit';

@Component({
  selector: 'app-modif-produit',
  templateUrl: './modif-produit.component.html',
  styleUrls: ['./modif-produit.component.scss']
})
export class ModifProduitComponent implements OnInit, OnChanges {

  listProduit: any[] = [];
  modifForm! : FormGroup;
  message: any;
  state : boolean = false;
  discounts : any[] = [];
  categories : any[ ] = [];
  selectedProduit : Produit[] =[];
  selectedCategorie : any;
  selectForm! : FormGroup;
  valuediscount : any;
  prix! : any;
  discount! : any;
  description ! :any;
  _idProduit: any;
  produit = new Produit;
  firstFormGroup! : FormGroup;
  secondFormGroup! : FormGroup;
  duration: any = 300;

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
    if(this.listProduit != null)
    // recup object rechercher dans liste produits
    this.selectedProduit = this.listProduit.filter(i => i.name === name);   
    //
     this.prix = this.selectedProduit.map(i => i.prix)
     this.discount = this.selectedProduit.map(i => i.discount)
     this.description = this.selectedProduit.map(i => i.description)     
     this._idProduit = this.selectedProduit.map(i => i._id)
    //console.log(this.selectedProduit);


    
    
  }
  modifProduit(produit: Produit){

    produit.discount = this.discount.toString();
    produit.description = this.description.toString();
    produit.prix = this.prix.toString();
    console.log(produit);
    
   this.produitservice.editProduit(produit).subscribe(
    (res) => console.log(res),
    (err) => console.log(err)
    )

  }

ngOnChanges(changes: SimpleChanges): void {
  //console.log(changes);
  
}

}
