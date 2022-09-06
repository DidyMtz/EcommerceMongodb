import { ProduitService } from './../../services/produit.service';
import { FormBuilder, FormGroup, FormControl, Validators, FormArray } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import {ThemePalette} from '@angular/material/core';
import { Produit } from 'src/app/modal/produit';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';


export interface Task {
  name: string;
  completed: boolean;
  color: ThemePalette;
  subtasks?: Task[];
}

@Component({
  selector: 'app-produit',
  templateUrl: './produit.component.html',
  styleUrls: ['./produit.component.scss']
})
export class ProduitComponent implements OnInit {

  produitForm!: FormGroup;
  allergeneForm!: FormGroup;
  categories : any[] = [];
  allergenes : any[] = [];  
  discounts  : any[] = [];
  fileName : string = '';
  produit = new Produit();

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
              private produitservice: ProduitService,
              private http : HttpClient) { }

  ngOnInit(): void {
    this.initForm();
    this.categories = this.produitservice.categorie;
    this.discounts = this.produitservice.discount;

   
   // console.warn(this.allergenes)
    
    
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
      description : ['',[Validators.minLength(10),Validators.maxLength(50), Validators.required]],
      discount : ['',Validators.required]
    });


    this.allergeneForm = this.builder.group({

     celeri : false,
     cereale : false,
     sesame  : false,
     noix   : false,
     oeuf   : false,
     anhydride: false,
     lait   : false,
     soja   : false,
     crustace : false,
     arachide : false,
     moutarde : false,
     poisson  : false,
     lupin    :false,
     mollusque   : false,




    })
                                     



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
  if(this.task.subtasks != null)
  this.produit.allergene = this.task.subtasks.filter((i) => {
   if(i.completed) return i;
   else return;});

   const postProduit = this.produitservice.postProduit(this.produit);
   postProduit.subscribe(
    (result: any) => {
      if(result instanceof HttpErrorResponse) return result.error;
      else
      this.message = result.message;
    }
   );
  console.warn(this.produit);
    
    
  }

  onFileSelected(event :any) {

    const file:File = event.target.files[0];

    if (file) {

        this.fileName = file.name;
        const formData = new FormData();
        formData.append("produitImage", file);
        const upload$ = this.produitservice.postUpload(formData);
        upload$.subscribe();
    }
}









}
