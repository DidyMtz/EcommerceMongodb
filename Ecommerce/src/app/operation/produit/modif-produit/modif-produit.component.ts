import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ProduitService } from './../../../services/produit.service';
import { Component, OnInit } from '@angular/core';
import { Produit } from 'src/app/modal/produit';
import { ThemePalette } from '@angular/material/core';
import { timeout } from 'rxjs';


export interface Task {
  name: string;
  completed: boolean;
  color: ThemePalette;
  subtasks?: Task[];
}


@Component({
  selector: 'app-modif-produit',
  templateUrl: './modif-produit.component.html',
  styleUrls: ['./modif-produit.component.scss']
})


export class ModifProduitComponent implements OnInit {

  listProduit: any[] = [];
  modifForm! : FormGroup;
  message: any;
  messagephoto: any;
  messageallergene: any;
  state : boolean = false;
  stateAllergene : boolean = false;
  statephoto : boolean = false;
  discounts : any[] = [];
  categories : any[ ] = [];
  selectedProduit : Produit[] =[];
  selectedCategorie : any;
  selectForm! : FormGroup;
  valuediscount : any;
  prix! : any;
  discount! : any;
  description ! :any;
  name! : any;
  _idProduit: any;
  produit = new Produit;
  fileName : any;
  duration: any = 300;



  task: Task = {
    name: 'Allergene',
    completed: false,
    color: 'primary',
    subtasks: [
      {name: 'Céleri', completed: false, color: 'primary'},
      {name: 'Céréale', completed: false, color: 'accent'},
      {name: 'Sésame', completed: false, color: 'warn'},
      {name: 'Oeuf', completed: false, color: 'primary'},
      {name: 'Noix', completed: false, color: 'primary'},
      {name: 'Lait', completed: false, color: 'accent'},
      {name: 'Soja', completed: false, color: 'warn'},
      {name: 'Crustacé', completed: false, color: 'primary'},
      {name: 'Arachide', completed: false, color: 'accent'},
      {name: 'Poisson', completed: false, color: 'warn'},
      {name: 'lupin', completed: false, color: 'primary'},
      {name: 'Anhydride', completed: false, color: 'accent'},
      {name: 'Mollusque', completed: false, color: 'warn'},
    ],
  };
  constructor( private produitservice : ProduitService) { }

  ngOnInit(): void {
    this.getListProduit();
    this.intiForm();
    this.getselectedProduit();
   
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

  getselectedProduit(){
    const name = this.selectForm.get('name')?.value;
    if(this.listProduit != null)
    // recup object rechercher dans liste produits
    this.selectedProduit = this.listProduit.filter(i => i.name === name);   
    //mise à jour valeur 
     this.prix = this.selectedProduit.map(i => i.prix)
     this.discount = this.selectedProduit.map(i => i.discount)
     this.description = this.selectedProduit.map(i => i.description)     
     this._idProduit = this.selectedProduit.map(i => i._id)   
     this.name = this.selectedProduit.map(i => i.name)
     
    // console.log(this.selectedProduit);
     
  }
  AfficheProduit(produit: Produit){
    
    this.state = true;
    this.message = "";
   this.getselectedProduit()
    
  }
  

  allComplete: boolean = false;

  updateAllComplete() {
    this.allComplete = this.task.subtasks != null && this.task.subtasks.every(t => t.completed);
    
  }

  someComplete(): boolean {
    if (this.task.subtasks == null) {
      return false;
    }
    return this.task.subtasks.filter(t => t.completed).length > 0 && !this.allComplete;
    
  }

  setAll(completed: boolean) {
    this.allComplete = completed;
    if (this.task.subtasks == null) {return; }
    this.task.subtasks.forEach(t => (t.completed = completed));

   
  }
  modifProduit(){
 this.selectedProduit.forEach(elt => {

      elt.discount    = this.discount.toString();
      elt.description = this.description.toString();
      elt.prix        = this.prix.toString();
      elt.name        = this.name.toString();
    });

  const produits = Object.assign({}, this.selectedProduit);
  const produit = produits[0];


    setTimeout(() => {
      this.state = false;
    }, 500);
   
   this.produitservice.editProduit(produit).subscribe(
    (res :any) =>{
      console.log(res)
      this.message = res.message;

    } ,
    (err) => console.log(err)
    )

  }
  
  
  AfficheProduitallergene(produit:Produit){

    this.stateAllergene = true; 
    this.messageallergene = "";
    this.produit = produit;
      
    
  }
  ModifierAllergene(){

    if(this.produit != null)   
    if(this.task.subtasks != null)
    this.produit.allergene = this.task.subtasks.filter((i) => {
    if(i.completed) return i;
    else return;});

    setTimeout(() => {
      this.stateAllergene = false;
    }, 500);

    this.produitservice.editAllergene(this.produit).subscribe(
      (res: any) => {
        console.log(res);      
        this.messageallergene = res.message; },
      (err) => console.log(err)
    )
  }

  onFileSelected(event:any){
    if(event != null)
    this.produitservice.onFileSelected(event,this.fileName)?.subscribe(
      (res:any) => { this.messagephoto = res.message; this.fileName = res.filename},
      (err) => {this.messagephoto = err}     
    )

  }

  AfficheProduitphoto(produit: Produit){
    this.statephoto = true;
    this.messagephoto = "";
    this.fileName = "";
    this.produit = produit;
    
    
  }
  modifierPhoto(){
    if(this.produit != null) 
    this.produitservice.editPhoto(this.produit).subscribe(
      (res:any) =>{
        console.log(res);
        this.messagephoto = res.message;
      },
      (err) => {
        console.log(err)
      }
    )
    
  }
}
