import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import {ThemePalette} from '@angular/material/core';
import { Produit } from 'src/app/modal/produit';
import { HttpClient } from '@angular/common/http';
import { ProduitService } from 'src/app/services/produit.service';


export interface Task {
  name: string;
  completed: boolean;
  color: ThemePalette;
  subtasks?: Task[];
}


@Component({
  selector: 'app-ajout-produit',
  templateUrl: './ajout-produit.component.html',
  styleUrls: ['./ajout-produit.component.scss']
})
export class AjoutProduitComponent implements OnInit {
  
  produitForm!: FormGroup;
  allergeneForm!: FormGroup;
  categories : any[] = [];
  allergenes : any[] = [];  
  discounts  : any[] = [];
  fileName : string = '';
  produit = new Produit();
  produits : any[] = [];

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


  isLinear = false;
  message: any;

  constructor(
              private builder: FormBuilder, 
              private produitservice: ProduitService
              ) { }

  ngOnInit(): void {
    this.initForm();
    this.categories = this.produitservice.categorie;
    this.discounts = this.produitservice.discount;

  }

  initForm(){
    this.produitForm = new FormGroup({

      name        :new FormControl(),
      prix        :new FormControl(),
      description :new FormControl(),
      favori      :new FormControl(),
      categorie   :new FormControl(),
      discount    :new FormControl()
    });

    this.produitForm = this.builder.group({
      name : ['',[Validators.minLength(4),Validators.required]],
      prix : ['',Validators.required],     
      favori : ['',Validators.required],
      categorie : ['',Validators.required],
      description : ['',[Validators.minLength(75),Validators.maxLength(80), Validators.required]],
      discount : ['',Validators.required]
    });


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

  onSubmit(){

    this.produit = this.produitForm.value;
    const list = this.produitservice.getProduit().subscribe(
    (res: any) => { 
    
     this.produits = res;
     const lists = this.produits.some(i => i.name === this.produit.name);
     
     if(lists){
      this.message = "Duplicate nom de produit";
    
     }else{
      this.message = "Enregistrement produit lancé...";
     
   if(this.task.subtasks != null)
   this.produit.allergene = this.task.subtasks.filter((i) => {
   if(i.completed) return i;
   else return;});

   const postProduit = this.produitservice.postProduit(this.produit);
   postProduit.subscribe(
         (result: any) => {
          this.message = result.message;
          
       //console.log(result)
         },
         (err) => console.log(err)
  )}},
    (err) => { console.log(err);}
  );
    
  }

  
  onFileSelected(event:any){
    if(event != null)
    this.produitservice.onFileSelected(event,this.fileName)?.subscribe(
      (res:any) => { this.message = res.message; this.fileName = res.filename},
      (err) => {this.message = err}     
    )

  }

}
